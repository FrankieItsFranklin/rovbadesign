// Odpowiedź na naciśnięcie dla każdego przycisku i linku (port interaction kit z better-design).
// Przycisk ugina się o ~3 px z każdej strony w 80 ms i wraca sprężyną; link w tekście przygasa.
// Animuje osobną właściwość `scale` przez Web Animations, więc nie koliduje z transform i transition strony.
// Przy prefers-reduced-motion: samo przygaszenie, bez ruchu. Akcja nigdy nie czeka na animację.
(function () {
  if (typeof window === "undefined") return;
  if (window.__press || !Element.prototype.animate) return;
  window.__press = true;
  var SEL = "a[href], button, [role=button], [role=tab], [role=switch], [role=checkbox], [role=radio], summary, input[type=submit], input[type=button], label[for], [tabindex=\"0\"], [data-press]";
  var SPRING = "linear(0, 0.044, 0.155, 0.307, 0.475, 0.642, 0.794, 0.922, 1.023, 1.094, 1.139, 1.16, 1.162, 1.15, 1.129, 1.103, 1.075, 1.049, 1.025, 1.006, 0.991, 0.981, 0.976, 0.973, 0.974, 0.977, 0.981, 0.985, 0.989, 0.994, 0.997, 1, 1.002, 1.003, 1.004, 1.004, 1.004, 1.004, 1.003, 1.002, 1)";
  var OUT = "cubic-bezier(0.2, 0, 0, 1)";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)");
  var held = null;

  function blocked(el) { return el.disabled || el.getAttribute("aria-disabled") === "true" || el.closest("[data-no-press]"); }
  function mode(el) {
    if (reduce.matches) return "dim";
    if (el instanceof SVGElement) return "scale";
    var d = getComputedStyle(el).display;
    // `scale` nie działa na elementy inline, a link w zdaniu nie powinien skakać: przygaszamy go.
    return d === "inline" || d === "contents" ? "dim" : "scale";
  }
  function depth(el) {
    var r = el.getBoundingClientRect(), big = Math.max(r.width, r.height, 1);
    return Math.min(0.985, Math.max(0.9, 1 - 6 / big));
  }
  function down(el) {
    if (blocked(el)) return;
    if (held && held !== el) up();
    held = el;
    var m = mode(el);
    if (el instanceof SVGElement) { el.style.transformBox = "fill-box"; el.style.transformOrigin = "center"; }
    if (el.__pa) el.__pa.cancel();
    el.__pm = m; el.__pt = performance.now();
    el.__pa = m === "dim"
      ? el.animate([{ opacity: getComputedStyle(el).opacity }, { opacity: 0.62 }], { duration: 80, easing: OUT, fill: "forwards" })
      : el.animate([{ scale: "1", filter: "none" }, { scale: String(depth(el)), filter: "brightness(0.92)" }], { duration: 80, easing: OUT, fill: "forwards" });
  }
  function up() {
    var el = held; if (!el) return; held = null;
    // Krótkie stuknięcie też ma być widoczne: naciśnięcie trwa co najmniej 90 ms.
    setTimeout(function () {
      var a = el.__pa, cs = getComputedStyle(el);
      if (el.__pm === "dim") {
        var o = cs.opacity; if (a) a.cancel();
        el.__pa = el.animate([{ opacity: o }, { opacity: cs.opacity }], { duration: 220, easing: OUT });
      } else {
        var s = cs.scale === "none" ? "1" : cs.scale, f = cs.filter; if (a) a.cancel();
        el.__pa = el.animate([{ scale: s, filter: f }, { scale: "1", filter: cs.filter }], { duration: 520, easing: SPRING });
      }
    }, Math.max(0, 90 - (performance.now() - el.__pt)));
  }
  document.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    var el = e.target.closest && e.target.closest(SEL);
    if (el) down(el);
  }, { passive: true, capture: true });
  ["pointerup", "pointercancel", "dragstart", "blur"].forEach(function (t) { (t === "blur" ? window : document).addEventListener(t, up, { passive: true, capture: true }); });
  document.addEventListener("keydown", function (e) {
    if (e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
    var el = document.activeElement;
    if (el && el.matches && el.matches(SEL) && !(e.key === " " && el.tagName === "A")) down(el);
  }, true);
  document.addEventListener("keyup", function (e) { if (e.key === "Enter" || e.key === " ") up(); }, true);
})();

export {};
