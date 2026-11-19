# Valeria Ortiz | Portfolio

A one-page portfolio and media kit for social media manager and content creator **Valeria Ortiz**.
The page has one job: show her work and results, then make it easy for a potential client to message her on WhatsApp.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Look and feel

- **Palette:** `#000009` ink · `#2F2823` espresso · `#E2D9CA` sand · `#CBD0D5` mist · `#CBCCCD` grey, plus `#F6F3EE` paper (a light tint of sand). All are tokens at the top of `assets/css/styles.css`.
- **Type:** *Archivo* (heavy, expanded, all caps) for headlines, *Mrs Saint Delafield* for the handwritten script accents, *Manrope* for body text.
- **Layout:** rounded bento cards on a grey backdrop, plus full-width photo sections for testimonials and contact.

## Structure

```
index.html              page markup and copy
assets/css/styles.css   design tokens and all styling
assets/js/content.js    ← edit this file: WhatsApp number, photos, videos, stats, charts, packages…
assets/js/main.js       behaviour (galleries, lightbox, charts, counters, slider, WhatsApp links)
assets/media/           video posters (reel-01 … reel-08)
assets/media/photos/    page photos and the photography gallery (all placeholders for now)
```

## Adding the real photos

Every placeholder image is labelled with its slot name and ideal size. Either overwrite the file with a `.jpg`/`.webp` of the same name and update the extension in `content.js`, or point `content.js` at a new file.

| Slot | Where it appears | Shape | Recommended size | Set in `content.js` |
| --- | --- | --- | --- | --- |
| Hero | large photo next to the name | 4:5 portrait | 1200 × 1500 | `photos.hero` |
| About | tilted photo in "Hey, I'm Valeria" | 4:5 portrait | 800 × 1000 | `photos.about` |
| Services | arch photo in "Niches & Services" | 3:4 portrait | 900 × 1200 | `photos.services` |
| Testimonials background | full-width section behind the quotes | 16:9 landscape | 2400 × 1350 | `photos.testimonialsBg` |
| Contact background | full-width "Let's collaborate" section | 16:9 landscape | 2400 × 1350 | `photos.contactBg` |
| Photography gallery (×8) | Photography section, 4 paid + 4 organic | 4:5 portrait | 1080 × 1350 | `photography[].src` |
| Video posters (×8) | phone frames in Videography | 9:16 vertical | 1080 × 1920 | `videos[].poster` |

Tips: export JPG or WebP at roughly 80% quality, and keep each file under ~400 KB (backgrounds under ~700 KB). The two background photos get a dark overlay so white text stays readable, so moody or simple images work best.

## Everything else in `content.js`

| What | Key |
| --- | --- |
| WhatsApp number (digits only, with country code, e.g. `34612345678`) | `whatsappNumber` |
| Default WhatsApp message | `whatsappMessage` |
| Instagram / TikTok / LinkedIn (also `youtube`, `pinterest`) | `socials` |
| "Backed by brands" stat boxes | `highlights` |
| Brand names (shown as wordmarks in two places) | `brands` |
| Niches & services pills | `services` |
| "Content that performs" numbers | `metrics` |
| The three charts (follower growth, views by platform, monthly reach) | `charts` |
| Videos: `category` is `paid` or `organic` | `videos` |
| Photos: `category` is `paid` or `organic` | `photography` |
| Case studies | `cases` |
| Packages and "starting at" prices | `packages` |
| Testimonials | `testimonials` |

### Videos

`src` can be:
- a self-hosted file, e.g. `"assets/media/summer-drop.mp4"`. It plays muted on hover (or when scrolled into view on phones) and with sound in the popup. Keep files small (H.264 MP4, under ~8 MB).
- a YouTube, YouTube Shorts or Vimeo link, which is embedded in the popup.
- an Instagram or TikTok post link. The popup shows a "Watch on Instagram/TikTok" link.

### Text written directly in `index.html`

The hero line, about text, "Based in Your City", process steps, FAQ and contact text.

## Preview locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Publishing

It's a static site: upload `index.html` and the `assets/` folder to any static host or a web server's public folder. Nothing needs to be built or installed.
