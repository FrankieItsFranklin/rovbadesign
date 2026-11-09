import type { NextConfig } from "next";
import { SEGMENTS } from "./src/i18n/routes";

const inner = Object.entries(SEGMENTS) as [string, { en: string; pl: string }][];

const dev = process.env.NODE_ENV !== "production";

// The studio site loads everything from its own origin (Vercel Analytics too: /_vercel/insights).
// 'unsafe-inline' for scripts: Next's inline bootstrap, the splash script and JSON-LD; nonces would force every
// page to render on request instead of being static. Dev additionally needs eval and the HMR websocket.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${dev ? " ws:" : ""}`,
  "media-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

// Everywhere, demos included. HSTS is already sent by Vercel.
const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: { globalNotFound: true },
  // Polish lives at the root, English under /en; internally both are the [lang] segment.
  // Until 2026-11 it was the other way round, so the old public addresses redirect to the new ones.
  async redirects() {
    return [
      // Old Polish addresses: internal key names first (/pl/about → /o-studiu), then everything else drops /pl.
      ...inner.flatMap(([key, s]) => [
        { source: `/pl/${key}`, destination: `/${s.pl}`, permanent: true },
        { source: `/pl/${key}/:slug`, destination: `/${s.pl}/:slug`, permanent: true },
      ]),
      { source: "/pl", destination: "/", permanent: true },
      // Generated Open Graph images keep their internal /pl/… address.
      { source: "/pl/:path((?!.*opengraph-image).*)", destination: "/:path", permanent: true },
      // Old English inner pages at the root now live under /en (their Polish names differ, so nothing collides).
      ...inner.flatMap(([, s]) => [
        { source: `/${s.en}`, destination: `/en/${s.en}`, permanent: true },
        { source: `/${s.en}/:slug`, destination: `/en/${s.en}/:slug`, permanent: true },
      ]),
      // UX/UI was folded into website design (2026-11-09).
      { source: "/uslugi/ux-ui", destination: "/uslugi/projektowanie-stron", permanent: true },
      { source: "/en/services/ux-ui", destination: "/en/services/web-design", permanent: true },
      // Renamed demo projects keep their old case-study addresses working.
      ...[["luka", "rubryka"], ["adp-clinic", "kotwica"], ["milanovo", "ventotto"], ["finir", "szkliwo"], ["lident", "fiszka"], ["piernicova", "korzenna"], ["sobaniec", "przystan"], ["bochen", "kruszon"]].flatMap(([from, to]) => [
        { source: `/work/${from}`, destination: `/work/${to}`, permanent: true },
        { source: `/en/work/${from}`, destination: `/en/work/${to}`, permanent: true },
      ]),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/pl" },
        { source: "/work", destination: "/pl/work" },
        { source: "/work/:slug", destination: "/pl/work/:slug" },
        ...inner.flatMap(([key, s]) => [
          { source: `/${s.pl}`, destination: `/pl/${key}` },
          { source: `/${s.pl}/:slug`, destination: `/pl/${key}/:slug` },
        ]),
        // English public names equal the internal keys, so /en/<key> needs no rewrite.
      ],
      // Static demos are built one folder per page: /demo/tilia/kontakt → …/kontakt/index.html.
      afterFiles: [
        { source: "/demo/:site", destination: "/demo/:site/index.html" },
        { source: "/demo/:site/:path*", destination: "/demo/:site/:path*/index.html" },
      ],
    };
  },
  async headers() {
    return [
      { source: "/:path*", headers: baseHeaders },
      // Demos are other sites' static exports (Google Fonts, Unsplash, OpenStreetMap maps), so no CSP there.
      { source: "/((?!demo/|demo$).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
      { source: "/demo/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
};

export default nextConfig;
