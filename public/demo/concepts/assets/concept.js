// Общее для страниц-концептов: появления при прокрутке и мобильное меню.
// Скрытое состояние действует только под html.js, так что без скрипта всё видно сразу.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var groups = document.querySelectorAll("[data-reveal]");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var kids = e.target.querySelectorAll("[data-r]");
        kids.forEach(function (k, i) { k.style.transitionDelay = i * 80 + "ms"; });
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    groups.forEach(function (g) { io.observe(g); });
  } else {
    groups.forEach(function (g) { g.classList.add("is-in"); });
  }

  var btn = document.querySelector("[data-menu-btn]");
  var panel = document.querySelector("[data-menu]");
  if (btn && panel) {
    var set = function (open) {
      btn.setAttribute("aria-expanded", String(open));
      panel.toggleAttribute("data-open", open);
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
})();
