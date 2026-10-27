import { parabolaSlope, ropePath, ropeY, type LineGeometry } from "./rope";
import {
  MAX_EXTRA_SAG,
  INERTIA_TIME_MS,
  MIN_VELOCITY,
  TOUCH_INERTIA_TIME_MS,
  clampUnit,
  decay,
  motionFor,
  easeOutQuint,
  releaseVelocity,
  springStep,
  swingTarget,
  tangentDeg,
  type MotionProfile,
  type Sample,
} from "./portfolioPhysics";
import { wrap } from "./wrap";

export type LineItem = {
  el: HTMLElement;
  /** Left edge of the print along the unwrapped line. */
  base: number;
  w: number;
  rotation: number;
  drop: number;
};

type ItemState = LineItem & {
  /** Screenshot layer inside the print, shifted for the parallax. */
  shot: HTMLElement | null;
  shift: number;
  phase: number;
  x: number;
  angle: number;
  spin: number;
  stiffness: number;
};

/** Distance a pointer travels before a press becomes a drag (and the click is cancelled). */
const DRAG_THRESHOLD = 6;
/** A finger's direction is decided sooner, before the browser commits to scrolling the page. */
const TOUCH_DECIDE = 4;
/** Flicks with a finger are short; a little extra speed makes them feel like a throw. */
const TOUCH_INERTIA_BOOST = 1.15;

// Survives client-side navigation, so coming back from a case study keeps the line where it was.
let savedOffset = 0;

export class LineEngine {
  private stage: HTMLElement;
  private ropes: SVGPathElement[];
  private reduced: boolean;
  private g!: LineGeometry;
  private m!: MotionProfile;
  /** The idle sway only runs while the line is on screen and the tab is open. */
  private visible = true;
  private items: ItemState[] = [];
  private pins = new Float64Array(0);
  private total = 1;
  private lo = 0;
  /** Small sets do not loop: the line stops at its ends and a narrow set sits in the middle. */
  private loop = true;
  private minOffset = 0;
  private maxOffset = 0;

  private offset = savedOffset;
  private lastOffset = savedOffset;
  private velocity = 0;
  private inertiaTime = INERTIA_TIME_MS;
  private flow = 0;
  private sag = 0;
  private sagSpeed = 0;
  private tween: { from: number; to: number; start: number; duration: number } | null = null;

  private pointer: { id: number; startX: number; startY: number; lastX: number } | null = null;
  private touch: { id: number; startX: number; startY: number; lastX: number; mode: "pending" | "drag" | "scroll" } | null = null;
  private dragging = false;
  private samples: Sample[] = [];
  /** Clicks right after a drag are the end of that drag, not a request to open a project. */
  private suppressClickUntil = 0;
  private hovered: HTMLElement | null = null;

  private raf = 0;
  private lastTime = 0;
  private disposers: (() => void)[] = [];

  constructor(stage: HTMLElement, ropes: SVGPathElement[], reduced: boolean) {
    this.stage = stage;
    this.ropes = ropes;
    this.reduced = reduced;
    this.listen();
    const io = new IntersectionObserver(([entry]) => this.setVisible(entry.isIntersecting && !document.hidden));
    io.observe(stage);
    const onVisibility = () => this.setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    this.disposers.push(() => io.disconnect(), () => document.removeEventListener("visibilitychange", onVisibility));
  }

  private setVisible(visible: boolean) {
    this.visible = visible;
    if (visible) this.wake();
  }

  setLayout(g: LineGeometry, items: LineItem[], loopLength: number, loop = true) {
    const fresh = !this.g;
    this.g = g;
    this.m = motionFor(g.compact);
    this.total = loopLength;
    this.loop = loop;
    if (!loop) {
      const left = Math.min(...items.map((i) => i.base));
      const right = Math.max(...items.map((i) => i.base + i.w));
      const margin = g.compact ? 20 : g.width * 0.06;
      if (right - left + 2 * margin <= g.width) {
        this.minOffset = this.maxOffset = (g.width - (right - left)) / 2 - left;
      } else {
        this.minOffset = g.width - margin - right;
        this.maxOffset = margin - left;
      }
    }
    const widest = Math.max(...items.map((i) => i.w));
    this.lo = -(widest + g.gap);
    this.pins = new Float64Array(items.length);
    this.items = items.map((item, i) => ({
      ...item,
      shot: item.el.querySelector<HTMLElement>(".card-shot"),
      shift: 0,
      phase: i * 1.7,
      x: 0,
      angle: this.items[i]?.angle ?? item.rotation,
      spin: 0,
      // Slightly different pendulums so the prints never swing in lockstep.
      stiffness: 120 + ((i * 37) % 60),
    }));
    if (fresh) this.sag = g.sag;
    this.wake();
  }

