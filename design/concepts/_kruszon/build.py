"""Składa podstrony Kruszona (design/concepts/kruszon*.html) ze wspólnej głowy, nagłówka, koszyka i stopki.
Uruchom: python3 design/concepts/_kruszon/build.py   Domyślna paleta: DEFAULT_PAL (podgląd innych: ?pal=…)."""
from pathlib import Path
import re

HERE = Path(__file__).resolve().parent
OUT = HERE.parent
DEFAULT_PAL = "malina"

PAGES = [
    ("kruszon.html", "home", "Kruszon — cukiernia rodzinna w Łodzi, od 1991", "Rodzinna cukiernia w Łodzi: torty, ciastka i pączki z masłem, codziennie od piątej rano. Trzy cukiernie, torty na zamówienie."),
    ("kruszon-katalog.html", "katalog", "Witryna — Kruszon, cukiernia w Łodzi", "Ciasta, ciastka i pączki z dzisiejszej witryny z cenami, wagą i alergenami. Zamów do odbioru w jednej z trzech cukierni."),
    ("kruszon-tort.html", "tort", "Zaprojektuj tort — Kruszon, Łódź", "Zaprojektuj tort na zamówienie: piętra, biszkopt, krem, nadzienie, boki, polewa i dekoracje. Podgląd i cena na żywo."),
    ("kruszon-o-nas.html", "o-nas", "O nas — Kruszon, cukiernia od 1991", "Trzy pokolenia, jedna kruszonka. Jak wygląda dzień w pracowni na Bałutach i skąd bierzemy masło, jajka i twaróg."),
    ("kruszon-cukiernie.html", "cukiernie", "Cukiernie — Kruszon w Łodzi", "Trzy cukiernie Kruszona w Łodzi: Piotrkowska, Bałuty i Widzew. Godziny, dojazd, odbiór tortów."),
]
NAV = [("kruszon-katalog.html", "Witryna", "katalog"), ("kruszon-tort.html", "Zaprojektuj tort", "tort"), ("kruszon-o-nas.html", "O nas", "o-nas"), ("kruszon-cukiernie.html", "Cukiernie", "cukiernie")]

HEAD = """<!doctype html>
<html lang="pl" data-pal="{pal}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@500;600&family=Rubik:wght@400;500;600&display=swap" rel="stylesheet">
<script>(function(){{var m=location.search.match(/[?&]pal=(\\w+)/);if(m)document.documentElement.dataset.pal=m[1];document.documentElement.classList.add("js")}})()</script>
<link rel="stylesheet" href="assets/kruszon/site.css?v=7">
"""

SPRITES = """<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="cr1" viewBox="0 0 20 20"><path d="M3 9 7 3l7 1 4 6-3 7-8 1-4-4Z"/></symbol>
  <symbol id="cr2" viewBox="0 0 20 20"><path d="M2 12 5 5l8-2 5 5-1 7-9 2Z"/></symbol>
  <symbol id="cr3" viewBox="0 0 20 20"><path d="M5 4h7l5 7-4 6H6L2 11Z"/></symbol>
  <symbol id="cart" viewBox="0 0 24 24"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L20.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.5" fill="currentColor"/><circle cx="17" cy="20" r="1.5" fill="currentColor"/></symbol>
</svg>
"""

def header(cur):
    links = "".join(f'<a href="{h}"{" aria-current=\"page\"" if k == cur else ""}>{l}</a>' for h, l, k in NAV)
    sheet = "".join(f'<a href="{h}">{l}</a>' for h, l, k in NAV)
    return f"""<header class="bar">
  <div class="row1">
    <a class="logo" href="kruszon.html" aria-label="Kruszon, strona główna"><b>Kruszon</b><span>cukiernia od 1991</span></a>
    <span class="hide">Łódź · trzy cukiernie</span>
    <a class="tel hide" href="tel:+48420000000">42 000 00 00</a>
    <span class="sp"></span>
    <a class="pill hide" href="kruszon-cukiernie.html">Godziny otwarcia</a>
    <a class="pill hide" href="kruszon-tort.html">Tort na zamówienie</a>
    <button class="menu-btn" type="button" aria-expanded="false" data-menu-btn>Menu</button>
    <button class="cart-btn" type="button" aria-label="Koszyk" data-cart-open><svg aria-hidden="true"><use href="#cart"/></svg><b data-count>0</b></button>
  </div>
  <div class="row2"><nav aria-label="Strony">{links}</nav></div>
</header>
<div class="sheet" data-sheet role="dialog" aria-label="Menu"><button type="button" class="close" aria-label="Zamknij menu">×</button><a href="kruszon.html">Start</a>{sheet}</div>
"""

