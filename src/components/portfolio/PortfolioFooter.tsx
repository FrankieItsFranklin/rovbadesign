import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function PortfolioFooter({ count, lang }: { count: number; lang: Lang }) {
  const d = dictionaries[lang].home;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-[var(--gutter)] pb-5 md:pb-6">
      {/* No entrance fade on the statement: it is the page's largest text, sits under the splash anyway,
          and fading it in would hold back Largest Contentful Paint until the splash ends. */}
      <p className="mb-5 max-w-[22ch] font-serif text-[22px] leading-[1.15] tracking-[-0.01em] md:mb-7 md:text-[28px]">
        {d.statement}
      </p>
      <div className="intro-fade label grid grid-cols-2 items-end gap-4 md:grid-cols-3">
        <p>
          {d.selected}
          <br />
          <span className="text-muted">{d.count(count)}</span>
        </p>
        <p className="hidden text-center md:block" aria-hidden="true">
          {d.drag}&nbsp;&nbsp;↔
        </p>
        <p className="text-right md:hidden" aria-hidden="true">
          {d.swipe}&nbsp;&nbsp;↔
        </p>
        <p className="hidden text-right md:block">
          {d.studio}
          <br />
          <span className="text-muted">{d.city}</span>
        </p>
      </div>
    </div>
  );
}
