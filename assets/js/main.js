/* Valeria Ortiz — portfolio behaviour. No dependencies. Content lives in content.js */
(function () {
  "use strict";

  var S = window.SITE || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var CATEGORY = { reels: "Reel", brand: "Brand film", ugc: "UGC", campaign: "Campaign" };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- WhatsApp links ------------------------------------------------- */
  function waLink(message) {
    var num = String(S.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message || S.whatsappMessage || "");
  }
  function wireWhatsApp(root) {
    $$("[data-wa]", root).forEach(function (a) {
      a.href = waLink(a.getAttribute("data-wa-msg"));
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---- Render: brands ------------------------------------------------- */
  function renderBrands() {
    var track = $("[data-brands]");
    if (!track || !S.brands) return;
    var set = S.brands.map(function (b) { return "<span>" + esc(b) + "</span>"; }).join("");
    var dup = S.brands.map(function (b) { return '<span aria-hidden="true">' + esc(b) + "</span>"; }).join("");
    track.innerHTML = set + dup; // duplicated for a seamless loop
  }

  /* ---- Render: metrics ------------------------------------------------ */
  function renderMetrics() {
    var box = $("[data-metrics]");
    if (!box || !S.metrics) return;
    box.innerHTML = S.metrics.map(function (m, i) {
      var final = (m.prefix || "") + m.value + (m.suffix || "");
      return '<div class="metric reveal" style="--d:' + (i * 0.08) + 's">' +
        '<div class="metric__value" data-count="' + m.value + '" data-prefix="' + esc(m.prefix || "") + '" data-suffix="' + esc(m.suffix || "") + '" aria-label="' + esc(final) + '">' + esc(final) + "</div>" +
        '<p class="metric__label">' + esc(m.label) + "</p></div>";
    }).join("");
  }

  function animateCounters() {
    var els = $$("[data-count]");
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    els.forEach(function (el) {
      el.textContent = el.dataset.prefix + "0" + el.dataset.suffix;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, target = +el.dataset.count, start = null, dur = 1800;
        function tick(t) {
          if (start === null) start = t;
          var p = Math.min((t - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = el.dataset.prefix + Math.round(target * eased) + el.dataset.suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Render: gallery ------------------------------------------------ */
  var PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15l13-7.5z"/></svg>';

  function isFile(src) { return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src || ""); }

  function renderGallery() {
    var box = $("[data-gallery]");
    if (!box || !S.videos) return;
    box.innerHTML = S.videos.map(function (v, i) {
      var media = '<img src="' + esc(v.poster) + '" alt="" loading="lazy">';
      if (isFile(v.src)) media += '<video muted loop playsinline preload="none" src="' + esc(v.src) + '"></video>';
      return '<button class="card reveal" style="--d:' + ((i % 3) * 0.08) + 's" data-index="' + i + '" data-cat="' + esc(v.category) + '" ' +
        'aria-label="Open ' + esc(v.title) + " for " + esc(v.client) + ", " + esc(v.metric) + '">' +
        '<div class="card__frame">' + media +
          '<span class="card__tag">' + esc(CATEGORY[v.category] || v.category) + "</span>" +
          '<span class="card__play">' + PLAY_ICON + "</span>" +
          '<div class="card__overlay"><div class="card__metric">' + esc(v.metric) + "</div></div>" +
        "</div>" +
        '<div class="card__meta"><span class="card__title">' + esc(v.title) + '</span><span class="card__client">' + esc(v.client) + "</span></div>" +
      "</button>";
    }).join("");

    // Muted previews for self-hosted videos: hover on desktop, in-view on touch.
    if (reduceMotion) return;
    var canHover = window.matchMedia("(hover: hover)").matches;
    $$(".card", box).forEach(function (card) {
      var vid = $("video", card);
      if (!vid) return;
      var play = function () { var p = vid.play(); if (p && p.catch) p.catch(function () {}); card.classList.add("is-playing"); };
      var stop = function () { vid.pause(); card.classList.remove("is-playing"); };
      if (canHover) {
        card.addEventListener("mouseenter", play);
        card.addEventListener("mouseleave", stop);
      } else if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) { en[0].isIntersecting ? play() : stop(); }, { threshold: 0.7 }).observe(card);
      }
    });
  }

  function wireFilters() {
    var buttons = $$("[data-filter]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        $$(".card").forEach(function (c) {
          c.classList.add("is-in");
          c.classList.toggle("is-hidden", f !== "all" && c.dataset.cat !== f);
        });
      });
    });
  }

  /* ---- Render: case studies ------------------------------------------ */
  function renderCases() {
    var box = $("[data-cases]");
    if (!box || !S.cases) return;
    box.innerHTML = S.cases.map(function (c) {
      var stats = c.stats.map(function (s) {
        return '<div><div class="case__stat-k">' + esc(s.k) + '</div><div class="case__stat-v">' +
          (s.from ? '<span class="case__stat-from">from ' + esc(s.from) + "</span>" : "") + esc(s.to) + "</div></div>";
      }).join("");
      return '<article class="case">' +
        '<figure class="case__img reveal"><img src="' + esc(c.image) + '" alt="' + esc(c.client) + ' content preview" loading="lazy"></figure>' +
        '<div class="case__body reveal" style="--d:.1s">' +
          '<h3 class="case__client">' + esc(c.client) + "</h3>" +
          '<p class="case__industry">' + esc(c.industry) + "</p>" +
          '<div class="case__block"><h4>The challenge</h4><p>' + esc(c.challenge) + "</p></div>" +
          '<div class="case__block"><h4>The approach</h4><p>' + esc(c.strategy) + "</p></div>" +
          '<div class="case__stats">' + stats + "</div>" +
        "</div></article>";
    }).join("");
  }

  /* ---- Render: packages ---------------------------------------------- */
  function renderPackages() {
    var box = $("[data-packages]");
    if (!box || !S.packages) return;
    box.innerHTML = S.packages.map(function (p, i) {
      var msg = "Hi Valeria! I'm interested in the " + p.name + " package. Could you tell me more?";
      return '<article class="pkg reveal' + (p.featured ? " pkg--featured" : "") + '" style="--d:' + (i * 0.08) + 's">' +
        (p.featured ? '<span class="pkg__badge">Most chosen</span>' : "") +
        '<h3 class="pkg__name">' + esc(p.name) + "</h3>" +
        '<p class="pkg__tag">' + esc(p.tagline) + "</p>" +
        '<p class="pkg__price">' + esc(p.price || "Tailored quote") + "</p>" +
        '<ul class="ticks">' + p.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn btn--outline" data-wa data-wa-msg="' + esc(msg) + '" href="#">Choose ' + esc(p.name) + "</a>" +
      "</article>";
    }).join("");
  }

  /* ---- Render: testimonials slider ----------------------------------- */
  function renderQuotes() {
    var stage = $("[data-quotes]"), dots = $("[data-dots]"), slider = $("[data-slider]");
    if (!stage || !S.testimonials) return;
    stage.innerHTML = S.testimonials.map(function (t, i) {
      return '<figure class="quote' + (i === 0 ? " is-active" : "") + '" id="q' + i + '"' + (i === 0 ? "" : ' aria-hidden="true"') + ">" +
        "<blockquote>" + esc(t.quote) + "</blockquote>" +
        '<figcaption><div class="quote__name">' + esc(t.name) + '</div><div class="quote__role">' + esc(t.role) + "</div></figcaption></figure>";
    }).join("");
    dots.innerHTML = S.testimonials.map(function (t, i) {
      return '<button role="tab" aria-controls="q' + i + '" aria-selected="' + (i === 0) + '" aria-label="Testimonial ' + (i + 1) + '"></button>';
    }).join("");

    var quotes = $$(".quote", stage), btns = $$("button", dots), cur = 0, timer = null;
    function go(n) {
      cur = (n + quotes.length) % quotes.length;
      quotes.forEach(function (q, i) {
        q.classList.toggle("is-active", i === cur);
        if (i === cur) q.removeAttribute("aria-hidden"); else q.setAttribute("aria-hidden", "true");
      });
      btns.forEach(function (b, i) { b.setAttribute("aria-selected", i === cur ? "true" : "false"); });
    }
    function start() { if (!reduceMotion && quotes.length > 1) { stop(); timer = setInterval(function () { go(cur + 1); }, 7000); } }
    function stop() { clearInterval(timer); }
    btns.forEach(function (b, i) { b.addEventListener("click", function () { go(i); start(); }); });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);
    start();
  }

  /* ---- Render: socials + year ---------------------------------------- */
  function renderFooter() {
    var ul = $("[data-socials]");
    if (ul && S.socials) {
      ul.innerHTML = S.socials.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
      }).join("");
    }
    var y = $("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---- Lightbox ------------------------------------------------------- */
  var lb = $("[data-lightbox]"), lbIndex = 0, lastFocus = null;

  function embedFor(src) {
    var m;
    if ((m = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i.exec(src))) {
      return "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0&playsinline=1";
    }
    if ((m = /vimeo\.com\/(?:video\/)?(\d+)/i.exec(src))) {
      return "https://player.vimeo.com/video/" + m[1] + "?autoplay=1&title=0&byline=0";
    }
    return null;
  }

  function visibleIndexes() {
    return $$(".card").filter(function (c) { return !c.classList.contains("is-hidden"); })
      .map(function (c) { return +c.dataset.index; });
  }

  function fillLightbox(i) {
    var v = S.videos[i], media = $("[data-lb-media]", lb), src = v.src || "", embed;
    lbIndex = i;
    if (isFile(src)) {
      media.innerHTML = '<video controls autoplay playsinline poster="' + esc(v.poster) + '" src="' + esc(src) + '"></video>';
    } else if ((embed = embedFor(src))) {
      media.innerHTML = '<iframe src="' + esc(embed) + '" title="' + esc(v.title) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else if (src) {
      var host = /tiktok/i.test(src) ? "TikTok" : /instagram/i.test(src) ? "Instagram" : "the original post";
      media.innerHTML = '<div class="lightbox__link"><img src="' + esc(v.poster) + '" alt=""><p style="margin-top:16px"><a href="' + esc(src) + '" target="_blank" rel="noopener">Watch on ' + host + " ↗</a></p></div>";
    } else {
      media.innerHTML = '<img src="' + esc(v.poster) + '" alt="' + esc(v.title) + ' preview">';
    }
    $("[data-lb-cat]", lb).textContent = CATEGORY[v.category] || v.category;
    $("[data-lb-title]", lb).textContent = v.title;
    $("[data-lb-client]", lb).textContent = v.client;
    $("[data-lb-metric]", lb).textContent = v.metric;
    $("[data-lb-cta]", lb).href = waLink("Hi Valeria! I loved your \"" + v.title + "\" video for " + v.client + ". I'd like something like this for my brand.");
  }

  function openLightbox(i, opener) {
    lastFocus = opener || document.activeElement;
    fillLightbox(i);
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    $(".lightbox__close", lb).focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    $("[data-lb-media]", lb).innerHTML = ""; // stops playback
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    var list = visibleIndexes(), pos = list.indexOf(lbIndex);
    fillLightbox(list[(pos + dir + list.length) % list.length]);
  }

  function wireLightbox() {
    if (!lb) return;
    $("[data-gallery]").addEventListener("click", function (e) {
      var card = e.target.closest(".card");
      if (card) openLightbox(+card.dataset.index, card);
    });
    $$("[data-close]", lb).forEach(function (el) { el.addEventListener("click", closeLightbox); });
    $("[data-prev]", lb).addEventListener("click", function () { step(-1); });
    $("[data-next]", lb).addEventListener("click", function () { step(1); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        var f = $$('button, a[href], video, iframe, [tabindex]:not([tabindex="-1"])', $(".lightbox__panel", lb));
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---- Nav + floating CTA -------------------------------------------- */
  function wireChrome() {
    var nav = $("[data-nav]"), float = $("[data-float]");
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!float || !("IntersectionObserver" in window)) return;
    var heroVisible = true, finalVisible = false;
    var update = function () { float.classList.toggle("is-visible", !heroVisible && !finalVisible); };
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; update(); }, { threshold: 0.15 }).observe($(".hero"));
    new IntersectionObserver(function (en) { finalVisible = en[0].isIntersecting; update(); }, { threshold: 0.2 }).observe($(".final"));
  }

  /* ---- Reveal on scroll ---------------------------------------------- */
  function wireReveal() {
    var els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Init ----------------------------------------------------------- */
  renderBrands();
  renderMetrics();
  renderGallery();
  renderCases();
  renderPackages();
  renderQuotes();
  renderFooter();
  wireWhatsApp(document);
  wireFilters();
  wireLightbox();
  wireChrome();
  wireReveal();
  animateCounters();
})();
