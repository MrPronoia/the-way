/**
 * Chapter Menu — Slide-out chapter navigation.
 *
 * Hamburger lives in the header bar (always visible).
 * Panel slides in from the left with all chapter links.
 *
 * Architecture:
 * - Overlay + panel live on document.body (created once, survive instant nav)
 * - Button is inserted into .md-header__inner on every navigation
 * - Uses Material's document$ observable for instant-nav awareness
 * - popstate listener catches back/forward after anchor navigation
 */
(function () {
  /* ── Overlay (body-level, created once) ── */
  var overlay = document.createElement("div");
  overlay.className = "mm-overlay";
  document.body.appendChild(overlay);

  /* ── Panel (body-level, created once) ── */
  var panel = document.createElement("div");
  panel.className = "mm-panel";
  panel.setAttribute("role", "navigation");
  panel.setAttribute("aria-label", "Chapter navigation");
  panel.innerHTML =
    '<div class="mm-panel-title">Chapters</div><nav class="mm-links"></nav>';
  document.body.appendChild(panel);

  var linksContainer = panel.querySelector(".mm-links");
  var currentBtn = null;

  /* ── Create a fresh button element ── */
  function createButton() {
    var btn = document.createElement("button");
    btn.className = "mm-btn";
    btn.setAttribute("aria-label", "Open chapter navigation");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "☰";
    btn.addEventListener("click", function () {
      panel.classList.contains("is-open") ? close() : open();
    });
    return btn;
  }

  /* ── Insert button into the header bar ── */
  function insertButton() {
    var header = document.querySelector(".md-header__inner");
    if (!header) return;
    if (header.querySelector(".mm-btn")) return;
    currentBtn = createButton();
    header.insertBefore(currentBtn, header.firstChild);
  }

  /* ── Open / Close ── */
  function open() {
    populate();
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (currentBtn) {
      currentBtn.setAttribute("aria-expanded", "true");
      currentBtn.innerHTML = "✕";
    }
  }

  function close() {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (currentBtn) {
      currentBtn.setAttribute("aria-expanded", "false");
      currentBtn.innerHTML = "☰";
    }
  }

  overlay.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  /* ── Populate links from MkDocs sidebar ── */
  function populate() {
    linksContainer.innerHTML = "";
    var navLinks = document.querySelectorAll(".md-nav__link[href]");
    var seen = {};
    var currentPath = window.location.pathname;

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var text = link.textContent.trim();
      if (!href || href === "#" || !text || seen[href]) return;
      if (href === "." || href === "./") return;
      /* Skip anchor links — menu is chapters only, no same-page headings */
      if (href.charAt(0) === "#") return;
      seen[href] = true;

      var a = document.createElement("a");
      a.href = href;
      a.textContent = text;

      if (
        href === currentPath ||
        currentPath.endsWith(href) ||
        currentPath.endsWith(href.replace(/^\.\//, ""))
      ) {
        a.classList.add("is-active");
      }

      a.addEventListener("click", function () {
        close();
      });

      linksContainer.appendChild(a);
    });
  }

  /* ── Hook into Material's instant navigation ── */
  function init() {
    close();
    insertButton();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      init();
    });
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }

  /* Back/forward after anchor navigation — document$ doesn't fire for
     hash-only changes, so we catch popstate separately. Short delay
     lets Material finish any DOM work before we check. */
  window.addEventListener("popstate", function () {
    setTimeout(insertButton, 60);
  });

  if (document.readyState !== "loading") {
    init();
  }
})();
