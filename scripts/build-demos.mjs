// Builds public copies of fictional projects into public/demo/<id>/ (served at /demo/<id>/).
// Only fictional work goes here.
// Usage: npm run demos [id ...]
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/demo");
const NODE_BIN = path.join(process.env.HOME, ".local/node/bin");
const env = { ...process.env, PATH: `${NODE_BIN}:${process.env.PATH}` };

const DEMOS = [
  { id: "tilia", kind: "astro", dir: path.join(process.env.HOME, "Desktop/сайты/tilia") },
  { id: "szkliwo", kind: "astro", dir: path.join(process.env.HOME, "Desktop/сайты/finir") },
  { id: "fiszka", kind: "copy", dir: path.join(process.env.HOME, "Desktop/сайты/lident-prototype") },
  { id: "korzenna", kind: "next", dir: path.join(process.env.HOME, "Desktop/1/restaurant-template") },
  { id: "rubryka", kind: "next", dir: path.join(process.env.HOME, "Desktop/1/finance-template") },
  { id: "kotwica", kind: "next", dir: path.join(process.env.HOME, "Desktop/1/dental-template") },
  { id: "przystan", kind: "next", dir: path.join(process.env.HOME, "Desktop/1/dental-smile-template") },
  { id: "concepts", kind: "static", dir: path.resolve("design/concepts") },
];

const only = process.argv.slice(2);

// Root-absolute links of an Astro site, prefixed with the demo's folder.
/** Rewrites relative src/href/srcset in the copied pages to absolute paths under the demo's folder. */
function absolutize(dir, base) {
  const rel = /^(?![a-z][a-z0-9+.-]*:|\/|#|\?)/i;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".html")) continue;
    const file = path.join(dir, f);
    const html = fs.readFileSync(file, "utf8")
      .replace(/\b(src|href)="([^"]*)"/g, (m, attr, url) => (url && rel.test(url) ? `${attr}="${base}/${url.replace(/^\.\//, "")}"` : m))
      .replace(/\bsrcset="([^"]*)"/g, (m, set) => `srcset="${set.split(",").map((part) => { const t = part.trim(); return rel.test(t) ? `${base}/${t}` : t; }).join(", ")}"`);
    fs.writeFileSync(file, html);
  }
}

function prefixRootLinks(dir, base) {
  const rx = /(?<=[\s"'`(=,])\/(?=[_a-z0-9-]*[/?#."'`)\s,]|["'`)\s,])/g;
  for (const file of walk(dir)) {
    if (!/\.(html|js|css|xml|webmanifest)$/.test(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    // Keep protocol-relative URLs and absolute URLs untouched: the lookbehind never matches "//" or "://".
    const out = src.replace(rx, (m, offset) => (src[offset + 1] === "/" ? m : `${base}/`));
    if (out !== src) fs.writeFileSync(file, out);
  }
}

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

// Next.js template → static export under /demo/<id>. Built in a copy (<template>/.demo-build), so a running `next dev`
// in the template keeps its own .next. Sitemap and robots are left out (demos are noindex anyway).
function buildNext(demo, target) {
  // Inside the template, so Turbopack's root (DEMO_ROOT) still contains the real node_modules.
  const tmp = path.join(demo.dir, ".demo-build");
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp);
  const skip = new Set(["node_modules", ".next", "out", ".git", ".demo-build"]);
  for (const e of fs.readdirSync(demo.dir)) if (!skip.has(e)) fs.cpSync(path.join(demo.dir, e), path.join(tmp, e), { recursive: true });
  fs.symlinkSync(path.join(demo.dir, "node_modules"), path.join(tmp, "node_modules"));
  for (const f of ["src/app/robots.ts", "src/app/sitemap.ts"]) fs.rmSync(path.join(tmp, f), { force: true });
  const base = `/demo/${demo.id}`;
  execSync("npx next build", { cwd: tmp, env: { ...env, DEMO_BUILD: base, DEMO_ROOT: demo.dir, NEXT_TELEMETRY_DISABLED: "1" }, stdio: "inherit" });
  fs.cpSync(path.join(tmp, "out"), target, { recursive: true });
  fs.rmSync(tmp, { recursive: true, force: true });
  // Plain string paths to files in public/ (next/image with unoptimized, CSS urls) do not get basePath.
  const pub = fs.existsSync(path.join(demo.dir, "public")) ? fs.readdirSync(path.join(demo.dir, "public")) : [];
  if (!pub.length) return;
  const names = pub.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const rx = new RegExp(`(?<=["'\`(\\s,=])/(?=(?:${names})(?:[/"'\`?)\\s]|$))`, "g");
  for (const file of walk(target)) {
    if (!/\.(html|js|css|txt|json)$/.test(file)) continue;
    const src = fs.readFileSync(file, "utf8"), out = src.replace(rx, `${base}/`);
    if (out !== src) fs.writeFileSync(file, out);
  }
}

for (const demo of DEMOS) {
  if (only.length && !only.includes(demo.id)) continue;
  const target = path.join(OUT, demo.id);
  fs.rmSync(target, { recursive: true, force: true });
  if (demo.kind === "astro") {
    execSync("npx astro build", { cwd: demo.dir, env: { ...env, DEMO_BUILD: "1", SITE_URL: "https://www.rovbadesign.pl" }, stdio: "inherit" });
    fs.cpSync(path.join(demo.dir, "dist"), target, { recursive: true });
    for (const f of fs.readdirSync(target)) if (/^sitemap.*\.xml$|^robots\.txt$/.test(f)) fs.rmSync(path.join(target, f));
    fs.rmSync(path.join(demo.dir, "dist"), { recursive: true, force: true });
    prefixRootLinks(target, `/demo/${demo.id}`);
  } else if (demo.kind === "next") {
    buildNext(demo, target);
  } else if (demo.kind === "copy") {
    // Static site with relative links: the built pages and their assets, without sources and notes.
    fs.mkdirSync(target, { recursive: true });
    for (const f of fs.readdirSync(demo.dir)) if (f.endsWith(".html")) fs.copyFileSync(path.join(demo.dir, f), path.join(target, f));
    fs.cpSync(path.join(demo.dir, "assets"), path.join(target, "assets"), { recursive: true });
    // /demo/<id>/ redirects to /demo/<id> (no trailing slash), where relative links would point one folder up.
    absolutize(target, `/demo/${demo.id}`);
  } else {
    fs.mkdirSync(target, { recursive: true });
    for (const f of fs.readdirSync(demo.dir)) {
      if (f.endsWith(".html")) fs.copyFileSync(path.join(demo.dir, f), path.join(target, f));
    }
    fs.cpSync(path.join(demo.dir, "assets"), path.join(target, "assets"), { recursive: true, filter: (s) => !s.endsWith("sheet.html") });
  }
  console.log("✓", demo.id);
}