DRAWER = """<div class="scrim" data-scrim></div>
<aside class="drawer" aria-label="Koszyk" data-drawer aria-hidden="true">
  <div class="dh"><h2>Koszyk</h2><button type="button" class="x" aria-label="Zamknij koszyk" data-cart-close>×</button></div>
  <ul data-lines></ul>
  <p class="empty" data-empty>Koszyk jest pusty. Dodaj ciastko przyciskiem z wózkiem.</p>
  <div class="df">
    <div class="tot"><span>Razem</span><span data-total>0 zł</span></div>
    <label class="field">Odbiór dziś <select data-pick><option>Piotrkowska 112</option><option>Zgierska 41, Bałuty</option><option>Piłsudskiego 95, Widzew</option></select></label>
    <button class="btn" type="button" data-checkout>Zarezerwuj do odbioru</button>
    <p class="msg" role="status" data-msg></p>
  </div>
</aside>
"""

CREDITS = """Zdjęcia wyrobów: wizualizacje przygotowane dla projektu. Zdjęcia z pracowni: <a href="https://commons.wikimedia.org/wiki/File:PaczkiatWikimania2024.jpg">pączki na tacy</a> さえぼー, CC0; <a href="https://commons.wikimedia.org/wiki/File:Sma%C5%BCenie_p%C4%85czk%C3%B3w.jpg">smażenie pączków</a> Grażyna Rutowska, domena publiczna; <a href="https://commons.wikimedia.org/wiki/File:Sernik_-_Pastel_de_queso,_Gastronom%C3%ADa_polaca,_Gniezno,_Polonia1.jpg">pracownia</a> Diego Delso, CC BY-SA 3.0. Przez Wikimedia Commons."""

FOOTER = f"""<footer>
  <div class="wrap">
    <p class="script">cukiernia rodzinna od 1991</p>
    <div class="big" aria-hidden="true">Kruszon</div>
    <div class="cols">
      <div><b>Cukiernie</b><a href="kruszon-cukiernie.html">Piotrkowska 112</a><a href="kruszon-cukiernie.html">Zgierska 41, Bałuty</a><a href="kruszon-cukiernie.html">Piłsudskiego 95, Widzew</a></div>
      <div><b>Kontakt</b><a href="tel:+48420000000">42 000 00 00</a><a href="mailto:zamowienia@kruszon.example">zamowienia@kruszon.example</a></div>
      <div><b>Słodycze</b><a href="kruszon-katalog.html">Witryna</a><a href="kruszon-tort.html">Zaprojektuj tort</a><a href="kruszon-o-nas.html">O nas</a></div>
      <div><b>Strona</b>ROVBA Design</div>
    </div>
    <p class="credits">{CREDITS}</p>
  </div>
</footer>
"""

for fname, key, title, desc in PAGES:
    src = (HERE / "pages" / f"{key}.html").read_text(encoding="utf-8")
    style = ""
    m = re.match(r"\s*<style>(.*?)</style>\s*", src, re.S)
    if m: style, src = f"<style>{m.group(1)}</style>\n", src[m.end():]
    script = ""
    m = re.search(r"<script>(?:(?!<script>).)*</script>\s*$", src, re.S)
    if m: script, src = m.group(0), src[:m.start()]
    html = (HEAD.format(pal=DEFAULT_PAL, title=title, desc=desc) + style + "</head>\n<body>\n" + SPRITES + header(key) +
            "<main>\n" + src.strip() + "\n</main>\n" + DRAWER + FOOTER +
            '<script src="assets/concept.js"></script>\n<script src="assets/kruszon/site.js?v=6"></script>\n' + script + "\n</body>\n</html>\n")
    (OUT / fname).write_text(html, encoding="utf-8")
    print("ok", fname)
