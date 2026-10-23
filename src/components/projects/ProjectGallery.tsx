import Image from "next/image";
import type { Project } from "@/data/projects";
import type { Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function DesktopGallery({ project, lang }: { project: Project; lang: Lang }) {
  const d = dictionaries[lang].work;
  const [, second, third] = project.desktopImages;
  return (
    <section aria-label={d.desktopLabel} className="grid gap-[var(--gutter)] px-[var(--gutter)] md:grid-cols-12">
      <div className="shot relative aspect-[16/10] md:col-span-12">
        <Image src={second} alt={d.desktopAlt[0](project.title)} fill sizes="100vw" quality={80} className="object-cover object-top" />
      </div>
      <div className="shot relative aspect-[16/10] md:col-span-9 md:col-start-4">
        <Image src={third} alt={d.desktopAlt[1](project.title)} fill sizes="(max-width: 768px) 100vw, 75vw" quality={80} className="object-cover object-top" />
      </div>
    </section>
  );
}

export function MobileGallery({ project, lang }: { project: Project; lang: Lang }) {
  const d = dictionaries[lang].work;
  return (
    <section
      aria-labelledby="mobile-title"
      className="px-[var(--gutter)] py-20 md:py-28"
      style={{ background: project.accent, color: project.accentInk }}
    >
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <h2 id="mobile-title" className="label md:col-span-3">
          {d.phoneTitle}
        </h2>
        <p className="max-w-[40ch] text-[17px] md:col-span-6">
          {d.phoneText}
        </p>
      </div>
      <ul className="-mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:px-[8%]">
        {project.mobileImages.map((src, i) => (
          <li key={src} className="w-[68vw] flex-none snap-center md:w-auto">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[22px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]">
              <Image src={src} alt={d.phoneAlt(project.title, i + 1)} fill sizes="(max-width: 768px) 68vw, 28vw" quality={80} className="object-cover object-top" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
