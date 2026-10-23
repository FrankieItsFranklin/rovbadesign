// Carries a print from the line into the case study hero across a client-side navigation.
// The flying copy lives on document.body, outside React, so it survives the route change.

type Pending = { slug: string; el: HTMLDivElement; sharp: HTMLImageElement; lifted: string; timer: number };

// next/image's default device sizes: asking for the same width the hero will request means one download.
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const heroUrl = (src: string) => {
  const need = window.innerWidth * window.devicePixelRatio;
  const w = DEVICE_SIZES.find((s) => s >= need) ?? 3840;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=80`;
};
let pending: Pending | null = null;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function cleanup() {
  if (!pending) return;
  window.clearTimeout(pending.timer);
  pending.el.remove();
  pending = null;
}

/** heroSrc: the case study's hero image, faded in during the flight so the print arrives sharp. */
export function startHandoff(slug: string, print: HTMLElement, rotation: number, heroSrc: string) {
  cleanup();
  const img = print.querySelector("img");
  if (!img) return;
  const r = print.getBoundingClientRect();
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  Object.assign(el.style, {
    position: "fixed",
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${print.offsetWidth}px`,
    height: `${print.offsetHeight}px`,
    transform: `rotate(${rotation}deg)`,
    borderRadius: getComputedStyle(print).borderRadius,
    overflow: "hidden",
    zIndex: "80",
    pointerEvents: "none",
    boxShadow: "0 18px 40px rgba(30, 24, 16, 0.14)",
  });
  // Use the rect centre so the rotated print does not jump.
  el.style.left = `${r.left + r.width / 2 - print.offsetWidth / 2}px`;
  el.style.top = `${r.top + r.height / 2 - print.offsetHeight / 2}px`;
  const copy = img.cloneNode() as HTMLImageElement;
  copy.removeAttribute("sizes");
  copy.removeAttribute("srcset");
  copy.src = img.currentSrc || img.src;
  Object.assign(copy.style, { position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: img.style.objectPosition || "50% 0%" });
  const sharp = copy.cloneNode() as HTMLImageElement;
  sharp.src = heroUrl(heroSrc);
  Object.assign(sharp.style, { objectPosition: "50% 0%", opacity: "0" });
  el.append(copy, sharp);
  document.body.appendChild(el);
  const lifted = `translateY(-10px) rotate(${rotation * 0.4}deg) scale(1.03)`;
  el.animate([{ transform: `rotate(${rotation}deg)` }, { transform: lifted }], { duration: 220, easing: EASE, fill: "forwards" });
  pending = { slug, el, sharp, lifted, timer: window.setTimeout(cleanup, 2500) };
}

/** Returns true when a print was flying in and the target should wait to be revealed. */
export function completeHandoff(slug: string, target: HTMLElement, reveal: () => void) {
  if (!pending || pending.slug !== slug) {
    cleanup();
    return false;
  }
  const { el, sharp, lifted } = pending;
  window.clearTimeout(pending.timer);
  const to = target.getBoundingClientRect();
  const radius = getComputedStyle(target).borderRadius;
  el.getAnimations().forEach((a) => a.cancel());
  // left/top/width/height in el.style are the untransformed box; the lift lives in transform.
  const flight = el.animate(
    [
      { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height, transform: lifted },
      { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px`, transform: "none", borderRadius: radius, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    ],
    { duration: 720, easing: EASE, fill: "forwards" },
  );
  sharp.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, delay: 260, easing: "ease", fill: "forwards" });
  flight.onfinish = () => {
    reveal();
    const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: "ease", fill: "forwards" });
    fade.onfinish = () => {
      el.remove();
      if (pending?.el === el) pending = null;
    };
  };
  return true;
}

export const hasPendingHandoff = (slug: string) => pending?.slug === slug;
