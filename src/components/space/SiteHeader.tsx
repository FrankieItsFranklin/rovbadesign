"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LangSwitch } from "@/components/LangSwitch";
import { LogoMark } from "@/components/LogoMark";
import { studio, telHref } from "@/data/studio";
import { type Lang, localePath } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pagePath } from "@/i18n/routes";

// Home sections the navigation follows; the one crossing the middle of the screen is marked active.
const SECTIONS = ["process"] as const;

/**
 * Fixed header (DESIGN.md §5): a dark tab with the sign and the name at the left edge, which shrinks to the sign
 * once the page scrolls; links, language and the call to action on the right; a full-screen menu below 1024px.
 */
export function SiteHeader({ lang, alternate }: { lang: Lang; alternate: string }) {
  const d = dictionaries[lang].space.nav;
  const home = localePath(lang, "/");
  const items = [
    { href: localePath(lang, "/work"), label: d.projects, page: true },
    { href: pagePath(lang, "services"), label: d.services, page: true },
    { href: `${home}#process`, label: d.process, section: "process" },
    { href: pagePath(lang, "about"), label: d.about, page: true },
    { href: pagePath(lang, "journal"), label: d.blog, page: true },
  ];
  // A page link is current on its page and below it (a case study belongs to Projects).
  const path = usePathname();
  const current = (item: (typeof items)[number]) =>
    "page" in item && item.page ? (path === item.href || path.startsWith(`${item.href}/`) ? "page" : undefined) : item.section === active ? "location" : undefined;
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        setActive(SECTIONS.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);

  // While the menu is open: the page does not scroll, Escape closes it, Tab stays inside it.
  useEffect(() => {
    if (!open) return;
    const root = panel.current!;
    const opener = button.current;
    root.querySelector<HTMLElement>("a")?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const focusable = [...root.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  // The sign always leads to the first screen: on the home page it scrolls back up to it instead of reloading.
  const toHero = (e: React.MouseEvent) => {
    setOpen(false);
    if (path !== home || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
    history.replaceState(null, "", home);
    document.getElementById("hero-title")?.focus({ preventScroll: true });
  };

  return (
    <header className="hd" data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <Link href={home} aria-label="ROVBA Design" className="logo-link hd-tab" onClick={toHero}>
        <LogoMark className="h-[28px] w-auto lg:h-[30px]" />
        <span className="hd-word" aria-hidden="true">
          ROVBA DESIGN
        </span>
      </Link>
      <div className="hd-right">
        <nav aria-label={d.label} className="hd-nav">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link" aria-current={current(item)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LangSwitch lang={lang} alternate={alternate} className="hd-lang" />
        <a href={telHref(studio.phone)} className="hd-call" aria-label={`${d.call}: ${studio.phone}`}>
          <PhoneIcon />
          <span className="hd-call-num">{studio.phone}</span>
        </a>
        <a href={`${home}#contact`} className="btn btn-primary hd-cta">
          {d.cta}
        </a>
        <button ref={button} type="button" className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((v) => !v)}>
          <span>{open ? d.close : d.menu}</span>
          <i aria-hidden="true" />
        </button>
      </div>
      {open && (
        <div ref={panel} id="site-menu" className="site-menu" role="dialog" aria-modal="true" aria-label={d.menu}>
          <ul>
            {items.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} aria-current={current(item)} onClick={() => setOpen(false)}>
                  <span className="tech">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="site-menu-foot">
            <LangSwitch lang={lang} alternate={alternate} />
            <a href={`${home}#contact`} className="btn btn-primary" onClick={() => setOpen(false)}>
              {d.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/** A handset, drawn in the strokes of the sign. */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.6 2.5H4.2a1.7 1.7 0 0 0-1.7 1.9 14.5 14.5 0 0 0 13.1 13.1 1.7 1.7 0 0 0 1.9-1.7v-2.4l-3.6-1.5-1.8 1.8a10 10 0 0 1-4.3-4.3l1.8-1.8z" />
    </svg>
  );
}
