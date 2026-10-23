"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { Project } from "@/data/projects";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { startHandoff } from "@/lib/handoff";
import { LineEngine } from "@/lib/lineEngine";
import { cardSize, measureLine, type LineGeometry } from "@/lib/rope";
import { ProjectCard } from "./ProjectCard";
import { Rope } from "./Rope";

// The entrance plays once per visit, not on every return from a case study.
let introPlayed = false;
const INTRO_MS = 1500;
const ROLL_IN_MS = 1700;

/** The opening splash's length, read from the CSS that runs it (0 when skipped or with reduced motion). */
const splashDelay = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--splash")) || 0;

function buildLayout(g: LineGeometry, projects: Project[]) {
  const sizes = projects.map((p) => cardSize(g, p.cardScale, p.cardAspectRatio));
  const loop = sizes.reduce((sum, s) => sum + s.w + g.gap, 0);
  const widest = Math.max(...sizes.map((s) => s.w));
  // Enough copies of the set that the viewport is never left with a hole while wrapping.
  const copies = Math.max(1, Math.ceil((g.width + 2 * (widest + g.gap)) / loop));
  const start = g.compact ? g.width * 0.2 : g.width * 0.07;
  const entries = [];
  for (let c = 0; c < copies; c++) {
    let cursor = c * loop + start;
    for (let i = 0; i < projects.length; i++) {
      entries.push({ key: `${c}-${projects[i].id}`, project: projects[i], size: sizes[i], copy: c > 0, base: cursor });
      cursor += sizes[i].w + g.gap;
    }
  }
  return { loopLength: loop * copies, entries };
}

export function ProjectLine({ projects, lang }: { projects: Project[]; lang: Lang }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const fiberRef = useRef<SVGPathElement>(null);
  const cardEls = useRef<(HTMLAnchorElement | null)[]>([]);
  const engineRef = useRef<LineEngine | null>(null);
  const [geometry, setGeometry] = useState<LineGeometry | null>(null);

  const layout = useMemo(() => (geometry ? buildLayout(geometry, projects) : null), [geometry, projects]);

  useEffect(() => {
    const stage = stageRef.current!;
    const engine = new LineEngine(stage, [cordRef.current!, fiberRef.current!], window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    engineRef.current = engine;
    const measure = () => setGeometry(measureLine(stage.clientWidth, stage.clientHeight));
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    measure();
    return () => {
      ro.disconnect();
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => engineRef.current?.setReduced(reduced), [reduced]);

  useLayoutEffect(() => {
    const engine = engineRef.current;
    const stage = stageRef.current;
    if (!engine || !stage || !geometry || !layout) return;
    engine.setLayout(
      geometry,
      layout.entries.map((e, i) => ({
        el: cardEls.current[i]!,
        base: e.base,
        w: e.size.w,
        rotation: e.project.cardRotation,
        drop: e.project.cardDrop,
      })),
      layout.loopLength,
    );
    if (stage.classList.contains("is-ready")) return;
    const id = requestAnimationFrame(() => {
      if (!introPlayed) {
        const delay = splashDelay();
        engine.visibleOrder().forEach((el, i) => el.style.setProperty("--i", String(i)));
        stage.classList.add("is-intro");
        window.setTimeout(() => stage.classList.remove("is-intro"), delay + INTRO_MS);
        if (geometry.compact) engine.rollIn(geometry.width * 0.9, delay + 250, ROLL_IN_MS);
        introPlayed = true;
      }
      stage.classList.add("is-ready");
      document.documentElement.dataset.intro = "done";
    });
    return () => cancelAnimationFrame(id);
  }, [geometry, layout]);

  const open = (e: MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const card = e.currentTarget;
    const print = card.querySelector<HTMLElement>(".card-print");
    if (print && !reduced) startHandoff(project.slug, print, engineRef.current?.angleOf(card) ?? 0, project.desktopImages[0]);
    router.push(localePath(lang, `/work/${project.slug}`));
  };

  const entries = layout?.entries ?? projects.map((p) => ({ key: `0-${p.id}`, project: p, size: null, copy: false }));

  return (
    <div ref={stageRef} className={`line${layout ? " is-live" : ""}`} aria-label={dictionaries[lang].home.lineLabel}>
      <Rope cordRef={cordRef} fiberRef={fiberRef} />
      <ul className="line-track">
        {entries.map((e, i) => (
          <li key={e.key} className="line-slot" aria-hidden={e.copy || undefined}>
            <ProjectCard
              project={e.project}
              size={e.size}
              lang={lang}
              copy={e.copy}
              first={!e.copy && (i < 4 || i === projects.length - 1)}
              cardRef={(el) => {
                cardEls.current[i] = el;
              }}
              onOpen={open}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
