"use client";

import { useEffect } from "react";

/** Press feedback for every button and link: a short compress and a spring release (see src/lib/press.js). */
export function PressFeedback() {
  useEffect(() => {
    import("@/lib/press");
  }, []);
  return null;
}
