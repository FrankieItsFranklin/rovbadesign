import type { Ref } from "react";

/** The rope's shape is written by the line engine every frame; these paths are only the strokes. */
export function Rope({ fiberRef, cordRef }: { fiberRef: Ref<SVGPathElement>; cordRef: Ref<SVGPathElement> }) {
  return (
    <svg className="rope" aria-hidden="true" focusable="false">
      <path ref={cordRef} className="rope-cord" pathLength={1} />
      <path ref={fiberRef} className="rope-fiber" />
    </svg>
  );
}
