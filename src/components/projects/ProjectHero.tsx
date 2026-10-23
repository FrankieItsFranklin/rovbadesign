"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { completeHandoff, hasPendingHandoff } from "@/lib/handoff";

export function ProjectHero({ project, lang }: { project: Project; lang: Lang }) {
  const d = dictionaries[lang].work;
  const frameRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(() => typeof window === "undefined" || !hasPendingHandoff(project.slug));

  useLayoutEffect(() => {
    if (!completeHandoff(project.slug, frameRef.current!, () => setRevealed(true))) setRevealed(true);
  }, [project.slug]);

  const facts = [
    { label: d.category, value: project.category },
    { label: d.location, value: `${project.city}, ${d.country}` },
    { label: d.year, value: String(project.year) },
    { label: d.status, value: d.statuses[project.status] },
  ];

  return (
    <section className="px-[var(--gutter)] pt-28 md:pt-36">
      <div className="grid items-end gap-8 md:grid-cols-12 md:gap-8">
        <h1
          className="case-reveal text-[clamp(56px,10.5vw,168px)] leading-[0.86] font-bold tracking-[-0.045em] md:col-span-8"
          style={{ ["--d" as string]: 0 }}
        >
          {project.title}
        </h1>
        <dl className="case-reveal grid grid-cols-2 gap-x-6 gap-y-4 md:col-span-4 md:pb-3" style={{ ["--d" as string]: 1 }}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="label text-muted">{f.label}</dt>
              <dd className="mt-1 text-[15px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div
        ref={frameRef}
        className="shot relative mt-10 aspect-[16/10] md:mt-14"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <Image
          src={project.desktopImages[0]}
          alt={d.heroAlt(project.title)}
          fill
          priority
          sizes="(max-width: 1600px) 100vw, 1600px"
          quality={80}
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
