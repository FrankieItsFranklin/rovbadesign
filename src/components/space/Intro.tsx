import type { CSSProperties } from "react";
import { LogoMark } from "@/components/LogoMark";

const NAME = "ROVBA DESIGN";

/**
 * The entrance (DESIGN.md §6), on the first page of a session only (EnterScript marks later ones as seen). In the
 * middle of the screen the sign turns a third, as it does on hover in the header, while the name rises beside it; the pair then flies
 * to the header's tab, which it copies exactly, and lands on it; the strand grows down the page from there
 * (StrandCanvas). Pure CSS: without script it still plays and gets out of the way, and it never takes input.
 */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="hd-tab intro-tab">
        <LogoMark className="h-[28px] w-auto lg:h-[30px]" />
        <span className="hd-word intro-word">
          {[...NAME].map((ch, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
