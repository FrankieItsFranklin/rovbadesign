"use client";

import { useEffect, useRef } from "react";
import { onStrandSelect, pageY, strandLayout, wireToStrand, type StrandLayout } from "./strand";

/*
 * The strand, drawn by three.js (DESIGN.md §5). Nothing is stored per plate: every piece is computed in the vertex
 * shader from its index along the strand, and only the stretch around the window is drawn, so the cost does not grow
 * with the length of the page. The canvas lives in the page and scrolls with it (see place()).
 *
 * Layers, back to front: a soft shadow on the page, a white halo, the motes, the plates, a faint veil that blends the
 * plates into one body, and two dotted threads that wind round it (their back half passes behind the plates).
 * Motion: the strand twists slowly along its length and light packets run down the threads. One red marker shows the
 * chosen service or the section in view; it glides along the strand, and the plates it reaches turn red and make a
 * 120° turn to the right, turning back once it moves on.
 */

const MAX_PLATES = 1200;
// Plate spacing against the layout's base gap: the dense strand chosen in review.
const DENSITY = 0.55;
const MAX_DOTS = 3400;
const MAX_MOTES = 160;
const MOTE_CELL = 70;
const TURN = (Math.PI * 2) / 3;

// Shared GLSL: the strand's path and the selection window, the same formulas as strand.ts.
const COMMON = /* glsl */ `
  uniform vec2 uView;
  uniform float uScroll;
  uniform float uX;
  uniform float uSway;
  uniform float uWave;
  uniform float uSize;
  uniform float uGap;
  uniform float uTime;
  uniform float uEnd;
  uniform float uDark;
  uniform float uReveal;
  uniform vec2 uSelY;
  uniform vec2 uSelAmt;

  const float PI = 3.14159265;

  float strandX(float y) { return uX + sin(y / uWave * PI * 2.0 - 0.9) * uSway; }

  // The entrance grows the strand down from the header's tab: nothing below uReveal yet.
  float revealAt(float y) { return smoothstep(uReveal, uReveal - 140.0, y); }

  // How strongly a height on the strand belongs to a selection: the chosen plates and a soft edge either side.
  float selectionAt(float y) {
    float w = uSize * 0.55;
    float a = smoothstep(w * 2.2, w * 0.6, abs(y - uSelY.x)) * uSelAmt.x;
    float b = smoothstep(w * 2.2, w * 0.6, abs(y - uSelY.y)) * uSelAmt.y;
    return max(a, b);
  }

  // Screen position in clip space for a point in CSS pixels (y from the top of the window) and a depth.
  vec4 toClip(vec2 p, float z) {
    return vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, -z / 4000.0, 1.0);
  }

  float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
`;

const PLATE_VERT = /* glsl */ `
  ${COMMON}
  attribute float aI;
  uniform float uK0;
  varying vec3 vN;
  varying float vRed;
  varying float vSheen;
  varying float vFade;
  varying float vDark;

  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0); }
  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }

  void main() {
    float k = uK0 + aI;
    float y = k * uGap;
    float sel = selectionAt(y);
    // The selected plates turn one after another from the middle out.
    float lag = clamp(abs(y - (uSelAmt.x > uSelAmt.y ? uSelY.x : uSelY.y)) / (uSize * 1.4), 0.0, 1.0);
    float turn = smoothstep(lag * 0.35, 1.0, sel);
    // The twist along the strand (one turn per 240px, whatever the spacing), a slow wave through it, and a slow
    // steady turn to the right (negative angles turn the plates' near edges rightward).
    float spin = y / 240.0 * PI * 2.0 + sin(y * 0.0045 - uTime * 0.5) * 0.22 - uTime * 0.25 + turn * ${-TURN};
    mat3 m = rotX(1.012) * rotZ(spin); // 58° tilt, as the plates had in CSS
    vec3 p = m * (position * uSize * 0.9 * mix(0.2, 1.0, revealAt(y)));
    p.xy *= 900.0 / (900.0 - p.z); // each plate keeps its own perspective
    vN = m * normal;
    vRed = sel;
    // A light wave runs down the strand every few seconds.
    float wave = fract(uTime / 7.0) * (uView.y + 600.0) - 300.0;
    vSheen = smoothstep(60.0, 0.0, abs(y - uScroll - wave));
    vFade = smoothstep(0.0, 160.0, y) * revealAt(y) * smoothstep(uEnd, uEnd - 120.0, y);
    vDark = step(uDark, y);
    vec2 s = vec2(strandX(y) + p.x, y - uScroll + p.y);
    gl_Position = toClip(s, p.z + (y > uEnd ? 1e5 : 0.0));
  }
`;

