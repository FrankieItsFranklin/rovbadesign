import type { NextConfig } from "next";
import { SEGMENTS } from "./src/i18n/routes";

const inner = Object.entries(SEGMENTS) as [string, { en: string; pl: string }][];

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: { globalNotFound: true },
  // English lives at the root, Polish under /pl; internally both are the [lang] segment.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      // Renamed demo projects keep their old case-study addresses working.
      ...[["luka", "rubryka"], ["adp-clinic", "kotwica"], ["milanovo", "ventotto"]].flatMap(([from, to]) => [
        { source: `/work/${from}`, destination: `/work/${to}`, permanent: true },
        { source: `/pl/work/${from}`, destination: `/pl/work/${to}`, permanent: true },
      ]),
      // Generated Open Graph images keep their internal /en/… address.
      { source: "/en/:path((?!.*opengraph-image).*)", destination: "/:path", permanent: true },
      // Internal Polish paths that have a Polish public name.
      ...inner
        .filter(([key, s]) => s.pl !== key)
        .flatMap(([key, s]) => [
          { source: `/pl/${key}`, destination: `/pl/${s.pl}`, permanent: true },
          { source: `/pl/${key}/:slug`, destination: `/pl/${s.pl}/:slug`, permanent: true },
        ]),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        { source: "/work/:slug", destination: "/en/work/:slug" },
        ...inner.flatMap(([key, s]) => [
          { source: `/${s.en}`, destination: `/en/${key}` },
          { source: `/${s.en}/:slug`, destination: `/en/${key}/:slug` },
          { source: `/pl/${s.pl}`, destination: `/pl/${key}` },
          { source: `/pl/${s.pl}/:slug`, destination: `/pl/${key}/:slug` },
        ]),
      ],
      // Static demos are built one folder per page: /demo/tilia/kontakt → …/kontakt/index.html.
      afterFiles: [
        { source: "/demo/:site", destination: "/demo/:site/index.html" },
        { source: "/demo/:site/:path*", destination: "/demo/:site/:path*/index.html" },
      ],
    };
  },
  async headers() {
    return [{ source: "/demo/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
};

export default nextConfig;
