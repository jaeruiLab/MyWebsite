/* =====================================================================
   script.js: shared behavior for every page.
   You shouldn't need to touch this to update content; edit data.js.
   ===================================================================== */
(function () {
  "use strict";

  const SITE = window.SITE;
  if (!SITE) {
    console.error("data.js didn't load, so there's nothing to render.");
    return;
  }

  const page = document.body.dataset.page || "";
  const navPage = document.body.dataset.nav || page; // which nav item to highlight
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);
  }

  const EDIT_RE = /\s*\[EDIT(?::\s*([^\]]*))?\]/g;

  // Escape text, then turn `code` into <code> and [EDIT] / [EDIT: note] into a badge.
  function rich(str) {
    return esc(str)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(EDIT_RE, (_, note) =>
        SITE.showEditMarkers ? ` <mark class="edit-tag">EDIT${note ? ": " + note : ""}</mark>` : "");
  }

  // Same text with the [EDIT] markers stripped (for titles, attributes, the terminal).
  function plain(str) {
    return String(str == null ? "" : str).replace(EDIT_RE, "").trim();
  }

  const slug = (str) => plain(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  function fill(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  }

  function prompt(path, cmd) {
    return `<span class="prompt-path">${esc(path)}</span> $ ${esc(cmd)}`;
  }

  function tagList(tags) {
    return `<ul class="tags" aria-label="Skills">${tags.map((t) => `<li>${rich(t)}</li>`).join("")}</ul>`;
  }

  function linkList(links) {
    const real = (links || []).filter((l) => l.url);
    if (!real.length) return "";
    return `<p class="link-row">${real.map((l) =>
      `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${rich(l.label)} <span aria-hidden="true">↗</span></a>`
    ).join("")}</p>`;
  }

  /* Caffeine (1,3,7-trimethylxanthine) as skeletal line art. Bond ends with no label are methyl groups. */
  const MOLECULE_SVG = `
<svg class="molecule" viewBox="10 4 200 192" aria-hidden="true" focusable="false">
  <g class="bonds">
    <polygon points="100,60 134.6,80 134.6,120 100,140 65.4,120 65.4,80"/>
    <polyline points="134.6,80 172.6,67.6 196.1,100 172.6,132.4 134.6,120"/>
    <line x1="141" y1="86" x2="141" y2="114"/>
    <line x1="171.2" y1="124" x2="187.7" y2="101.3"/>
    <line x1="97" y1="60" x2="97" y2="27"/><line x1="103" y1="60" x2="103" y2="27"/>
    <line x1="66.9" y1="122.6" x2="37.5" y2="139.6"/><line x1="63.9" y1="117.4" x2="34.5" y2="134.4"/>
    <line x1="65.4" y1="80" x2="30.8" y2="60"/>
    <line x1="100" y1="140" x2="100" y2="180"/>
    <line x1="172.6" y1="67.6" x2="185" y2="29.6"/>
  </g>
  <g class="atoms">
    <g transform="translate(100 20)"><circle r="9"/><text>O</text></g>
    <g transform="translate(29 142)"><circle r="9"/><text>O</text></g>
    <g transform="translate(65.4 80)"><circle r="8"/><text>N</text></g>
    <g transform="translate(100 140)"><circle r="8"/><text>N</text></g>
    <g transform="translate(172.6 67.6)"><circle r="8"/><text>N</text></g>
    <g transform="translate(172.6 132.4)"><circle r="8"/><text>N</text></g>
  </g>
</svg>`;

  const BEAKER_SVG = `
<svg class="icon-beaker" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <path d="M24 8h16M27 8v18L12 52a4 4 0 0 0 3.5 6h33A4 4 0 0 0 52 52L37 26V8" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M19 42h26l5 9a3 3 0 0 1-2.6 4.5H16.6A3 3 0 0 1 14 51z" fill="currentColor" opacity=".25"/>
</svg>`;

  /* ---------- header + footer (shared on every page) ---------- */

  function renderHeader() {
    const el = $("#site-header");
    if (!el) return;
    const p = SITE.person;
    const links = SITE.nav.map((n) =>
      `<li><a href="${esc(n.href)}"${n.page === navPage ? ' aria-current="page"' : ""}>${esc(n.label)}</a></li>`
    ).join("");

    el.innerHTML = `
      <div class="wrap header-inner">
        <a class="brand" href="index.html">
          <span class="brand-tile" aria-hidden="true"><small>${esc(p.element.number)}</small>${esc(p.element.symbol)}</span>
          <span class="brand-name">${esc(plain(p.firstName))}</span>
          <span class="sr-only">, home</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="nav-toggle-bars" aria-hidden="true"></span>
          <span class="sr-only">Menu</span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Main">
          <ul>${links}</ul>
        </nav>
        <button class="lab-switch" type="button" role="switch" aria-checked="true" title="Lab lights">
          <span class="sr-only">Lab lights (light mode)</span>
          <span class="lab-switch-plate" aria-hidden="true">
            <span class="screw"></span>
            <span class="lab-switch-track"><span class="lab-switch-lever"></span></span>
            <span class="lab-switch-led"></span>
            <span class="screw"></span>
          </span>
        </button>
      </div>`;
  }

  function renderFooter() {
    const el = $("#site-footer");
    if (!el) return;
    el.innerHTML = `
      <div class="wrap footer-inner">
        <p class="footer-joke">${rich(SITE.footer)}</p>
        <p class="footer-meta">
          <span>© ${new Date().getFullYear()} ${rich(SITE.person.fullName)}</span>
          <button class="term-hint" type="button" data-terminal>psst: press <kbd>\`</kbd> for a terminal</button>
        </p>
      </div>`;
  }

  /* ---------- page renderers ---------- */

  function elementTile(e, name, extraClass) {
    return `
      <div class="element-tile ${extraClass || ""}" role="img"
           aria-label="Periodic table tile: ${esc(plain(name))}, symbol ${esc(e.symbol)}, atomic number ${esc(e.number)}">
        <span class="el-num">${esc(e.number)}</span>
        ${e.mass ? `<span class="el-mass">${esc(e.mass)}</span>` : ""}
        <span class="el-sym">${esc(e.symbol)}</span>
        <span class="el-name">${esc(plain(name))}</span>
        ${e.config ? `<span class="el-config">${esc(e.config)}</span>` : ""}
      </div>`;
  }

  const pages = {
    home() {
      const p = SITE.person;
      fill("hero-tile", elementTile(p.element, p.firstName, "element-tile--hero"));
      fill("hero-name", rich(p.fullName));
      fill("hero-intro", rich(p.intro));
      typeOut($("#tagline"), plain(p.tagline));

      fill("home-tiles", SITE.homeTiles.map((t, i) => `
        <li class="reveal" style="--i:${i}">
          <a class="tile-link" href="${esc(t.href)}">
            <span class="mini-tile" aria-hidden="true"><small>${esc(t.number)}</small>${esc(t.symbol)}</span>
            <span class="tile-link-text">
              <span class="tile-link-title">${esc(t.name)} <span aria-hidden="true">→</span></span>
              <span class="tile-link-blurb">${rich(t.blurb)}</span>
            </span>
          </a>
        </li>`).join(""));

      const proc = SITE.process;
      fill("pfd", `
        <ol class="pfd-steps">
          ${proc.steps.map((s, i) => `
            <li class="pfd-unit reveal" style="--i:${i}">
              <span class="pfd-tag">${esc(s.tag)}</span>
              <span class="pfd-label">${rich(s.label)}</span>
              <span class="pfd-note">${rich(s.note)}</span>
            </li>`).join("")}
        </ol>
        <p class="pfd-recycle"><span aria-hidden="true">↺</span> ${rich(proc.recycle)}</p>`);
    },

    about() {
      const a = SITE.about;
      fill("about-text", a.paragraphs.map((t) => `<p>${rich(t)}</p>`).join(""));

      fill("about-photo", a.photo.src
        ? `<img src="${esc(a.photo.src)}" alt="${esc(plain(a.photo.alt))}" width="480" height="600" loading="lazy">`
        : `<div class="photo-placeholder" role="img" aria-label="Photo placeholder">
             ${BEAKER_SVG}<span>photo goes here</span>${rich("[EDIT: set about.photo.src]")}
           </div>`);
      const cap = $("#about-photo-caption");
      if (cap) cap.innerHTML = a.photo.src ? rich(a.photo.alt) : "Fig. 1: the scientist, pending.";

      const m = a.favoriteMolecule;
      fill("fav-molecule", `
        ${MOLECULE_SVG}
        <div>
          <p class="kicker">Favorite molecule</p>
          <h2 class="fav-name">${rich(m.name)} <span class="formula">${esc(m.formula)}</span></h2>
          <p>${rich(m.why)}</p>
        </div>`);

      fill("fun-facts", a.funFacts.map((f, i) => `<li class="reveal" style="--i:${i}">${rich(f)}</li>`).join(""));
    },

    projects() {
      const grid = $("#project-grid");
      const bar = $("#project-filters");
      const count = $("#project-count");
      const all = SITE.projects;
      const cats = ["All", "Chem", "Code", "ChemE", "Outreach"];

      grid.innerHTML = all.map((p, i) => `
        <article class="card project-card reveal" style="--i:${i % 3}" data-cats="${esc(p.categories.join(" "))}">
          <div class="card-top">
            <span class="card-cats">${p.categories.map(esc).join(" · ")}</span>
            <span class="card-year">${rich(p.year)}</span>
          </div>
          <h2 class="card-title"><a href="project.html?id=${encodeURIComponent(p.id)}">${rich(p.title)}</a></h2>
          <p class="card-blurb">${rich(p.blurb)}</p>
          ${tagList(p.tags)}
          <span class="card-cta" aria-hidden="true">Read the lab report →</span>
        </article>`).join("");

      bar.innerHTML = cats.map((c) => {
        const n = c === "All" ? all.length : all.filter((p) => p.categories.includes(c)).length;
        return `<button type="button" class="chip" data-cat="${c}" aria-pressed="false">${c} <span class="chip-count">${n}</span></button>`;
      }).join("");

      const cards = $$(".project-card", grid);
      function apply(cat) {
        let shown = 0;
        cards.forEach((card) => {
          const match = cat === "All" || card.dataset.cats.split(" ").includes(cat);
          card.hidden = !match;
          if (match) shown++;
        });
        $$(".chip", bar).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
        count.textContent = shown
          ? `Showing ${shown} of ${all.length} reactions${cat === "All" ? "" : ` tagged ${cat}`}.`
          : "No reactions here yet. Activation energy pending.";
      }

      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        apply(btn.dataset.cat);
        const hash = btn.dataset.cat === "All" ? "" : "#" + btn.dataset.cat.toLowerCase();
        history.replaceState(null, "", location.pathname + location.search + hash);
      });

      // projects.html#cheme opens pre-filtered
      const fromHash = cats.find((c) => c.toLowerCase() === location.hash.slice(1).toLowerCase());
      apply(fromHash || "All");
    },

    project() {
      const all = SITE.projects;
      const id = new URLSearchParams(location.search).get("id");
      const idx = all.findIndex((p) => p.id === id);
      const out = $("#project-detail");

      if (idx === -1) {
        out.innerHTML = `
          <div class="page-head">
            <p class="prompt">${prompt("~/lab/reactions", `cat ${id || "???"}.md`)}</p>
            <h1>Unknown compound.</h1>
            <p class="lede">That reaction isn't in my notebook. It may have been renamed, or it never existed (spooky).</p>
            <p><a class="btn" href="projects.html">← Back to all reactions</a></p>
          </div>`;
        return;
      }

      const p = all[idx];
      const prev = all[(idx - 1 + all.length) % all.length];
      const next = all[(idx + 1) % all.length];
      document.title = `${plain(p.title)} · Reactions · ${plain(SITE.person.firstName)}`;

      out.innerHTML = `
        <div class="page-head">
          <p class="prompt">${prompt("~/lab/reactions", `cat ${p.id}.md`)}</p>
          <p class="kicker">${p.categories.map(esc).join(" · ")} · ${rich(p.year)}</p>
          <h1>${rich(p.title)}</h1>
          <p class="lede">${rich(p.blurb)}</p>
          ${tagList(p.tags)}
        </div>
        <p class="equation" aria-hidden="true">problem <span>→</span> build <span>⇌</span> learn</p>
        <div class="report">
          <section class="report-step reveal">
            <h2><span class="step-num">01</span> The problem</h2>
            <p>${rich(p.problem)}</p>
          </section>
          <section class="report-step reveal" style="--i:1">
            <h2><span class="step-num">02</span> What I built</h2>
            <p>${rich(p.built)}</p>
          </section>
          <section class="report-step reveal" style="--i:2">
            <h2><span class="step-num">03</span> What I learned</h2>
            <p>${rich(p.learned)}</p>
          </section>
        </div>
        ${linkList(p.links)}
        <nav class="pager" aria-label="More reactions">
          <a href="project.html?id=${encodeURIComponent(prev.id)}"><small>← Previous</small>${rich(prev.title)}</a>
          <a href="projects.html" class="pager-all">All reactions</a>
          <a href="project.html?id=${encodeURIComponent(next.id)}"><small>Next →</small>${rich(next.title)}</a>
        </nav>`;
    },

    experience() {
      const typeColor = {
        research: "code", club: "code",
        competition: "chem", award: "chem",
        leadership: "eng", volunteering: "eng",
      };
      fill("timeline", SITE.experience.map((x) => `
        <li class="tl-item reveal">
          <span class="tl-dot" aria-hidden="true"></span>
          <p class="tl-date">${rich(x.date)}</p>
          <div class="tl-card">
            <span class="badge badge--${typeColor[x.type.toLowerCase()] || "chem"}">${esc(x.type)}</span>
            <h2 class="tl-title">${rich(x.title)}</h2>
            <p class="tl-org">${rich(x.org)}</p>
            <p>${rich(x.body)}</p>
          </div>
        </li>`).join(""));
    },

    skills() {
      const groups = SITE.skillGroups;
      const skills = SITE.skills.map((s, i) => Object.assign({ n: i + 1 }, s));
      // Column counts give the blocks a periodic-table silhouette: tall s-block, short d-block, tall p-block.
      const COLS = { chem: 2, code: 3, eng: 2 };

      fill("skill-legend", Object.keys(groups).map((g) =>
        `<li><span class="swatch swatch--${g}" aria-hidden="true"></span>${esc(groups[g])}</li>`).join(""));

      fill("skill-table", Object.keys(groups).map((g) => {
        const list = skills.filter((s) => s.group === g);
        // Odd count in a 2-wide block: leave the top-left empty, like helium's lonely corner.
        const offset = COLS[g] === 2 && list.length % 2 === 1;
        return `
          <section class="skill-block skill-block--${g}" aria-labelledby="sk-${g}">
            <h2 id="sk-${g}" class="skill-block-title">${esc(groups[g])}</h2>
            <div class="skill-grid${offset ? " skill-grid--offset" : ""}" style="--cols:${COLS[g] || 3}">
              ${list.map((s) => `
                <button type="button" class="skill-tile skill--${g}" data-n="${s.n}" aria-controls="skill-detail">
                  <span class="st-num" aria-hidden="true">${s.n}</span>
                  <span class="st-sym" aria-hidden="true">${esc(s.sym)}</span>
                  <span class="st-name">${esc(plain(s.name))}</span>
                </button>`).join("")}
            </div>
          </section>`;
      }).join(""));

      const detail = $("#skill-detail");
      function show(n) {
        const s = skills.find((x) => x.n === n);
        if (!s) return;
        $$(".skill-tile").forEach((t) => t.classList.toggle("is-active", Number(t.dataset.n) === n));
        detail.innerHTML = `
          <div class="mini-tile mini-tile--${s.group}" aria-hidden="true"><small>${s.n}</small>${esc(s.sym)}</div>
          <div>
            <p class="kicker">${esc(groups[s.group])}</p>
            <h3 class="skill-detail-name">${rich(s.name)}</h3>
            <p>${rich(s.note)}</p>
          </div>`;
      }

      const table = $("#skill-table");
      const pick = (e) => {
        const t = e.target.closest(".skill-tile");
        if (t) show(Number(t.dataset.n));
      };
      table.addEventListener("mouseover", pick);
      table.addEventListener("focusin", pick);
      table.addEventListener("click", pick);
      show(1);
    },

    now() {
      const n = SITE.now;
      const [y, m, d] = n.lastUpdated.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const days = Math.round((today - date) / 86400000);
      const rel = days <= 0 ? "today" : days === 1 ? "yesterday" : `${days} days ago`;
      const pretty = date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

      fill("now-updated", `Last updated <time datetime="${esc(n.lastUpdated)}">${esc(pretty)}</time> (${rel})` +
        (days > 60 ? `. This board may be stale, like week-old agar.` : "."));

      fill("now-board", n.items.map((it, i) => `
        <li class="now-card reveal" style="--i:${i % 3}">
          <p class="now-label"><span class="led" aria-hidden="true"></span>${esc(it.label)}</p>
          <h2 class="now-title">${rich(it.title)}</h2>
          <p class="now-note">${rich(it.note)}</p>
        </li>`).join(""));
    },

    contact() {
      const c = SITE.contact;
      fill("contact-line", rich(c.line));
      fill("contact-links", c.links.map((l) => `
        <li>
          <a class="contact-link" href="${esc(l.url)}"${l.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
            <span class="contact-label">${esc(l.label)}</span>
            <span class="contact-handle">${rich(l.handle)}</span>
            <span class="contact-arrow" aria-hidden="true">↗</span>
          </a>
        </li>`).join(""));

      const form = $("#contact-form");
      const status = $("#form-status");
      const email = plain(c.email);
      form.action = "mailto:" + email; // no-JS fallback

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.elements.name.value.trim();
        const from = form.elements.email.value.trim();
        const msg = form.elements.message.value.trim();
        const subject = `Hello from ${name}`;
        const body = `${msg}\n\n— ${name}${from ? ` (${from})` : ""}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.innerHTML = `Opening your email app… If nothing happens, email me directly at <a href="mailto:${esc(email)}">${esc(email)}</a>.`;
      });
    },

    notfound() {
      const where = $("#missing-path");
      if (where) where.textContent = location.pathname.split("/").pop() || location.pathname;
    },
  };

  /* ---------- typewriter tagline ---------- */

  function typeOut(el, text) {
    if (!el) return;
    el.innerHTML = `<span class="sr-only">${esc(text)}</span><span class="typed" aria-hidden="true"></span><span class="cursor" aria-hidden="true"></span>`;
    const typed = $(".typed", el);
    if (reduceMotion) {
      typed.textContent = text;
      return;
    }
    let i = 0;
    (function tick() {
      typed.textContent = text.slice(0, ++i);
      if (i >= text.length) return;
      const ch = text[i - 1];
      const delay = /[.,!?]/.test(ch) ? 320 : 28 + Math.random() * 45;
      setTimeout(tick, delay);
    })();
  }

  /* ---------- theme (lab switch) ---------- */

  function initTheme() {
    const btn = $(".lab-switch");
    if (!btn) return;
    const label = $(".sr-only", btn);
    const sync = () => {
      const light = document.documentElement.dataset.theme !== "dark";
      btn.setAttribute("aria-checked", String(light));
      label.textContent = `Lab lights (${light ? "light" : "dark"} mode)`;
    };
    btn.addEventListener("click", () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
    document.addEventListener("themechange", sync);
    sync();
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode: fine, just won't persist */ }
    document.dispatchEvent(new Event("themechange"));
  }

  /* ---------- mobile nav ---------- */

  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $("#site-nav");
    if (!toggle || !nav) return;
    const set = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => set(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        set(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !e.target.closest(".header-inner")) set(false);
    });
  }

  /* ---------- scroll-in reveals ---------- */

  function initReveal() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- page-to-page transitions ---------- */

  function go(href) {
    if (reduceMotion) {
      location.href = href;
      return;
    }
    document.body.classList.add("is-leaving");
    setTimeout(() => { location.href = href; }, 170);
  }

  function initTransitions() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.protocol !== location.protocol || url.host !== location.host) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // in-page link
      e.preventDefault();
      go(url.href);
    });
    // Coming back via the back button restores a cached page: undo the fade-out.
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) document.body.classList.remove("is-leaving");
    });
  }

  /* ---------- easter egg: fake terminal (press `) ---------- */

  function initTerminal() {
    let dlg, out, input;
    const history = [];
    let hIdx = 0;
    const who = plain(SITE.person.firstName).toLowerCase();

    const pageFor = (arg) => {
      const a = slug(arg).replace(/\.html$/, "");
      if (!a || a === "~" || a === "-" || a === "home") return SITE.nav[0];
      if (a === "..") return SITE.nav[0];
      return SITE.nav.find((n) => slug(n.label) === a || n.page === a || n.href.replace(".html", "") === a);
    };

    const commands = {
      help: () => [
        "Available commands:",
        "  help              you're looking at it",
        "  whoami            who runs this lab",
        "  ls                list pages",
        "  cd <page>         go somewhere (try: cd reactions)",
        "  projects          list reactions (projects)",
        "  open <number>     open a project's lab report",
        "  skills            list elements (skills)",
        "  now               what I'm up to",
        "  contact           how to reach me",
        "  molecule          favorite molecule",
        "  react <a> <b>     run a reaction (try: react Na H2O)",
        "  theme [light|dark]",
        "  date · echo · clear · exit",
        "  sudo make coffee",
      ],
      whoami: () => [
        `${plain(SITE.person.fullName)}: chemistry + CS + chemical engineering`,
        `"${plain(SITE.person.tagline)}"`,
      ],
      ls: () => SITE.nav.map((n) => `${slug(n.label).padEnd(12)} → ${n.href}`),
      cd: (args) => {
        const target = pageFor(args.join(" "));
        if (!target) return `cd: no such directory: ${args.join(" ")}. Try \`ls\`.`;
        setTimeout(() => { close(); go(target.href); }, 250);
        return `Navigating to ${target.href}…`;
      },
      projects: () => SITE.projects.map((p, i) => `  [${i + 1}] ${plain(p.title)}  (${p.categories.join(", ")})`)
        .concat("Type `open <number>` to read one."),
      open: (args) => {
        const p = SITE.projects[Number(args[0]) - 1];
        if (!p) return "open: give me a project number. Try `projects` first.";
        setTimeout(() => { close(); go(`project.html?id=${encodeURIComponent(p.id)}`); }, 250);
        return `Opening lab report: ${plain(p.title)}…`;
      },
      skills: () => {
        const g = SITE.skillGroups;
        return Object.keys(g).map((k) =>
          `${g[k].padEnd(20)} ${SITE.skills.filter((s) => s.group === k).map((s) => s.sym).join(" ")}`);
      },
      now: () => SITE.now.items.map((it) => `${(it.label + ":").padEnd(15)} ${plain(it.title) || "(classified)"}`),
      contact: () => [
        plain(SITE.contact.line),
        ...SITE.contact.links.map((l) => `${l.label.padEnd(9)} ${plain(l.handle)}`),
      ],
      molecule: () => {
        const m = SITE.about.favoriteMolecule;
        return `${plain(m.name)} (${m.formula}). ${plain(m.why)}`;
      },
      react: (args) => {
        const key = args.map((a) => a.toLowerCase()).sort().join("+");
        const rx = {
          "h2o+na": "2Na + 2H₂O → 2NaOH + H₂↑   *fizz* *pop* *fire alarm*. Please don't do this at home.",
          "h2+o2": "2H₂ + O₂ → 2H₂O   That was loud. Water was made. Eyebrows were lost.",
          "hcl+naoh": "HCl + NaOH → NaCl + H₂O   Neutralized. Salty. Relatable.",
          "baking-soda+vinegar": "NaHCO₃ + CH₃COOH → CO₂↑ + H₂O + CH₃COONa   Congrats, it's a volcano.",
          "code+coffee": "coffee + code → features + bugs (1:1 ratio, sadly)",
        };
        if (args.length < 2) return "react: needs two reactants. Try `react Na H2O`.";
        return rx[key] || "No reaction. (Or the activation energy is higher than my motivation.)";
      },
      theme: (args) => {
        const t = args[0] === "light" || args[0] === "dark" ? args[0]
          : document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        setTheme(t);
        return t === "dark" ? "Lights off. Fume hood glow only." : "Lights on. Squint responsibly.";
      },
      date: () => new Date().toString(),
      echo: (args) => args.join(" "),
      clear: () => { out.innerHTML = ""; return null; },
      exit: () => { setTimeout(close, 120); return "Goodbye. Wash your hands."; },
      sudo: (args) => {
        const rest = args.join(" ").toLowerCase();
        if (rest === "make coffee") return [
          "[sudo] password for guest: ********",
          "Grinding beans… heating to 93 °C… extracting…",
          "Error 418: I'm a teapot.",
          "(Try `sudo make tea`.)",
        ];
        if (rest === "make tea") return "Steeping… done. That was suspiciously easy. ☕";
        return "guest is not in the sudoers file. This incident will be reported to the lab TA.";
      },
      rm: () => "Nice try. The fume hood is watching.",
      vim: () => "You've entered vim. Just kidding. Nobody escapes vim that easily, so I didn't let you in.",
      hello: () => `Hi! I'm ${plain(SITE.person.firstName)}'s terminal. Type \`help\`.`,
      coffee: () => "Coffee is a privileged operation. Try `sudo make coffee`.",
      make: () => "make: *** No targets specified. Did you mean `sudo make coffee`?",
    };
    commands.hi = commands.hello;
    commands.mix = commands.react;

    function print(lines, cls) {
      if (lines == null) return;
      [].concat(lines).forEach((line) => {
        const div = document.createElement("div");
        div.className = "term-line" + (cls ? " " + cls : "");
        div.textContent = line;
        out.appendChild(div);
      });
      out.scrollTop = out.scrollHeight;
    }

    function run(raw) {
      const line = raw.trim();
      print(`guest@${who}-lab:~$ ${line}`, "term-echo");
      if (!line) return;
      history.push(line);
      hIdx = history.length;
      const [cmd, ...args] = line.split(/\s+/);
      const fn = commands[cmd.toLowerCase()];
      print(fn ? fn(args) : `command not found: ${cmd}. Try \`help\`.`, fn ? "" : "term-err");
    }

    function build() {
      dlg = document.createElement("dialog");
      dlg.className = "term";
      dlg.setAttribute("aria-labelledby", "term-title");
      dlg.innerHTML = `
        <div class="term-inner">
          <div class="term-bar">
            <span class="term-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <h2 id="term-title" class="term-title">guest@${esc(who)}-lab: ~</h2>
            <button class="term-close" type="button" aria-label="Close terminal">×</button>
          </div>
          <div class="term-out" role="log" aria-live="polite"></div>
          <form class="term-form" autocomplete="off">
            <span class="term-prompt" aria-hidden="true">guest@${esc(who)}-lab:~$</span>
            <input class="term-input" type="text" aria-label="Type a command, or help" spellcheck="false" autocapitalize="off" autocomplete="off">
          </form>
        </div>`;
      document.body.appendChild(dlg);
      out = $(".term-out", dlg);
      input = $(".term-input", dlg);

      $(".term-form", dlg).addEventListener("submit", (e) => {
        e.preventDefault();
        run(input.value);
        input.value = "";
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && hIdx > 0) {
          input.value = history[--hIdx];
          e.preventDefault();
        } else if (e.key === "ArrowDown") {
          hIdx = Math.min(history.length, hIdx + 1);
          input.value = history[hIdx] || "";
          e.preventDefault();
        }
      });
      $(".term-close", dlg).addEventListener("click", close);
      dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); }); // backdrop click

      print([
        "Lab Terminal v6.0 (carbon edition)",
        "Type `help` for commands. Esc or ` to close.",
      ], "term-muted");
    }

    function open() {
      if (!dlg) build();
      if (dlg.open) return;
      dlg.showModal();
      input.focus();
    }

    function close() {
      if (dlg && dlg.open) dlg.close();
    }

    document.addEventListener("keydown", (e) => {
      if (e.key !== "`" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t === input) {
        if (input.value === "") { e.preventDefault(); close(); }
        return;
      }
      if (t.closest && t.closest("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      if (dlg && dlg.open) close(); else open();
    });

    // Phones don't have a backtick key handy, so the footer hint is a button too.
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-terminal]")) open();
    });
  }

  /* ---------- go ---------- */

  renderHeader();
  renderFooter();
  const lede = $("#page-lede");
  if (lede && SITE.intros && SITE.intros[page]) lede.innerHTML = rich(SITE.intros[page]);
  $$("[data-molecule]").forEach((el) => { el.innerHTML = MOLECULE_SVG; });
  if (pages[page]) pages[page]();
  initTheme();
  initNav();
  initReveal();
  initTransitions();
  initTerminal();
})();