const PLATE_FRAG = /* glsl */ `
  varying vec3 vN;
  varying float vRed;
  varying float vSheen;
  varying float vFade;
  varying float vDark;
  uniform float uSoft;
  uniform float uAlpha;

  void main() {
    vec3 n = normalize(vN);
    if (n.z < 0.0) n = -n;
    // Softness bends every normal toward the viewer, so neighbouring plates shade alike and read as one body.
    n = normalize(mix(n, vec3(-0.15, -0.35, 1.0), uSoft * 0.7));
    // Light from the upper left and in front (y points down the page).
    float diff = max(dot(n, normalize(vec3(-0.45, -0.75, 0.6))), 0.0);
    diff = mix(diff, 0.55 + diff * 0.45, uSoft);
    float rim = pow(1.0 - abs(n.z), 3.0) * (1.0 - uSoft);
    vec3 col = mix(vec3(0.66, 0.69, 0.72), vec3(1.0, 1.0, 0.995), diff);
    col = mix(col, vec3(0.32, 0.33, 0.36), vDark * (1.0 - diff) * 0.6);
    vec3 red = mix(vec3(0.46, 0.13, 0.17), vec3(0.83, 0.38, 0.43), diff);
    col = mix(col, red, vRed);
    col += vec3(1.0) * (vSheen * 0.35 * (1.0 - vRed) + rim * 0.12);
    float alpha = mix(uAlpha, 1.0, vRed * 0.6) * vFade;
    gl_FragColor = vec4(min(col, 1.0), alpha);
  }
`;

// Two threads winding round the strand, one dot every few pixels; dots in front are larger and darker.
const DOT_VERT = /* glsl */ `
  ${COMMON}
  attribute float aI;
  uniform float uD0;
  uniform float uDotGap;
  uniform float uDpr;
  varying float vA;
  varying float vHot;
  varying float vDark;

  void main() {
    float idx = uD0 + floor(aI / 2.0);
    float side = mod(aI, 2.0);
    float y = idx * uDotGap;
    float a = y / 240.0 * PI * 2.0 + side * PI - uTime * 0.35;
    float r = uSize * 0.78 * (1.0 + selectionAt(y) * 0.45);
    float z = sin(a) * r;
    vec2 s = vec2(strandX(y) + cos(a) * r, y - uScroll + z * 0.32);
    float front = smoothstep(-r, r, z);
    // Light packets run down each thread.
    float packet = pow(fract((y - uTime * 260.0 + side * 350.0) / 700.0), 14.0);
    vHot = selectionAt(y) * 0.8;
    vA = (0.14 + front * 0.5 + packet * 0.6) * smoothstep(0.0, 160.0, y) * revealAt(y) * smoothstep(uEnd, uEnd - 120.0, y);
    vDark = step(uDark, y);
    gl_PointSize = (1.1 + front * 1.1 + packet * 1.6 + vHot * 1.4) * uDpr;
    gl_Position = toClip(s, z);
    if (y > uEnd) gl_Position.z = 2.0;
  }
`;

const DOT_FRAG = /* glsl */ `
  varying float vA;
  varying float vHot;
  varying float vDark;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.2, d) * vA;
    vec3 ink = mix(vec3(0.17, 0.17, 0.19), vec3(0.95), vDark);
    gl_FragColor = vec4(mix(ink, vec3(0.65, 0.18, 0.24), vHot), min(a + vHot * 0.5, 1.0));
  }
`;

