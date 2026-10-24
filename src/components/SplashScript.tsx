"use client";

// Played once per browser session; decided before the splash is painted so a return visit never flashes it.
// FLY: where the assembled mark has to travel to land exactly on the header logo (see .splash-logo in globals.css).
// Logo viewBox is 701.31 × 162 units, the mark's centre sits at (92.9, 81); the header mark is 30/34 px tall.
const FLY = `var r=document.documentElement,w=innerWidth,h=innerHeight,W=Math.min(520,w*.76),H=W*162/701.31,md=w>=768,mh=md?34:30,pt=md?24:20,g=Math.min(32,Math.max(16,w*.022)),ox=W*92.9/701.31,oy=H/2;r.style.setProperty("--fly-ox",ox+"px");r.style.setProperty("--fly-oy",oy+"px");r.style.setProperty("--fly-x",(g+mh*181.82/158/2-(w/2-W/2+ox))+"px");r.style.setProperty("--fly-y",(pt+mh/2-h/2)+"px");r.style.setProperty("--fly-s",String(mh*701.31/(158*W)));r.dataset.fly="1";setTimeout(function(){delete r.dataset.fly},3300);`;
const SPLASH_ONCE = `try{var k="rovba:splash";if(sessionStorage.getItem(k)){document.documentElement.dataset.splash="skip"}else{sessionStorage.setItem(k,"1");document.documentElement.dataset.splash="play";${FLY}}}catch(e){document.documentElement.dataset.splash="play"}`;

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
