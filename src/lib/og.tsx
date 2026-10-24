import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { MARK_PIECES } from "@/components/brand-logo";

export const OG_SIZE = { width: 1200, height: 630 };

const dataUrl = async (publicPath: string) => `data:image/jpeg;base64,${(await fs.readFile(path.join(process.cwd(), "public", publicPath))).toString("base64")}`;

/** Paper card with the ROVBA mark, a title block and an optional print on the right. */
export async function ogImage({ title, kicker, line, image, position = "50% 0%" }: { title: string; kicker: string; line: string; image?: string; position?: string }) {
  const src = image ? await dataUrl(image) : null;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3f1ec", color: "#171614", padding: 56, gap: 56 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <svg width="62" height="54" viewBox="-2 -2 181.82 158">
            {MARK_PIECES.map((d) => (
              <path key={d} d={d} fill="#171614" />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 1, textTransform: "uppercase", color: "#66625b" }}>{kicker}</div>
            <div style={{ fontSize: title.length > 18 ? 72 : 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
            <div style={{ fontSize: 28, color: "#3b3833", lineHeight: 1.3, maxWidth: 560 }}>{line}</div>
          </div>
          <div style={{ fontSize: 22, letterSpacing: 1, textTransform: "uppercase" }}>ROVBA Design · rovbadesign.pl</div>
        </div>
        {src && (
          <div style={{ width: 420, height: "100%", display: "flex", padding: 14, background: "#fff", boxShadow: "0 18px 40px rgba(40,30,20,0.18)", transform: "rotate(2deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} width={392} height={490} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position }} alt="" />
          </div>
        )}
      </div>
    ),
    OG_SIZE,
  );
}