  setReduced(reduced: boolean) {
    this.reduced = reduced;
    this.wake();
  }

  /** Current angle of an item, used to lift the print off the line without a jump. */
  angleOf(el: HTMLElement) {
    return this.items.find((i) => i.el === el)?.angle ?? 0;
  }

  /** Visible order of the prints from left to right, for the entrance stagger. */
  visibleOrder() {
    return this.items
      .filter((i) => i.x + i.w > 0 && i.x < this.g.width)
      .sort((a, b) => a.x - b.x)
      .map((i) => i.el);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.disposers.forEach((d) => d());
    savedOffset = this.offset;
  }

  // ——— movement ———

  private moveBy(delta: number, duration = 520) {
    const from = this.tween ? this.tween.to : this.offset;
    this.velocity = 0;
    this.tween = { from: this.offset, to: from + delta, start: performance.now(), duration: this.reduced ? 0 : duration };
    this.wake();
  }

  /** The line arrives from the right and glides to rest, so a phone shows the inertia before anyone touches it. */
  rollIn(distance: number, delay: number, duration: number) {
    if (this.reduced) return;
    this.velocity = 0;
    this.tween = { from: this.offset + distance, to: this.offset, start: performance.now() + delay, duration };
    this.offset += distance;
    this.lastOffset = this.offset;
    this.wake();
  }

  private bringIntoView(el: HTMLElement) {
    const item = this.items.find((i) => i.el === el);
    if (!item) return;
    const margin = this.g.width * 0.08;
    if (item.x >= margin && item.x + item.w <= this.g.width - margin) return;
    this.moveBy(this.g.width / 2 - (item.x + item.w / 2));
  }

  private wake() {
    if (this.raf) return;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    this.raf = 0;
    const dt = Math.min(40, Math.max(1, now - this.lastTime));
    this.lastTime = now;
    const g = this.g;
    if (!g) return;

    if (this.tween) {
      const t = this.tween.duration ? Math.min(1, Math.max(0, (now - this.tween.start) / this.tween.duration)) : 1;
      this.offset = this.tween.from + (this.tween.to - this.tween.from) * easeOutQuint(t);
      if (t >= 1) this.tween = null;
    } else if (!this.dragging && this.velocity !== 0) {
      this.offset += this.velocity * dt;
      this.velocity = decay(this.velocity, dt, this.inertiaTime);
      if (Math.abs(this.velocity) < MIN_VELOCITY) this.velocity = 0;
    }

    if (!this.loop) {
      const bound = Math.min(this.maxOffset, Math.max(this.minOffset, this.offset));
      const over = this.offset - bound;
      if (over !== 0 && !this.dragging) {
        // Past an end: the line eases back instead of hitting a wall.
        if (!this.tween) this.velocity = 0;
        this.offset = Math.abs(over) < 0.5 ? bound : this.offset - over * Math.min(1, dt / 110);
      }
    }

    const instant = (this.offset - this.lastOffset) / dt;
    this.lastOffset = this.offset;
    this.flow += (instant - this.flow) * Math.min(1, dt / 60);
    if (Math.abs(this.flow) < 0.0005) this.flow = 0;

    const m = this.m;
    const windy = !this.reduced && this.visible;
    const time = now / 1000;
    // The rope gives a little under fast movement and springs back; the wind breathes it a little.
    const breath = windy ? Math.sin(time * 0.7) * m.wind * 2 : 0;
    const sagTarget = this.reduced ? g.sag : g.sag + breath + Math.min(MAX_EXTRA_SAG, Math.abs(this.flow) * 5);
    [this.sag, this.sagSpeed] = this.reduced ? [sagTarget, 0] : springStep(this.sag, this.sagSpeed, sagTarget, dt, 90, 12);

    const items = this.items;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      it.x = this.loop ? wrap(this.lo, this.lo + this.total, it.base + this.offset) : it.base + this.shown();
      this.pins[i] = it.x + it.w / 2;
    }

