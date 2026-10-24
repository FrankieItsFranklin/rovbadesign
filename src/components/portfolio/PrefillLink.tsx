"use client";

import type { ReactNode } from "react";
import { PREFILL_EVENT, type Prefill } from "./ContactForm";
import type { Lang } from "@/i18n/config";

/** Scrolls to the contact form and fills in the topic (and a message start) for the visitor. */
export function PrefillLink({ topic, message, className, children }: Prefill & { lang: Lang; className?: string; children: ReactNode }) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: { topic, message } }));
        history.replaceState(null, "", "#contact");
      }}
    >
      {children}
    </a>
  );
}
