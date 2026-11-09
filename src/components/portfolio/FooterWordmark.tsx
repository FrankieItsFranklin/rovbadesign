"use client";

import { useEffect, useRef } from "react";

/** The name closes the page in the header's face (Saira); its letters rise from behind the edge as the footer arrives. */
export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const word = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hidden only once script runs, so without JS the name is simply there.
    word.dataset.state = "waiting";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        word.dataset.state = "in";
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(word);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} className="footer-word" aria-hidden="true">
      {[..."ROVBA"].map((ch, i) => (
        <span key={i} style={{ ["--i" as string]: i }}>
          {ch}
        </span>
      ))}
    </p>
  );
}
