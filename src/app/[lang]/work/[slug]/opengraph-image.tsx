import { localizedProject } from "@/data/localize";
import { projects } from "@/data/projects";
import { LANGS, type Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ROVBA Design case study";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = localizedProject(slug, lang as Lang)!;
  const d = dictionaries[lang as Lang].work;
  return ogImage({ title: p.title, kicker: `${p.category} · ${p.city} · ${d.statuses[p.status]}`, line: p.challenge, image: p.cover, position: p.coverPosition });
}
