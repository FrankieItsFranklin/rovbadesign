import type { ReactNode } from "react";

/** A gap in a draft page: what goes here, marked so nobody mistakes it for finished copy. */
export function Todo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="todo">
      <span className="todo-tag">{label}</span>
      {children}
    </p>
  );
}

/** The note at the top of a draft page. */
export function DraftNote({ children }: { children: ReactNode }) {
  return <p className="draft-note">{children}</p>;
}
