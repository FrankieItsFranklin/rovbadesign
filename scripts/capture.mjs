// Снимает обложки и экраны кейсов с локально запущенных сайтов студии.
// Запуск: npm run shots [id ...]   (нужен Playwright из ~/Desktop/crm и Google Chrome)
import { chromium } from "/Users/aleksejskuratov/Desktop/crm/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/work");

// cover: размер окна, кадр которого становится принтом на верёвке
// desktop/mobile: позиции кадров — доля высоты окна или CSS-селектор секции
const SOURCES = [
  { id: "finir", url: "http://localhost:4323/", cover: [1280, 1600], desktop: [0, 1.2, 2.6], mobile: [0, 1.3, 3] },
  { id: "halong", url: "http://localhost:4321/", cover: [1280, 1600], desktop: [0, 1, 2.2], mobile: [0, 1.2, 2.6] },
  { id: "piernicova", url: "http://localhost:3201/", cover: [1440, 1440], desktop: [0, 1, 2.2], mobile: [0, 1.2, 2.6] },
  { id: "luka", url: "http://localhost:3301/", cover: [1200, 1600], desktop: [0, 1, 2.2], mobile: [0, 1.2, 2.6] },
  { id: "sobaniec", url: "http://localhost:3401/", cover: [1280, 1600], desktop: [0, 1, 2.2], mobile: [0, 1.2, 2.6] },
  { id: "adp", url: "http://localhost:3501/", cover: [1280, 1600], desktop: [0, 1, 2.2], mobile: [0, 1.2, 2.6] },
  { id: "lident", url: "http://localhost:4000/static/lident/", cover: [1440, 1440], desktop: [0, 1, 2.2], mobile: [0, 1.2, 2.6] },
  { id: "milanovo", url: "concept:milanovo", cover: [1280, 1600], desktop: [0, "#dzien", "#cantina"], mobile: [0, "#dzien", "#forno"] },
  { id: "north-barber", url: "concept:north-barber", cover: [1200, 1600], desktop: [0, "#cennik", "#termin"], mobile: [0, "#termin", "#barberzy"] },
  { id: "atelier-17", url: "concept:atelier-17", cover: [1280, 1600], desktop: [0, "#uslugi", "#wizyta"], mobile: [0, "#wizyta", "#uslugi"] },
];

const only = process.argv.slice(2);
const resolveUrl = (u) => (u.startsWith("concept:") ? "file://" + path.resolve("design/concepts", u.slice(8) + ".html") : u);

async function settle(page) {
  // прокрутка до конца, чтобы сработали появления по скроллу и lazy-картинки
  await page.evaluate(async () => {
    const step = innerHeight / 2;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0);
  });
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation-delay:0s!important;animation-duration:0s!important;caret-color:transparent!important} [class*=cookie],[id*=cookie],[class*=Cookie],nextjs-portal{display:none!important}" });
  await page.waitForTimeout(600);
}

async function shoot(browser, src, kind, [w, h], scale, positions) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale, isMobile: kind === "mobile", hasTouch: kind === "mobile", reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(resolveUrl(src.url), { waitUntil: "networkidle", timeout: 90000 });
  await settle(page);
  const files = [];
  for (const [i, pos] of positions.entries()) {
    if (typeof pos === "string") await page.evaluate((sel) => scrollTo(0, document.querySelector(sel).getBoundingClientRect().top + scrollY), pos);
    else await page.evaluate((y) => scrollTo(0, y), Math.round(pos * h));
    await page.waitForTimeout(500);
    const file = `${src.id}/${kind}-${i + 1}.jpg`;
    await page.screenshot({ path: path.join(OUT, file), type: "jpeg", quality: 84 });
    files.push(file);
  }
  await ctx.close();
  return files;
}

const browser = await chromium.launch({ channel: "chrome" });
for (const src of SOURCES) {
  if (only.length && !only.includes(src.id)) continue;
  fs.mkdirSync(path.join(OUT, src.id), { recursive: true });
  await shoot(browser, src, "cover", src.cover, 1, [0]);
  fs.renameSync(path.join(OUT, src.id, "cover-1.jpg"), path.join(OUT, src.id, "cover.jpg"));
  await shoot(browser, src, "desktop", [1440, 900], 2, src.desktop);
  await shoot(browser, src, "mobile", [390, 844], 2, src.mobile);
  console.log("✓", src.id);
}
await browser.close();
