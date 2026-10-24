"use client";

import { useMemo, useState } from "react";
import { niches, NICHES } from "@/data/niches";
import type { Niche, Project } from "@/data/projects";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { ProjectLine } from "./ProjectLine";

/** The line with a row of trade filters; the line re-hangs only the prints of the chosen trade. */
export function FilteredLine({ projects, lang }: { projects: Project[]; lang: Lang }) {
  const d = dictionaries[lang].filter;
  const [niche, setNiche] = useState<Niche | null>(null);
  const shown = useMemo(() => (niche ? projects.filter((p) => p.niche === niche) : projects), [niche, projects]);
  const options: (Niche | null)[] = [null, ...NICHES.filter((n) => projects.some((p) => p.niche === n))];

  return (
    <>
      <ProjectLine projects={shown} lang={lang} />
      <div
        role="group"
        aria-label={d.label}
        className="intro-fade no-scrollbar absolute inset-x-0 top-[60px] z-10 flex gap-2 overflow-x-auto px-[var(--gutter)] md:inset-x-auto md:right-[var(--gutter)] md:top-auto md:bottom-[92px] md:px-0"
      >
        {options.map((n) => {
          const active = n === niche;
          const count = n ? projects.filter((p) => p.niche === n).length : projects.length;
          return (
            <button
              key={n ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setNiche(n)}
              className={`label shrink-0 rounded-full border px-3.5 py-2 transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] ${
                active ? "border-ink bg-ink text-paper" : "border-ink/25 bg-paper/80 text-ink hover:border-ink"
              }`}
            >
              {n ? niches[n][lang].label : d.all} <span className={active ? "text-paper/60" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
