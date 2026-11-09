"use client";

import { useLayoutEffect } from "react";

// The entrance (DESIGN.md §6) plays on the first page of a browser session only. Decided before the first paint,
// so a return visit never shows the start of it.
const SEEN = `try{var k="rovba:entered";if(sessionStorage.getItem(k))document.documentElement.dataset.seen="";else sessionStorage.setItem(k,"1")}catch(e){}`;

/**
 * Inline and synchronous from the server HTML. When React re-creates <html> (a language switch remounts the layout)
 * the attribute is lost, so the layout effect puts it back before that paint.
 */
let root: HTMLElement | null = null;

export function EnterScript() {
  useLayoutEffect(() => {
    // The first hydration keeps whatever the inline script decided; a new <html> (a remount) is marked as seen.
    // Comparing the element, not counting mounts, keeps React's development double-mount from skipping the entrance.
    const html = document.documentElement;
    if (root && root !== html) html.dataset.seen = "";
    root = html;
  }, []);
  return (
    <script
      type={typeof window === "undefined" ? undefined : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SEEN }}
    />
  );
}
