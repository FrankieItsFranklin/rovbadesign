import { projects } from "@/data/projects";
import { LANGS, type Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ROVBA Design";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const d = dictionaries[lang];
  const p = projects.find((x) => x.id === "halong")!;
  return ogImage({ title: "ROVBA Design", kicker: d.place, line: d.home.statement, image: p.cover, position: p.coverPosition });
}
