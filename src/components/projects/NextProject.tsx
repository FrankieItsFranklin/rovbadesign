"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { startHandoff } from "@/lib/handoff";

export function NextProject({ project, lang }: { project: Project; lang: Lang }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const printRef = useRef<HTMLDivElement>(null);
  const href = localePath(lang, `/work/${project.slug}`);

  const open = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (printRef.current && !reduced) startHandoff(project.slug, printRef.current, -1.5, project.desktopImages[0]);
    router.push(href);
  };

  return (
    <Link href={href} onClick={open} className="group grid items-end gap-8 px-[var(--gutter)] py-24 md:grid-cols-12 md:gap-8 md:py-36">
      <div className="md:col-span-7">
        <p className="label text-muted">{dictionaries[lang].work.next}&nbsp;&nbsp;→</p>
        <p className="mt-4 text-[clamp(48px,8vw,128px)] leading-[0.92] font-light uppercase">{project.title}</p>
        <p className="mt-4 text-[15px] text-muted">
          {project.category}
          <br />
          {project.city}
        </p>
      </div>
      <div className="md:col-span-5 md:col-start-8">
        <div
          ref={printRef}
          className="relative aspect-[16/10] overflow-hidden shadow-[0_30px_60px_-36px_rgba(36,35,38,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
        >
          <Image src={project.desktopImages[0]} alt="" fill sizes="(max-width: 768px) 90vw, 40vw" quality={80} className="object-cover object-top" />
        </div>
      </div>
    </Link>
  );
}
