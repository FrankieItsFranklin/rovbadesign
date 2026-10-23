import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, MouseEvent, Ref } from "react";
import type { Project } from "@/data/projects";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { Clothespin } from "./Clothespin";

type Props = {
  project: Project;
  size: { w: number; h: number } | null;
  lang: Lang;
  copy: boolean;
  eager: boolean;
  cardRef?: Ref<HTMLAnchorElement>;
  onOpen: (e: MouseEvent<HTMLAnchorElement>, project: Project) => void;
};

export function ProjectCard({ project, size, lang, copy, eager, cardRef, onOpen }: Props) {
  const style = size ? ({ width: size.w, "--print-h": `${size.h}px` } as CSSProperties) : undefined;
  return (
    <Link
      ref={cardRef}
      href={localePath(lang, `/work/${project.slug}`)}
      className="card"
      data-line-item=""
      data-aspect={project.cardAspectRatio}
      style={style}
      draggable={false}
      onClick={(e) => onOpen(e, project)}
      aria-label={`${project.title}, ${project.category}, ${project.city}`}
      aria-hidden={copy || undefined}
      tabIndex={copy ? -1 : undefined}
      inert={copy}
    >
      <span className="card-drop">
        <span className="card-lift">
          <Clothespin className="card-pin" />
          <span className="card-print">
            <Image
              src={project.cover}
              alt={dictionaries[lang].card.alt(project.title)}
              fill
              sizes="(max-width: 640px) 56vw, (max-width: 1024px) 30vw, 340px"
              quality={80}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : undefined}
              draggable={false}
              style={{ objectPosition: project.coverPosition }}
            />
            <span className="card-shade" />
            <span className="card-caption">
              <span className="card-title">{project.title}</span>
              <span className="card-meta">
                {project.category} — {project.city}
              </span>
            </span>
          </span>
          <span className="card-label" aria-hidden="true">
            <span className="card-title">{project.title}</span>
            <span className="card-meta">{project.category}</span>
          </span>
        </span>
      </span>
    </Link>
  );
}