    let restless = (!this.loop && this.shown() !== this.offset) || (!this.loop && (this.offset < this.minOffset - 0.5 || this.offset > this.maxOffset + 0.5)) || windy || this.dragging || this.tween !== null || this.velocity !== 0 || this.flow !== 0 || Math.abs(this.sag - sagTarget) > 0.05;
    const swing = this.reduced ? 0 : swingTarget(this.flow, m);
    const shift = this.reduced ? 0 : -clampUnit(this.flow / 1.2) * m.parallax;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const cx = this.pins[i];
      const y = ropeY(g, this.sag, cx, this.pins, items.length) + g.hang + it.drop;
      const rest = it.rotation + tangentDeg(parabolaSlope(g, this.sag, cx));
      const wind = windy ? Math.sin(time * (0.9 + (i % 3) * 0.17) + it.phase) * m.wind : 0;
      const target = it.el === this.hovered ? rest * 0.3 : rest + swing + wind;
      if (this.reduced) {
        it.angle = target;
        it.spin = 0;
      } else {
        [it.angle, it.spin] = springStep(it.angle, it.spin, target, dt, it.stiffness, m.damping);
        if (Math.abs(it.spin) > 0.01 || Math.abs(it.angle - target) > 0.01) restless = true;
      }
      if (it.shot && Math.abs(shift - it.shift) > 0.05) {
        it.shift = shift;
        it.shot.style.transform = `translate3d(${shift.toFixed(2)}px, 0, 0)`;
      }
      it.el.style.transform = `translate3d(${it.x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${it.angle.toFixed(3)}deg)`;
    }

    const d = ropePath(g, this.sag, this.pins, items.length, -12, g.width + 12);
    for (const rope of this.ropes) rope.setAttribute("d", d);

    if (restless) this.raf = requestAnimationFrame(this.frame);
  };

  /** Offset as drawn: while dragging past an end of a short line the pull meets resistance. */
  private shown() {
    if (this.loop) return this.offset;
    const bound = Math.min(this.maxOffset, Math.max(this.minOffset, this.offset));
    return bound + (this.offset - bound) * (this.dragging ? 0.35 : 1);
  }

  // ——— input ———

  private on<K extends keyof HTMLElementEventMap>(type: K, fn: (e: HTMLElementEventMap[K]) => void, opts?: AddEventListenerOptions) {
    this.stage.addEventListener(type, fn as EventListener, opts);
    this.disposers.push(() => this.stage.removeEventListener(type, fn as EventListener, opts));
  }

  /** Grabbing a moving line stops it, like catching a swinging rope. */
  private catchLine(x: number, t: number) {
    this.samples = [{ x, t }];
    this.velocity = 0;
    this.tween = null;
  }

  private startDrag() {
    this.dragging = true;
    this.tween = null;
    this.hovered = null;
    this.stage.classList.add("is-dragging");
  }

  private dragTo(x: number, t: number, from: { lastX: number }) {
    this.offset += x - from.lastX;
    from.lastX = x;
    this.samples.push({ x, t });
    if (this.samples.length > 12) this.samples.shift();
    this.wake();
  }

  private endDrag(t: number, glide: boolean, boost: number, inertiaTime: number) {
    this.dragging = false;
    this.inertiaTime = inertiaTime;
    this.stage.classList.remove("is-dragging");
    this.velocity = this.reduced || !glide ? 0 : releaseVelocity(this.samples, t) * boost;
    this.suppressClickUntil = performance.now() + 400;
    this.wake();
  }

  private listen() {
    this.on("pointerdown", (e) => {
      // Fingers go through the touch handlers below, which can stop the page from scrolling.
      if (e.pointerType === "touch" || this.pointer || (e.pointerType === "mouse" && e.button !== 0)) return;
      this.pointer = { id: e.pointerId, startX: e.clientX, startY: e.clientY, lastX: e.clientX };
      this.catchLine(e.clientX, e.timeStamp);
    });

    this.on("pointermove", (e) => {
      const p = this.pointer;
      if (!p || e.pointerId !== p.id) return;
      if (!this.dragging) {
        if (Math.abs(e.clientX - p.startX) < DRAG_THRESHOLD) return;
        this.stage.setPointerCapture(e.pointerId);
        this.startDrag();
      }
      this.dragTo(e.clientX, e.timeStamp, p);
    });

    const release = (e: PointerEvent) => {
      const p = this.pointer;
      if (!p || e.pointerId !== p.id) return;
      this.pointer = null;
      if (this.dragging) this.endDrag(e.timeStamp, e.type !== "pointercancel", 1, INERTIA_TIME_MS);
    };
    this.on("pointerup", release);
    this.on("pointercancel", release);
    this.on("lostpointercapture", release);

    this.on(
      "click",
      (e) => {
        if (performance.now() > this.suppressClickUntil) return;
        e.preventDefault();
        e.stopPropagation();
      },
      { capture: true },
    );

    // Touch: decide the direction on the first few pixels. Horizontal moves the line and
    // blocks the page from scrolling (pointer events cannot do that); vertical is left to the page.
    this.on(
      "touchstart",
      (e) => {
        if (this.touch || e.touches.length !== 1) return;
        const t = e.changedTouches[0];
        this.touch = { id: t.identifier, startX: t.clientX, startY: t.clientY, lastX: t.clientX, mode: "pending" };
        this.catchLine(t.clientX, e.timeStamp);
      },
      { passive: true },
    );

    this.on(
      "touchmove",
      (e) => {
        const tt = this.touch;
        const t = tt && [...e.changedTouches].find((c) => c.identifier === tt.id);
        if (!tt || !t || tt.mode === "scroll") return;
        if (tt.mode === "pending") {
          const dx = Math.abs(t.clientX - tt.startX);
          const dy = Math.abs(t.clientY - tt.startY);
          if (Math.max(dx, dy) < TOUCH_DECIDE) return;
          if (dy > dx) {
            tt.mode = "scroll";
            return;
          }
          tt.mode = "drag";
          this.startDrag();
        }
        if (e.cancelable) e.preventDefault();
        this.dragTo(t.clientX, e.timeStamp, tt);
      },
      { passive: false },
    );

    const touchEnd = (e: TouchEvent) => {
      const tt = this.touch;
      if (!tt || ![...e.changedTouches].some((c) => c.identifier === tt.id)) return;
      this.touch = null;
      if (tt.mode === "drag") this.endDrag(e.timeStamp, e.type === "touchend", TOUCH_INERTIA_BOOST, TOUCH_INERTIA_TIME_MS);
    };
    this.on("touchend", touchEnd);
    this.on("touchcancel", touchEnd);

    // Trackpads swipe horizontally; vertical wheel is left to the page.
    this.on(
      "wheel",
      (e) => {
        const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
        if (!dx) return;
        e.preventDefault();
        this.tween = null;
        this.velocity = 0;
        this.offset -= dx * (e.deltaMode === 1 ? 32 : 1);
        this.wake();
      },
      { passive: false },
    );

    this.on("keydown", (e) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-line-item]");
      if (card && e.key === " ") {
        e.preventDefault();
        card.click();
        return;
      }
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      if (!card) {
        this.moveBy(-dir * (this.g.cardWidth + this.g.gap), 420);
        return;
      }
      // Arrow keys walk the focus along the line; focusin then brings the print into view.
      const list = this.items.filter((i) => !i.el.inert).sort((a, b) => a.base - b.base);
      const at = list.findIndex((i) => i.el === card);
      list[(at + dir + list.length) % list.length]?.el.focus({ preventScroll: true });
    });

    this.on("focusin", (e) => {
      // Only keyboard focus scrolls the line; a mouse press on a print must not fight the drag.
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-line-item]");
      if (card?.matches(":focus-visible")) this.bringIntoView(card);
    });

    this.on("pointerover", (e) => {
      if (e.pointerType !== "mouse" || this.dragging) return;
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-line-item]");
      if (card !== this.hovered) {
        this.hovered = card;
        this.wake();
      }
    });
    this.on("pointerleave", () => {
      this.hovered = null;
      this.wake();
    });
  }
}