// Motes: specks that rise slowly near the strand and fade in and out; a few flare as small crosses of light.
const MOTE_VERT = /* glsl */ `
  ${COMMON}
  attribute float aI;
  uniform float uM0;
  uniform float uCell;
  uniform float uDpr;
  varying float vA;
  varying float vFlare;
  varying float vDark;

  void main() {
    float id = uM0 * 3.0 + aI;
    float cell = floor(id / 3.0);
    float h1 = hash(id), h2 = hash(id + 7.3), h3 = hash(id + 19.1);
    float life = fract(uTime / (9.0 + h3 * 8.0) + h1);
    float y = (cell + 1.0 - life) * uCell;
    float side = h2 < 0.5 ? -1.0 : 1.0;
    float x = strandX(y) + side * (uSize * 0.9 + h3 * uSize * 2.4);
    vA = sin(life * PI) * (0.25 + h2 * 0.4) * smoothstep(0.0, 160.0, y) * revealAt(y) * step(y, uEnd);
    vFlare = step(0.86, h1) * smoothstep(0.35, 0.5, life) * smoothstep(0.65, 0.5, life);
    vDark = step(uDark, y);
    gl_PointSize = (2.0 + h3 * 2.0 + vFlare * 14.0) * uDpr;
    gl_Position = toClip(vec2(x, y - uScroll), 0.0);
  }
`;

const MOTE_FRAG = /* glsl */ `
  varying float vA;
  varying float vFlare;
  varying float vDark;

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float dot = smoothstep(0.5, 0.0, length(p));
    float cross = (smoothstep(0.03, 0.0, abs(p.x)) + smoothstep(0.03, 0.0, abs(p.y))) * smoothstep(0.5, 0.0, length(p));
    float a = mix(dot, max(cross, smoothstep(0.12, 0.0, length(p))), vFlare) * vA;
    vec3 ink = mix(vec3(0.3, 0.31, 0.34), vec3(1.0), max(vDark, vFlare * 0.6));
    gl_FragColor = vec4(ink, a);
  }
`;

// A soft shadow cast on the page: a wide gaussian band offset down and to the right.
const SHADOW_VERT = /* glsl */ `
  ${COMMON}
  attribute float aI;
  uniform float uK0;
  uniform float uDpr;
  varying float vA;

  void main() {
    float y = (uK0 + aI * 4.0) * uGap;
    vA = 0.025 * smoothstep(0.0, 160.0, y) * revealAt(y) * smoothstep(uEnd, uEnd - 120.0, y) * (1.0 - step(uDark, y));
    gl_PointSize = uSize * 2.2 * uDpr;
    gl_Position = toClip(vec2(strandX(y) + uSize * 0.45, y - uScroll + uSize * 0.5), -50.0);
  }
`;

const SHADOW_FRAG = /* glsl */ `
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    gl_FragColor = vec4(0.12, 0.12, 0.16, exp(-d * d * 4.0) * vA);
  }
`;

// Glow: soft white light along the strand, warmed toward the accent where a selection is. Drawn twice: a wide halo
// behind the plates and a narrow veil in front of them that blurs the seams between plates.
const GLOW_VERT = /* glsl */ `
  ${COMMON}
  attribute float aI;
  uniform float uG0;
  uniform float uEvery;
  uniform float uScale;
  uniform float uStrength;
  uniform float uDpr;
  varying float vA;
  varying float vRed;

  void main() {
    float y = (uG0 + aI * uEvery) * uGap;
    vRed = selectionAt(y);
    vA = uStrength * (1.0 + vRed * 1.5) * smoothstep(0.0, 160.0, y) * revealAt(y) * smoothstep(uEnd, uEnd - 120.0, y);
    gl_PointSize = uSize * uScale * (1.0 + vRed * 0.4) * uDpr;
    gl_Position = toClip(vec2(strandX(y), y - uScroll), 0.0);
  }
`;

const GLOW_FRAG = /* glsl */ `
  varying float vA;
  varying float vRed;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    vec3 col = mix(vec3(1.0, 1.0, 0.99), vec3(0.86, 0.36, 0.42), vRed);
    gl_FragColor = vec4(col, exp(-d * d * 3.5) * vA);
  }
`;


