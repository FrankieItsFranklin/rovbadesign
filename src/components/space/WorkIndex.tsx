"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Niche, Project } from "@/data/projects";
import { niches, NICHES } from "@/data/niches";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pageY, selectOnStrand } from "./strand";

type View = "a" | "b";

/**
 * The work page (DESIGN.md §5, stage 2): every project in one of two views, with a niche filter.
 * Register: a database index, one row per project wired to the strand, the hovered row's cover in a panel beside it.
 * Board: covers in a two-column grid.
 * Pointing at a project sends the strand's red marker to its level.
 */
export function WorkIndex({ projects, lang }: { projects: Project[]; lang: Lang }) {
  const d = dictionaries[lang];
  const p = d.projectsPage;
  const [view, setView] = useState<View>("a");
  const [niche, setNiche] = useState<Niche | null>(null);
  // The row under the pointer; until there is one, no row is marked and the panel shows the first project.
  const [hover, setHover] = useState<number | null>(null);
  const shown = niche ? projects.filter((x) => x.niche === niche) : projects;
  const current = hover === null ? null : shown[hover];
  const preview = current ?? shown[0];

  // The view (?v=b) and the niche (?n=dental) live in the address, so a filtered list can be shared and survives Back.
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const n = q.get("n") as Niche | null;
    /* eslint-disable react-hooks/set-state-in-effect -- read once from the address after hydration */
    if (q.get("v") === "b") setView("b");
    if (n && NICHES.includes(n)) setNiche(n);
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => selectOnStrand(null);
  }, []);
  const remember = (key: string, value: string | null) => {
    const url = new URL(location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    history.replaceState(null, "", url);
  };
  const pick = (v: View) => {
    setView(v);
    remember("v", v === "b" ? "b" : null);
  };
  const filter = (n: Niche | null) => {
    setNiche(n);
    setHover(null);
    selectOnStrand(null);
    remember("n", n);
  };

  const point = (i: number, el: HTMLElement) => {
    setHover(i);
    selectOnStrand(pageY(el));
  };
  const href = (x: Project) => localePath(lang, `/work/${x.slug}`);
  const meta = (x: Project) => [x.category, x.city, x.year].join(" · ");

  return (
    <>
      <div className="work-bar">
        <ul className="work-filter" aria-label={d.nav.work}>
          {[null, ...NICHES].map((n) => (
            <li key={n ?? "all"}>
              <button type="button" className="chip" aria-pressed={niche === n} onClick={() => filter(n)}>
                {n ? niches[n][lang].label : p.all}
                <span className="chip-count">{n ? projects.filter((x) => x.niche === n).length : projects.length}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="work-views" role="group">
          {(["a", "b"] as View[]).map((v) => (
            <button key={v} type="button" className="chip" aria-pressed={view === v} onClick={() => pick(v)}>
              {p.views[v]}
            </button>
          ))}
        </div>
      </div>

      {view === "a" ? (
        <div
          className="register"
          onMouseLeave={() => {
            setHover(null);
            selectOnStrand(null);
          }}
        >
          <ol className="register-list">
            {shown.map((x, i) => (
              <li key={x.slug}>
                <Link
                  href={href(x)}
                  className="register-row strand-wire"
                  data-strand-wire
                  data-on={current === x || undefined}
                  onMouseEnter={(e) => point(i, e.currentTarget)}
                  onFocus={(e) => point(i, e.currentTarget)}
                >
                  <span className="register-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="register-thumb" aria-hidden="true">
                    <Image src={x.desktopImages[0]} alt="" fill sizes="72px" style={{ objectPosition: "50% 0%" }} />
                  </span>
                  <span className="register-title">{x.title}</span>
                  <span className="register-meta">{meta(x)}</span>
                  <span className="register-status">{d.work.statuses[x.status]}</span>
                </Link>
              </li>
            ))}
          </ol>
          {preview && (
            <aside className="register-preview" aria-hidden="true">
              <div className="register-shot" key={preview.slug}>
                <Image src={preview.desktopImages[0]} alt="" fill sizes="(min-width: 1024px) 34vw, 0px" />
                <i className="corner corner-tl" />
                <i className="corner corner-br" />
              </div>
              <p className="tech mt-4">
                {preview.category} / {preview.city}
              </p>
              <p className="register-desc">{preview.description}</p>
            </aside>
          )}
        </div>
      ) : (
        <ol className="board">
          {shown.map((x, i) => (
            <li key={x.slug}>
              <Link href={href(x)} className="board-card" onMouseEnter={(e) => point(i, e.currentTarget)} onFocus={(e) => point(i, e.currentTarget)} onMouseLeave={() => selectOnStrand(null)}>
                <span className="board-shot">
                  <Image src={x.desktopImages[0]} alt={d.card.alt(x.title)} fill sizes="(min-width: 768px) 40vw, 90vw" />
                  <i className="corner corner-tl" />
                  <i className="corner corner-br" />
                </span>
                <span className="board-info">
                  <span className="tech">{String(i + 1).padStart(2, "0")}</span>
                  <span className="board-title">{x.title}</span>
                  <span className="board-meta">{meta(x)}</span>
                  <span className="board-open">
                    {p.open} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
