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
  { id: "concepts", kind: "static", dir: path.resolve("design/concepts") },
];

const only = process.argv.slice(2);

// Root-absolute links of an Astro site, prefixed with the demo's folder.
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
  } else if (demo.kind === "copy") {
    // Static site with relative links: the built pages and their assets, without sources and notes.
    fs.mkdirSync(target, { recursive: true });
    for (const f of fs.readdirSync(demo.dir)) if (f.endsWith(".html")) fs.copyFileSync(path.join(demo.dir, f), path.join(target, f));
    fs.cpSync(path.join(demo.dir, "assets"), path.join(target, "assets"), { recursive: true });
  } else {
    fs.mkdirSync(target, { recursive: true });
    for (const f of fs.readdirSync(demo.dir)) {
      if (f.endsWith(".html")) fs.copyFileSync(path.join(demo.dir, f), path.join(target, f));
    }
    fs.cpSync(path.join(demo.dir, "assets"), path.join(target, "assets"), { recursive: true, filter: (s) => !s.endsWith("sheet.html") });
  }
  console.log("✓", demo.id);
}