export function StrandCanvas() {
  const host = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = host.current;
    if (!canvas) return;
    let disposed = false;
    let stop = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        document.documentElement.dataset.strand = "off";
        return;
      }
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();

      const u = {
        uView: { value: new THREE.Vector2(1, 1) },
        uScroll: { value: 0 },
        uX: { value: 0 },
        uSway: { value: 0 },
        uWave: { value: 1000 },
        uSize: { value: 34 },
        uGap: { value: 6 },
        uTime: { value: 0 },
        uEnd: { value: 1e6 },
        uDark: { value: 1e6 },
        uReveal: { value: 1e7 },
        uSelY: { value: new THREE.Vector2(-1e4, -1e4) },
        uSelAmt: { value: new THREE.Vector2(0, 0) },
        uDpr: { value: dpr },
        uSoft: { value: 0 },
        uAlpha: { value: 0.9 },
      };
      const index = (n: number) => Float32Array.from({ length: n }, (_, i) => i);

      // Plates: a thin triangular slab with softly rounded corners, centred on its own middle (y points down the page).
      const corners = [new THREE.Vector2(0, -0.48), new THREE.Vector2(0.5, 0.4), new THREE.Vector2(-0.5, 0.4)];
      const tri = new THREE.Shape();
      corners.forEach((c, i) => {
        const from = c.clone().lerp(corners[(i + 2) % 3], 0.16);
        const to = c.clone().lerp(corners[(i + 1) % 3], 0.16);
        if (i === 0) tri.moveTo(from.x, from.y);
        else tri.lineTo(from.x, from.y);
        tri.quadraticCurveTo(c.x, c.y, to.x, to.y);
      });
      tri.closePath();
      const slab = new THREE.ExtrudeGeometry(tri, { depth: 0.07, bevelEnabled: false, curveSegments: 6 }).translate(0, 0, -0.035);
      const plateGeo = new THREE.InstancedBufferGeometry().copy(slab as unknown as InstanceType<typeof THREE.InstancedBufferGeometry>);
      plateGeo.setAttribute("aI", new THREE.InstancedBufferAttribute(index(MAX_PLATES), 1));
      slab.dispose();
      const plateU = { ...u, uK0: { value: 0 } };
      const plates = new THREE.Mesh(
        plateGeo,
        new THREE.ShaderMaterial({ uniforms: plateU, vertexShader: PLATE_VERT, fragmentShader: PLATE_FRAG, transparent: true, side: THREE.DoubleSide }),
      );

      const points = <E extends Record<string, { value: number }>>(n: number, extra: E, vertexShader: string, fragmentShader: string, order: number) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
        g.setAttribute("aI", new THREE.BufferAttribute(index(n), 1));
        const uniforms = { ...u, ...extra };
        const p = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false }));
        p.renderOrder = order;
        return { p, uniforms };
      };
      const glow = (every: number, scale: number, order: number) => {
        const g = points(Math.ceil(MAX_PLATES / every) + 2, { uG0: { value: 0 }, uEvery: { value: every }, uScale: { value: scale }, uStrength: { value: 0 } }, GLOW_VERT, GLOW_FRAG, order);
        g.p.material.depthTest = false;
        return g;
      };
      const halo = glow(4, 3.4, -1.5);
      const veil = glow(2, 1.25, 1.5);
      const shadow = points(MAX_PLATES / 4 + 2, { uK0: { value: 0 } }, SHADOW_VERT, SHADOW_FRAG, -2);
      shadow.p.material.depthTest = false;
      const motes = points(MAX_MOTES, { uM0: { value: 0 }, uCell: { value: MOTE_CELL } }, MOTE_VERT, MOTE_FRAG, -1);
      const dots = points(MAX_DOTS, { uD0: { value: 0 }, uDotGap: { value: 3 } }, DOT_VERT, DOT_FRAG, 1);

      for (const o of [shadow.p, halo.p, motes.p, plates, veil.p, dots.p]) {
        o.frustumCulled = false;
        scene.add(o);
      }

      let dirty = true;
      // The glow look chosen in review (variant B): plates a little softened, a halo behind, a faint veil in front.
      u.uSoft.value = 0.3;
      u.uAlpha.value = 0.88;
      // Halo and veil are built per plate, so they are scaled down by the density to keep the same light.
      halo.uniforms.uStrength.value = 0.2 * DENSITY;
      veil.uniforms.uStrength.value = 0.05 * DENSITY;

      // ——— layout ———
      // The canvas is not fixed: it sits in the page, taller than the window, and scrolls with it natively, so the
      // strand never lags behind the content. When the window nears an edge of the canvas, the canvas is moved and
      // redrawn around it.
      let layout: StrandLayout | null = null;
      let anchors: HTMLElement[] = [];
      let top = 0;
      let height = 0;
      const place = () => {
        const docH = document.documentElement.scrollHeight;
        const margin = Math.round(innerHeight * 0.6);
        height = Math.min(innerHeight + margin * 2, docH);
        top = Math.max(0, Math.min(scrollY - margin, docH - height));
        canvas.style.transform = `translateY(${top}px)`;
        dirty = true;
      };
      const measure = () => {
        layout = strandLayout();
        if (!layout) return;
        place();
        // Only the rail strip is drawn: the strand, its threads, glow and motes never reach past it.
        const w = Math.min(document.documentElement.clientWidth, Math.ceil(layout.x + layout.sway + layout.size * 4.5 + 40));
        canvas.style.width = `${w}px`;
        canvas.style.height = `${height}px`;
        renderer.setSize(w, height, false);
        u.uView.value.set(w, height);
        u.uX.value = layout.x;
        u.uSway.value = layout.sway;
        u.uWave.value = layout.wave;
        u.uSize.value = layout.size;
        // The dense strand chosen in review: plates a little over half the old spacing apart.
        u.uGap.value = layout.gap * DENSITY;
        dots.uniforms.uDotGap.value = layout.gap * 0.5;
        u.uEnd.value = document.documentElement.scrollHeight;
        const dark = document.querySelector<HTMLElement>("[data-strand-dark]");
        u.uDark.value = dark ? dark.getBoundingClientRect().top + scrollY : 1e6;
        anchors = [...document.querySelectorAll<HTMLElement>("[data-strand-anchor]")];
        for (const a of document.querySelectorAll<HTMLElement>("[data-strand-wire], [data-strand-anchor]")) wireToStrand(a, layout);
      };

      // ——— selection: a level the page asks for (the service index, a project) or the section in view ———
      // One red marker. It glides along the strand to the level it is given and fades out when there is none, so
      // scrolling from section to section moves the red smoothly down the strand; the plates it passes turn and
      // turn back as it goes.
      const marker = { y: -1e4, v: 0, amt: 0, target: null as number | null };
      let heroY: number | null = null;
      let activeAnchor: HTMLElement | null = null;

      const show = (y: number | null) => {
        if (y === marker.target) return;
        // From nothing, the marker appears where it is needed instead of sliding in from far away.
        if (y !== null && (marker.amt < 0.05 || still)) marker.y = y;
        marker.target = y;
        dirty = true;
      };

      const pickTarget = () => {
        const hero = document.querySelector<HTMLElement>(".hero");
        const heroIn = hero ? hero.getBoundingClientRect().bottom > innerHeight * 0.45 : false;
        let active: HTMLElement | null = null;
        if (!heroIn) {
          let best = Infinity;
          for (const a of anchors) {
            const r = a.getBoundingClientRect();
            const d = Math.abs(r.top + r.height / 2 - innerHeight * 0.42);
            if (r.bottom > 0 && r.top < innerHeight * 0.8 && d < best) {
              best = d;
              active = a;
            }
          }
        }
        if (active !== activeAnchor) {
          activeAnchor?.removeAttribute("data-active");
          active?.setAttribute("data-active", "");
          activeAnchor = active;
        }
        // A level asked for by the page (a chosen service, a project under the pointer) wins while it is on screen.
        const asked = heroY !== null && heroY > scrollY && heroY < scrollY + innerHeight ? heroY : null;
        show(heroIn ? heroY : (asked ?? (active ? pageY(active) : null)));
      };

      const offSelect = onStrandSelect((y) => {
        heroY = y;
        pickTarget();
      });

      // ——— loop ———
      // First page of the session: the strand grows down once the entrance has landed on the tab (Intro, ~1.3 s).
      const growing = !still && document.documentElement.dataset.seen === undefined;
      const growFrom = Math.max(performance.now(), 1300);
      const GROW_MS = 1400;
      if (growing) u.uReveal.value = 0;

      let raf = 0;
      let last = performance.now();
      let odd = false;
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!layout) return;
        if (scrollY < top + innerHeight * 0.15 || scrollY + innerHeight > top + height - innerHeight * 0.15) {
          const before = top;
          place();
          if (top === before) dirty = still ? dirty : true;
        }
        if (still && !dirty) return;
        // At rest (no marker moving) the slow idle motion is drawn at half rate.
        const resting = Math.abs(marker.v) < 1 && (marker.amt === 0 || marker.amt === 1) && u.uReveal.value >= 1e7;
        odd = !odd;
        if (!still && !dirty && resting && odd) return;
        dirty = false;

        if (still) {
          marker.amt = marker.target === null ? 0 : 1;
          if (marker.target !== null) marker.y = marker.target;
        } else {
          u.uTime.value = now / 1000;
          // A critically damped spring carries the marker to its level; its strength fades in and out.
          if (marker.target !== null) {
            const k = 70;
            marker.v += ((marker.target - marker.y) * k - marker.v * 2 * Math.sqrt(k)) * dt;
            marker.y += marker.v * dt;
          }
          const want = marker.target === null ? 0 : 1;
          marker.amt += Math.sign(want - marker.amt) * Math.min(Math.abs(want - marker.amt), dt * 2.4);
        }
        if (growing && u.uReveal.value < 1e7) {
          const t = Math.min(1, Math.max(0, (now - growFrom) / GROW_MS));
          u.uReveal.value = t >= 1 ? 1e7 : (1 - Math.pow(1 - t, 3)) * (scrollY + innerHeight + 300);
          dirty = true;
        }
        u.uScroll.value = top;
        u.uSelY.value.set(marker.y, -1e4);
        u.uSelAmt.value.set(marker.amt, 0);

        // Only the stretch the canvas covers (and a margin) is drawn.
        const from = top - 80;
        const gap = u.uGap.value;
        const k0 = Math.max(0, Math.floor(from / gap));
        plateU.uK0.value = k0;
        plateGeo.instanceCount = Math.min(MAX_PLATES, Math.ceil((height + 160) / gap) + 1);
        shadow.uniforms.uK0.value = k0 - (k0 % 4);
        dots.uniforms.uD0.value = Math.max(0, Math.floor(from / (layout.gap * 0.5)));
        motes.uniforms.uM0.value = Math.max(0, Math.floor(from / MOTE_CELL) - 1);
        halo.uniforms.uG0.value = k0 - (k0 % 4);
        veil.uniforms.uG0.value = k0 - (k0 % 2);
        renderer.render(scene, camera);
      };

      let measureTimer = 0;
      const remeasure = () => {
        clearTimeout(measureTimer);
        measureTimer = window.setTimeout(() => {
          measure();
          pickTarget();
        }, 120);
      };
      const onScroll = () => pickTarget();
      const ro = new ResizeObserver(remeasure);
      ro.observe(document.body);
      addEventListener("resize", remeasure);
      addEventListener("scroll", onScroll, { passive: true });
      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      document.fonts?.ready.then(remeasure);

      measure();
      pickTarget();
      document.documentElement.dataset.strand = "on";
      raf = requestAnimationFrame(frame);

      stop = () => {
        cancelAnimationFrame(raf);
        clearTimeout(measureTimer);
        offSelect();
        ro.disconnect();
        removeEventListener("resize", remeasure);
        removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisibility);
        activeAnchor?.removeAttribute("data-active");
        scene.traverse((o) => {
          const m = o as InstanceType<typeof THREE.Mesh>;
          m.geometry?.dispose();
          (m.material as InstanceType<typeof THREE.Material> | undefined)?.dispose?.();
        });
        renderer.dispose();
        delete document.documentElement.dataset.strand;
      };
    });

    return () => {
      disposed = true;
      stop();
    };
  }, []);

  return <canvas ref={host} className="strand-canvas" aria-hidden="true" />;
}
