# Valeria Ortiz — Portfolio

A calm, editorial one-page portfolio for social media manager and video creator **Valeria Ortiz**.
The whole page has one job: show the work and the results, then make it easy for a potential client to message Valeria on WhatsApp.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Structure

```
index.html              page markup and copy (hero, services, about, FAQ…)
assets/css/styles.css   design tokens (colours, fonts) and all styling
assets/js/content.js    ← edit this file to change videos, numbers, packages, testimonials
assets/js/main.js       behaviour (gallery, lightbox, counters, slider, WhatsApp links)
assets/media/           images and videos (currently placeholders)
assets/favicon.svg      "vo" monogram
```

## Making it real: what to replace

All the repeating content lives in **`assets/js/content.js`**:

| What | Where in `content.js` |
| --- | --- |
| WhatsApp number (digits only, with country code, e.g. `34612345678`) | `whatsappNumber` |
| Default WhatsApp message | `whatsappMessage` |
| Instagram / TikTok / LinkedIn links | `socials` |
| Brand names in the scrolling strip | `brands` |
| The four headline results | `metrics` |
| Video gallery | `videos` |
| Case studies | `cases` |
| Packages and prices | `packages` |
| Testimonials | `testimonials` |

### Adding videos

1. Put a thumbnail (a still frame, ideally 1080×1920 `.jpg` or `.webp`) in `assets/media/`.
2. Set `poster` to that file, and `src` to one of:
   - a self-hosted video, e.g. `"assets/media/golden-hour.mp4"`: it plays muted on hover (or when scrolled into view on phones) and with sound in the lightbox. Keep files small (H.264 MP4, under ~8 MB).
   - a YouTube or YouTube Shorts link, or a Vimeo link: embedded in the lightbox.
   - an Instagram or TikTok post link: the lightbox shows a "Watch on Instagram/TikTok" link.
3. `category` must be `reels`, `brand`, `ugc` or `campaign` so the filters work.

### Other copy and images

- Hero text, services, process, about, FAQ and the final call to action are written directly in `index.html`.
- Replace `assets/media/portrait.svg` with a real portrait (4:5) and update the `src` in the About section.
- Replace `Based in Your City` in the About section.
- Case study images: `assets/media/case-0X.svg` (4:3).

### Brand colours and fonts

Every colour is a token at the top of `assets/css/styles.css` (`--bone`, `--ink`, `--clay`, `--espresso`, …). Headlines use *Instrument Serif* and body text uses *Manrope* (Google Fonts).

## Preview locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Publishing

It's a static site, so you can upload the whole folder (`index.html` plus `assets/`) to any static web host or a file manager's public web root. Nothing needs to be built or installed.
