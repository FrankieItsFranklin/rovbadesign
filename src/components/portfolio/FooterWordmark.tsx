"use client";

import { useEffect, useRef } from "react";
import { WORD_LETTERS } from "@/components/brand-logo";

// Tight box around the five letters of the wordmark (they sit at x 227.8–693.3, y 0–102 in the logo).
const WORD_VIEWBOX = "227.82 0 465.49 101.96";

/** The name closes the page at full width; its letters rise from behind the edge as the footer arrives. */
export function FooterWordmark() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hidden only once script runs, so without JS the name is simply there.
    svg.dataset.state = "waiting";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        svg.dataset.state = "in";
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} className="footer-word" viewBox={WORD_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false">
      {WORD_LETTERS.map((d, i) => (
        <path key={i} d={d} style={{ ["--i" as string]: i }} />
      ))}
    </svg>
  );
}
