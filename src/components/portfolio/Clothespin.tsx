/** A small wooden peg seen from the front: two jaws, a seam and the steel spring. */
export function Clothespin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 46" aria-hidden="true" focusable="false">
      <path d="M2.2 1.5C2.2.8 2.8.3 3.5.3H7v45.2H4.1c-.8 0-1.4-.5-1.5-1.3L2.2 30Z" fill="var(--wood-light)" />
      <path d="M11.8 1.5c0-.7-.6-1.2-1.3-1.2H7v45.2h2.9c.8 0 1.4-.5 1.5-1.3l.4-14.2Z" fill="var(--wood-dark)" />
      <path d="M7 .3v45.2" stroke="var(--wood-seam)" strokeWidth=".5" />
      <path d="M3.4 6.5h2.3M8.6 9h2M3.6 34h2M8.4 38.5h2.2" stroke="var(--wood-seam)" strokeWidth=".35" strokeLinecap="round" opacity=".55" />
      <rect x=".6" y="15.2" width="12.8" height="4.6" rx="1.2" fill="var(--steel)" />
      <path d="M1.6 16.6h10.8" stroke="var(--steel-light)" strokeWidth=".7" strokeLinecap="round" />
      <path d="M1.6 18.6h10.8" stroke="var(--steel-dark)" strokeWidth=".45" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}
