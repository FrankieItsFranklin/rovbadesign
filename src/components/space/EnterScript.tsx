"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// The entrance (DESIGN.md §6) plays on the first page of a browser session only. Decided before the first paint,
// so a return visit never shows the start of it.
const SEEN = `try{var k="rovba:entered";if(sessionStorage.getItem(k))document.documentElement.dataset.seen="";else sessionStorage.setItem(k,"1")}catch(e){}`;

/**
 * Inline and synchronous from the server HTML. Within the visit, any move to another address inside the site (a
 * language switch, a link) marks the entrance as seen before that paint, so neither the entrance nor the reveal of the
 * first screen plays again; a re-created <html> (the layout remounted) is marked as well, since it lost the attribute.
 */
let root: HTMLElement | null = null;
let firstPath: string | null = null;

export function EnterScript() {
  const path = usePathname();
  useLayoutEffect(() => {
    // Comparing the element and the path, not counting mounts, keeps React's development double-mount from skipping
    // the entrance on the first page.
    const html = document.documentElement;
    if (firstPath === null) firstPath = path;
    if ((root && root !== html) || path !== firstPath) html.dataset.seen = "";
    root = html;
  }, [path]);
  return (
    <script
      type={typeof window === "undefined" ? undefined : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SEEN }}
    />
  );
}
