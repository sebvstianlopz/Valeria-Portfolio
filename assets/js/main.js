/* Valeria Ortiz | portfolio behaviour. No dependencies. Content lives in content.js */
(function () {
  "use strict";

  var S = window.SITE || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };


  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- WhatsApp ------------------------------------------------------- */
  function waLink(message) {
    var num = String(S.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message || S.whatsappMessage || "");
  }
  function wireWhatsApp() {
    $$("[data-wa]").forEach(function (a) {
      a.href = waLink(a.getAttribute("data-wa-msg"));
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---- Photos from content.js ---------------------------------------- */
  function applyPhotos() {
    var p = S.photos || {};
    $$("[data-photo]").forEach(function (img) {
      var src = p[img.getAttribute("data-photo")];
      if (src) img.src = src;
    });
  }

  /* ---- Small renderers ------------------------------------------------ */
  function renderSocials() {
    var html = (S.socials || []).map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '">' +
        '<svg aria-hidden="true"><use href="#i-' + esc(s.icon) + '"/></svg></a></li>';
    }).join("");
    $$("[data-socials]").forEach(function (ul) { ul.innerHTML = html; });
  }

  function renderBrands() {
    var html = (S.brands || []).map(function (b, i) {
      return '<li class="wm-' + ((i % 6) + 1) + '">' + esc(b) + "</li>";
    }).join("");
    $$("[data-brands], [data-band]").forEach(function (ul) { ul.innerHTML = html; });
  }

  function renderHighlights() {
    var ul = $("[data-highlights]");
    if (!ul) return;
    ul.innerHTML = (S.highlights || []).map(function (h) {
      return "<li><strong>" + esc(h.value) + "</strong><span>" + esc(h.label) + "</span></li>";
    }).join("");
  }

  function renderSkills() {
    var box = $("[data-skills]");
    if (box) {
      box.innerHTML = (S.skills || []).map(function (g, i) {
        return '<div class="skill reveal" style="--d:' + (i * 0.08) + 's"><h3>' + esc(g.title) + "</h3><ul>" +
          g.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul></div>";
      }).join("");
    }
    var n = $("[data-niches]");
    if (n) n.textContent = S.niches || "";
  }

  /* ---- Metrics + counters -------------------------------------------- */
  function fmt(v, d) { return d ? v.toFixed(d) : String(Math.round(v)); }

  function renderMetrics() {
    var box = $("[data-metrics]");
    if (!box) return;
    box.innerHTML = (S.metrics || []).map(function (m, i) {
      var final = (m.prefix || "") + fmt(m.value, m.decimals) + (m.suffix || "");
      return '<div class="metric reveal" style="--d:' + (i * 0.08) + 's">' +
        '<div class="metric__value" data-count="' + m.value + '" data-dec="' + (m.decimals || 0) + '" data-prefix="' + esc(m.prefix || "") + '" data-suffix="' + esc(m.suffix || "") + '">' + esc(final) + "</div>" +
        '<p class="metric__label">' + esc(m.label) + "</p></div>";
    }).join("");
    var note = $("[data-performance-note]");
    if (note) note.textContent = S.performanceNote || "";
  }

  function animateCounters() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var els = $$("[data-count]");
    els.forEach(function (el) { el.textContent = el.dataset.prefix + fmt(0, +el.dataset.dec) + el.dataset.suffix; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, target = +el.dataset.count, dec = +el.dataset.dec, start = null, dur = 1600;
        (function tick(t) {
          if (start === null) start = t;
          var p = Math.min((t - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = el.dataset.prefix + fmt(target * eased, dec) + el.dataset.suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Charts (inline SVG, single hue, hover tooltips) --------------- */
  var tip = $("[data-tooltip]");
  function showTip(text, x, y) { if (!tip) return; tip.textContent = text; tip.style.left = x + "px"; tip.style.top = y + "px"; tip.hidden = false; }
  function hideTip() { if (tip) tip.hidden = true; }

  function niceMax(v) {
    var pow = Math.pow(10, Math.floor(Math.log10(v))), n = v / pow;
    var steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
    for (var i = 0; i < steps.length; i++) if (n <= steps[i]) return steps[i] * pow;
    return 10 * pow;
  }
  function el(tag, attrs) {
    var s = "<" + tag;
    for (var k in attrs) s += " " + k + '="' + attrs[k] + '"';
    return s + "/>";
  }
  function txt(x, y, s, attrs) {
    var a = "";
    for (var k in (attrs || {})) a += " " + k + '="' + attrs[k] + '"';
    return '<text x="' + x + '" y="' + y + '"' + a + ">" + esc(s) + "</text>";
  }
  function table(caption, rows, unit) {
    return '<table class="visually-hidden"><caption>' + esc(caption) + "</caption><tbody>" +
      rows.map(function (r) { return "<tr><th scope=\"row\">" + esc(r.label) + "</th><td>" + esc(r.value + unit) + "</td></tr>"; }).join("") +
      "</tbody></table>";
  }
  function panel(c, svg) {
    return '<figure class="chart reveal"><figcaption><div class="chart__title">' + esc(c.title) + '</div><div class="chart__note">' + esc(c.note) + "</div></figcaption>" +
      svg + table(c.title, c.points || c.items, c.unit) + "</figure>";
  }

  function lineChart(c) {
    var W = 320, H = 180, L = 30, R = 34, T = 14, B = 26, pw = W - L - R, ph = H - T - B;
    var pts = c.points, max = niceMax(Math.max.apply(null, pts.map(function (p) { return p.value; })));
    var x = function (i) { return L + (pw * i) / (pts.length - 1); };
    var y = function (v) { return T + ph - (ph * v) / max; };
    var s = "";
    [0, 0.5, 1].forEach(function (f) {
      var gy = y(max * f);
      s += el("line", { "class": f === 0 ? "c-base" : "c-grid", x1: L, x2: W - R, y1: gy, y2: gy });
      s += txt(L - 8, gy + 4, f === 0 ? "0" : fmt(max * f) + c.unit, { "text-anchor": "end" });
    });
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.value).toFixed(1); }).join(" ");
    s += '<path class="c-area" d="' + d + " L" + x(pts.length - 1) + " " + y(0) + " L" + x(0) + " " + y(0) + ' Z"/>';
    s += '<path class="c-line" d="' + d + '"/>';
    pts.forEach(function (p, i) { if (i % 2 === 0) s += txt(x(i), H - 6, p.label, { "text-anchor": "middle" }); });
    var last = pts[pts.length - 1];
    s += el("circle", { "class": "c-dot", cx: x(pts.length - 1), cy: y(last.value), r: 5 });
    s += txt(x(pts.length - 1) + 9, y(last.value) + 4, last.value + c.unit, { "class": "c-value" });
    s += '<g class="c-hover" visibility="hidden">' + el("line", { "class": "c-cross", x1: 0, x2: 0, y1: T, y2: T + ph }) + el("circle", { "class": "c-dot", r: 5, cx: 0, cy: 0 }) + "</g>";
    s += el("rect", { "class": "c-hit", x: L, y: T, width: pw, height: ph, "data-line": "1" });
    return panel(c, '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(c.title + ": " + pts[0].value + c.unit + " to " + last.value + c.unit) + '" data-chart="line">' + s + "</svg>");
  }

  function hbarChart(c) {
    var W = 320, rowH = 38, T = 6, LBL = 100, R = 40, items = c.items, H = T + rowH * items.length;
    var max = Math.max.apply(null, items.map(function (i) { return i.value; }));
    var bw = W - LBL - R, s = "";
    items.forEach(function (it, i) {
      var yy = T + i * rowH + 8, w = Math.max(6, (bw * it.value) / max);
      s += txt(0, yy + 13, it.label, { "class": i === 0 ? "c-value" : "" });
      s += el("rect", { "class": "c-track", x: LBL, y: yy, width: bw, height: 18, rx: 4 });
      s += el("rect", { "class": "c-bar", x: LBL, y: yy, width: w.toFixed(1), height: 18, rx: 4, "data-i": i });
      s += txt(LBL + w + 8, yy + 13, it.value + c.unit, { "class": "c-value" });
      s += el("rect", { "class": "c-hit", x: 0, y: yy - 8, width: W, height: rowH, "data-i": i, "data-tip": esc(it.label + " · " + it.value + c.unit) });
    });
    return panel(c, '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(c.title) + '" data-chart="bars">' + s + "</svg>");
  }

  function vbarChart(c) {
    var W = 320, H = 180, L = 34, R = 6, T = 18, B = 26, pw = W - L - R, ph = H - T - B, items = c.items;
    var max = niceMax(Math.max.apply(null, items.map(function (i) { return i.value; })));
    var slot = pw / items.length, bw = Math.min(30, slot * 0.56), s = "";
    [0, 0.5, 1].forEach(function (f) {
      var gy = T + ph - ph * f;
      s += el("line", { "class": f === 0 ? "c-base" : "c-grid", x1: L, x2: W - R, y1: gy, y2: gy });
      s += txt(L - 8, gy + 4, f === 0 ? "0" : fmt(max * f) + c.unit, { "text-anchor": "end" });
    });
    items.forEach(function (it, i) {
      var h = (ph * it.value) / max, x0 = L + slot * i + (slot - bw) / 2, y0 = T + ph - h, r = Math.min(4, h);
      s += '<path class="c-bar" data-i="' + i + '" d="M' + x0 + " " + (T + ph) + " V" + (y0 + r) + " Q" + x0 + " " + y0 + " " + (x0 + r) + " " + y0 +
        " H" + (x0 + bw - r) + " Q" + (x0 + bw) + " " + y0 + " " + (x0 + bw) + " " + (y0 + r) + " V" + (T + ph) + ' Z"/>';
      s += txt(x0 + bw / 2, H - 6, it.label, { "text-anchor": "middle" });
      if (i === items.length - 1) s += txt(x0 + bw / 2, y0 - 6, it.value + c.unit, { "class": "c-value", "text-anchor": "middle" });
      s += el("rect", { "class": "c-hit", x: L + slot * i, y: T, width: slot, height: ph, "data-i": i, "data-tip": esc(it.label + " · " + it.value + c.unit) });
    });
    return panel(c, '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(c.title + ": " + items[0].value + c.unit + " to " + items[items.length - 1].value + c.unit) + '" data-chart="bars">' + s + "</svg>");
  }

  function renderCharts() {
    var box = $("[data-charts]"), c = S.charts;
    if (!box || !c) return;
    box.innerHTML = lineChart(c.growth) + hbarChart(c.platforms) + vbarChart(c.reach);

    // Bar hover: highlight the bar, show its value
    $$('svg[data-chart="bars"]', box).forEach(function (svg) {
      $$(".c-hit", svg).forEach(function (hit) {
        hit.addEventListener("pointermove", function (e) {
          svg.classList.add("is-hovering");
          $$(".c-bar", svg).forEach(function (b) { b.classList.toggle("is-hot", b.dataset.i === hit.dataset.i); });
          showTip(hit.dataset.tip, e.clientX, e.clientY);
        });
        hit.addEventListener("pointerleave", function () { svg.classList.remove("is-hovering"); hideTip(); });
      });
    });

    // Line hover: crosshair snaps to the nearest point
    var line = $('svg[data-chart="line"]', box), g = c.growth;
    if (line) {
      var hit = $(".c-hit", line), hov = $(".c-hover", line), cross = $(".c-cross", hov), dot = $(".c-dot", hov);
      var W = 320, L = 30, R = 34, T = 14, ph = 180 - 14 - 26, max = niceMax(Math.max.apply(null, g.points.map(function (p) { return p.value; })));
      hit.addEventListener("pointermove", function (e) {
        var box2 = line.getBoundingClientRect(), sx = ((e.clientX - box2.left) / box2.width) * W;
        var i = Math.round(((sx - L) / (W - L - R)) * (g.points.length - 1));
        i = Math.max(0, Math.min(g.points.length - 1, i));
        var px = L + ((W - L - R) * i) / (g.points.length - 1), py = T + ph - (ph * g.points[i].value) / max;
        cross.setAttribute("x1", px); cross.setAttribute("x2", px);
        dot.setAttribute("cx", px); dot.setAttribute("cy", py);
        hov.setAttribute("visibility", "visible");
        var scale = box2.width / W;
        showTip(g.points[i].label + " · " + g.points[i].value + g.unit, box2.left + px * scale, box2.top + py * scale);
      });
      hit.addEventListener("pointerleave", function () { hov.setAttribute("visibility", "hidden"); hideTip(); });
    }
  }

  /* ---- Videos + photos ------------------------------------------------ */
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15l13-7.5z"/></svg>';
  var ITEMS = []; // flat list used by the lightbox

  function isFile(src) { return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src || ""); }

  function renderShowcase() {
    var social = S.social || { photos: [] }, campaign = S.campaign || { photos: [] };
    social.photos.forEach(function (p) { ITEMS.push({ type: "photo", set: "social", d: p }); });
    (S.videos || []).forEach(function (v) { ITEMS.push({ type: "video", set: "video", d: v }); });
    campaign.photos.forEach(function (p) { ITEMS.push({ type: "photo", set: "campaign", d: p }); });

    function tile(idx, cls) {
      var p = ITEMS[idx].d, label = p.client ? p.client + ": " + p.desc : campaign.name + " campaign: " + p.desc;
      return '<button class="tile ' + cls + ' reveal" data-index="' + idx + '" aria-label="View photo, ' + esc(label) + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(label) + '" loading="lazy"></button>';
    }

    // Social media grid
    var st = $("[data-social-text]"); if (st) st.textContent = social.text || "";
    var sg = $("[data-social]");
    if (sg) sg.innerHTML = ITEMS.map(function (it, i) { return it.set === "social" ? tile(i, "tile--social") : ""; }).join("");

    // Video groups
    var vg = $("[data-video-groups]");
    if (vg) {
      vg.innerHTML = (S.videoGroups || [{ id: "", caps: "", script: "" }]).map(function (g) {
        var cards = ITEMS.map(function (it, idx) {
          if (it.set !== "video" || (g.id && it.d.group !== g.id)) return "";
          var v = it.d, media = '<img src="' + esc(v.poster) + '" alt="" loading="lazy">';
          if (isFile(v.src)) media += '<video muted loop playsinline preload="none" src="' + esc(v.src) + '"></video>';
          return '<button class="item reveal" data-index="' + idx + '" aria-label="Play ' + esc(v.title) + " for " + esc(v.client) + '">' +
            '<span class="phone">' + media + '<span class="phone__play">' + PLAY + '</span><span class="chip">' + esc(v.metric) + "</span></span>" +
            '<span class="item__info"><span class="item__client">' + esc(v.client) + '</span><span class="item__desc">' + esc(v.desc) + "</span></span></button>";
        }).join("");
        return '<div class="showcase__group">' +
          (g.caps ? '<h3 class="sig sig--sub reveal"><span class="sig__caps">' + esc(g.caps) + '</span><span class="sig__script">' + esc(g.script) + "</span></h3>" : "") +
          '<div class="phones">' + cards + "</div></div>";
      }).join("");
    }

    // Campaign strip
    var cn = $("[data-campaign-name]"); if (cn) cn.textContent = campaign.name || "";
    var ct = $("[data-campaign-text]"); if (ct) ct.textContent = campaign.text || "";
    var cs = $("[data-campaign]");
    if (cs) cs.innerHTML = ITEMS.map(function (it, i) { return it.set === "campaign" ? tile(i, "tile--campaign") : ""; }).join("");

    // Stagger reveals within each row
    $$(".phones, .social__grid, .campaign__strip").forEach(function (row) {
      $$(".item, .tile", row).forEach(function (it, i) { it.style.setProperty("--d", (i * 0.06) + "s"); });
    });

    // Muted previews for self-hosted videos: hover on desktop, in view on touch
    if (reduceMotion) return;
    var canHover = window.matchMedia("(hover: hover)").matches;
    $$("[data-video-groups] .item").forEach(function (item) {
      var vid = $("video", item);
      if (!vid) return;
      var play = function () { var p = vid.play(); if (p && p.catch) p.catch(function () {}); item.classList.add("is-playing"); };
      var stop = function () { vid.pause(); item.classList.remove("is-playing"); };
      if (canHover) { item.addEventListener("mouseenter", play); item.addEventListener("mouseleave", stop); }
      else if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) { en[0].isIntersecting ? play() : stop(); }, { threshold: 0.7 }).observe(item);
      }
    });
  }

  /* ---- Case studies + packages --------------------------------------- */
  function renderCases() {
    var box = $("[data-cases]");
    if (!box) return;
    box.innerHTML = (S.cases || []).map(function (c, i) {
      return '<article class="card card--sand case reveal" style="--d:' + (i * 0.08) + 's">' +
        '<p class="case__industry">' + esc(c.industry) + '</p><h3 class="case__client">' + esc(c.client) + "</h3>" +
        '<p class="case__challenge">' + esc(c.challenge) + "</p>" +
        '<div class="case__kpi"><div class="case__kpi-label">' + esc(c.kpi) + "</div>" +
        '<div class="case__fig">' + esc(c.from) + '<small aria-label="to">→</small>' + esc(c.to) + "</div>" +
        '<div class="case__time">' + esc(c.time) + "</div></div></article>";
    }).join("");
  }

  function renderPackages() {
    var box = $("[data-packages]");
    if (!box) return;
    box.innerHTML = (S.packages || []).map(function (p, i) {
      var msg = "Hi Valeria! I'm interested in the " + p.name + " package. Could you tell me more?";
      return '<article class="pkg reveal' + (p.featured ? " pkg--featured" : "") + '" style="--d:' + (i * 0.08) + 's">' +
        (p.featured ? '<span class="pkg__badge">Most booked</span>' : "") +
        '<h3 class="pkg__name">' + esc(p.name) + '</h3><p class="pkg__tag">' + esc(p.tagline) + "</p>" +
        '<div class="pkg__price"><span class="pkg__from">Starting at</span><span class="pkg__amount">' + esc(p.price) + '</span><span class="pkg__per">' + esc(p.per || "") + "</span></div>" +
        "<ul>" + p.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>" +
        '<a class="pill pill--mist" data-wa data-wa-msg="' + esc(msg) + '" href="#">Book now</a></article>';
    }).join("");
  }

  /* ---- Testimonials --------------------------------------------------- */
  function renderQuotes() {
    var stage = $("[data-quotes]"), dots = $("[data-dots]"), slider = $("[data-slider]");
    if (!stage || !S.testimonials) return;
    stage.innerHTML = S.testimonials.map(function (t, i) {
      return '<figure class="quote' + (i === 0 ? " is-active" : "") + '" id="q' + i + '"' + (i ? ' aria-hidden="true"' : "") + ">" +
        "<blockquote>“" + esc(t.quote) + "”</blockquote><figcaption>" + esc(t.name) + " · " + esc(t.role) + "</figcaption></figure>";
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
    function stop() { clearInterval(timer); }
    function start() { stop(); if (!reduceMotion && quotes.length > 1) timer = setInterval(function () { go(cur + 1); }, 7000); }
    btns.forEach(function (b, i) { b.addEventListener("click", function () { go(i); start(); }); });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);
    start();
  }

  /* ---- Lightbox ------------------------------------------------------- */
  var lb = $("[data-lightbox]"), cur = 0, lastFocus = null;

  function embedFor(src) {
    var m;
    if ((m = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i.exec(src))) return "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0&playsinline=1";
    if ((m = /vimeo\.com\/(?:video\/)?(\d+)/i.exec(src))) return "https://player.vimeo.com/video/" + m[1] + "?autoplay=1&title=0&byline=0";
    return null;
  }

  function fill(idx) {
    var it = ITEMS[idx], d = it.d, media = $("[data-lb-media]", lb), embed;
    cur = idx;
    media.classList.toggle("lightbox__media--photo", it.type === "photo");
    if (it.type === "photo") {
      media.innerHTML = '<img src="' + esc(d.src) + '" alt="' + esc(d.client + ": " + d.desc) + '">';
    } else if (isFile(d.src)) {
      media.innerHTML = '<video controls autoplay playsinline poster="' + esc(d.poster) + '" src="' + esc(d.src) + '"></video>';
    } else if ((embed = embedFor(d.src || ""))) {
      media.innerHTML = '<iframe src="' + esc(embed) + '" title="' + esc(d.title) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else if (d.src) {
      var host = /tiktok/i.test(d.src) ? "TikTok" : /instagram/i.test(d.src) ? "Instagram" : "the original post";
      media.innerHTML = '<div class="lightbox__ext"><img src="' + esc(d.poster) + '" alt=""><a href="' + esc(d.src) + '" target="_blank" rel="noopener">Watch on ' + host + " ↗</a></div>";
    } else {
      media.innerHTML = '<img src="' + esc(d.poster) + '" alt="' + esc(d.title) + ' preview">';
    }
    var camp = S.campaign || {}, msg;
    if (it.set === "video") {
      $("[data-lb-cat]", lb).textContent = "videography";
      $("[data-lb-title]", lb).textContent = d.title;
      $("[data-lb-desc]", lb).textContent = d.client + ": " + d.desc;
      $("[data-lb-metric]", lb).textContent = d.metric || "";
      msg = "Hi Valeria! I loved your \"" + d.title + "\" video for " + d.client + ". I'd like something like this for my brand.";
    } else if (it.set === "campaign") {
      $("[data-lb-cat]", lb).textContent = "campaign";
      $("[data-lb-title]", lb).textContent = camp.name;
      $("[data-lb-desc]", lb).textContent = d.desc;
      $("[data-lb-metric]", lb).textContent = "Concept to final design";
      msg = "Hi Valeria! I loved your " + camp.name + " campaign. I'd like a campaign like this for my brand.";
    } else {
      $("[data-lb-cat]", lb).textContent = "social media";
      $("[data-lb-title]", lb).textContent = d.client;
      $("[data-lb-desc]", lb).textContent = d.desc;
      $("[data-lb-metric]", lb).textContent = "";
      msg = "Hi Valeria! I loved the social media content you made for the " + d.client.toLowerCase() + ". I'd like something like this for my brand.";
    }
    $("[data-lb-cta]", lb).href = waLink(msg);
  }

  function open(idx, opener) {
    lastFocus = opener || document.activeElement;
    fill(idx);
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    $(".lightbox__close", lb).focus();
  }
  function close() {
    lb.hidden = true;
    $("[data-lb-media]", lb).innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    var set = ITEMS[cur].set;
    var list = ITEMS.map(function (it, i) { return it.set === set ? i : -1; }).filter(function (i) { return i > -1; });
    var pos = list.indexOf(cur);
    fill(list[(pos + dir + list.length) % list.length]);
  }

  function wireLightbox() {
    if (!lb) return;
    document.addEventListener("click", function (e) {
      var item = e.target.closest("[data-index]");
      if (item) open(+item.dataset.index, item);
    });
    $$("[data-close]", lb).forEach(function (b) { b.addEventListener("click", close); });
    $("[data-prev]", lb).addEventListener("click", function () { step(-1); });
    $("[data-next]", lb).addEventListener("click", function () { step(1); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
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

  /* ---- Floating CTA --------------------------------------------------- */
  function wireFloat() {
    var float = $("[data-float]");
    if (!float || !("IntersectionObserver" in window)) return;
    var heroIn = true, contactIn = false;
    var update = function () { float.classList.toggle("is-visible", !heroIn && !contactIn); };
    new IntersectionObserver(function (en) { heroIn = en[0].isIntersecting; update(); }, { threshold: 0.1 }).observe($("#top"));
    new IntersectionObserver(function (en) { contactIn = en[0].isIntersecting; update(); }, { threshold: 0.15 }).observe($("#contact"));
  }

  /* ---- Reveal on scroll ---------------------------------------------- */
  function wireReveal() {
    var els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Init ----------------------------------------------------------- */
  applyPhotos();
  renderSocials();
  renderBrands();
  renderHighlights();
  renderSkills();
  renderMetrics();
  renderCharts();
  renderShowcase();
  renderCases();
  renderPackages();
  renderQuotes();
  var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
  wireWhatsApp();
  wireLightbox();
  wireFloat();
  wireReveal();
  animateCounters();
})();
