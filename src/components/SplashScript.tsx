"use client";

// Played once per browser session; decided before the splash is painted so a return visit never flashes it.
const SPLASH_ONCE = `try{var k="rovba:splash";if(sessionStorage.getItem(k)){document.documentElement.dataset.splash="skip"}else{sessionStorage.setItem(k,"1");document.documentElement.dataset.splash="play"}}catch(e){document.documentElement.dataset.splash="play"}`;

/**
 * Inline and synchronous, so it runs from the server HTML before the splash paints. When React
 * re-creates it in the browser (a language switch remounts the layout) it is an inert data block.
 */
export function SplashScript() {
  return (
    <script
      type={typeof window === "undefined" ? undefined : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SPLASH_ONCE }}
    />
  );
}
