# Valeria Ortiz | Portfolio

A one-page portfolio and media kit for social media manager and content creator **Valeria Ortiz**, built from her Canva portfolio.
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
assets/js/main.js       behaviour (galleries, popup viewer, charts, counters, slider, WhatsApp links)
assets/media/work/      Valeria's real photos and video covers (from her Canva portfolio)
```

## Sections

01 About · 02 Skills & Expertise · 03 Content that Performs (stats + charts) · 04 Social Media ·
05 Videography · 06 Campaign · case studies · testimonials · 07 Packages · brands · process + FAQ · 08 Contact.
The numbering follows Valeria's Canva portfolio.

## Real content vs placeholders

Already real (taken from the Canva portfolio): portrait, skills & expertise, the aesthetics-clinic social media shoot,
the four service-launch video covers, and the Mother's Day campaign.

Still placeholders in `assets/js/content.js` (marked `PLACEHOLDER`):

| What | Key |
| --- | --- |
| WhatsApp number (digits only, with country code, e.g. `34612345678`) | `whatsappNumber` |
| Instagram / TikTok / LinkedIn links | `socials` |
| "Backed by brands" stat boxes | `highlights` |
| Brand names (shown as wordmarks in two places) | `brands` |
| "Content that performs" numbers and the three charts | `metrics`, `charts` |
| Case studies | `cases` |
| Package prices | `packages` |
| Testimonials | `testimonials` |

Also in `index.html`: replace "Based in Your City".

### Adding or swapping photos

Put new files in `assets/media/work/` and point to them in `content.js`:
`photos` (hero, about collage, services, the two background mosaics), `social.photos`, `campaign.photos`, and `videos[].poster`.
Good sizes: portraits 4:5 around 1000 px wide, video covers 9:16 around 720 × 1290, JPG at ~80% quality.

### Videos

Add the real video to each item's `src`:
- a self-hosted file, e.g. `"assets/media/work/launch.mp4"` (plays muted on hover and with sound in the popup; keep it under ~8 MB),
- a YouTube, YouTube Shorts or Vimeo link (embedded in the popup), or
- an Instagram or TikTok post link (the popup links out to it).

## Preview locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Publishing

It's a static site: upload `index.html` and the `assets/` folder to any static host or a web server's public folder. Nothing needs to be built or installed.
