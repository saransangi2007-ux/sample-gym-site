# SAMPLE GYM — Demo Website

A modern, responsive one-page gym website built with plain HTML, CSS and JavaScript.
No frameworks, no build step, no database — just open it in a browser or upload it to any static host.

**Live demo sections:** Home · About · Facilities · Membership · Contact

---

## 1. Preview locally

### Option A — quickest
Double-click `index.html`. It opens directly in your browser.

### Option B — recommended local server
From this folder, run one of these:

```bash
# Python 3
python -m http.server 5500

# or Node.js
npx serve .
```

Then open `http://localhost:5500`.

> A local server is recommended because some browsers treat local font/image files differently when opening `file://` directly.

---

## 2. Project structure

```
sample gym/
├── index.html                 All page content and sections
├── css/
│   └── style.css              Design tokens, layout, responsive styles
├── js/
│   └── main.js                Mobile menu, scrollspy, form validation
├── assets/
│   ├── favicon.svg
│   ├── fonts/                 Self-hosted Barlow Condensed + Inter
│   └── images/                Hero, about and facility photos (WebP)
├── robots.txt                 Search-engine crawl permission
└── README.md
```

No npm install, build command or backend is required.

---

## 3. Easy customisation

Open `index.html` and use search (Ctrl/Cmd + F).

| What to change | Where |
|---|---|
| Gym name | Search for `SAMPLE GYM` and `Sample Gym` |
| Prices | Search for `plan__price` — change `999`, `1,499`, `2,499` |
| Plan names / features | Membership section in `index.html` |
| Phone / email / location | Search for `CONTACT` comment near the contact section |
| Opening hours | Contact section and footer |
| Social links | Footer — replace the placeholder Instagram/Facebook/YouTube URLs |
| SEO title/description | `<head>` in `index.html` |
| Favicon | `assets/favicon.svg` |
| Hero image | Replace `hero-gym.webp` plus the `-800` / `-1280` responsive versions |
| About image | Replace `assets/images/about-gym.webp` (1000 × 1250) |
| Facility images | Replace `assets/images/facility-*.webp` (800 × 600) |

### Change the brand colours
Edit the tokens at the top of `css/style.css`:

```css
:root {
  --bg: #0a0a0a;
  --surface: #111111;
  --green: #b8ff3d;
  ...
}
```

### Replace images
Use WebP or JPG files and keep the same filenames, or update the `src` values in `index.html`.
Recommended sizes:

- Hero: 1920 × 1280 px, plus 1280 × 853 and 800 × 533 px for the responsive `srcset`
- About: 1000 × 1250 px (4:5)
- Facility cards: 800 × 600 px (4:3)

Keep images compressed (under ~300 KB each is ideal). The three hero sizes let phones download a smaller file than desktops. If you only have one hero image, remove the `srcset`/`imagesrcset` attributes and keep the single `src`.

### Connect the contact form (when going live)
The demo form validates fields and shows a **demo success message only**. It does **not** send data anywhere.
To receive real enquiries, choose one of these simple options:

1. **Form service (no code):** create a form on Formspree, Getform, Basin or similar and set the form's `action` + `method` attributes, then remove the demo success behaviour.
2. **Static host function:** add a serverless function on Netlify/Vercel and POST the form data to it.
3. **Your own backend:** point the form at your API endpoint.

Before publishing a real version, update the success message so it reflects what actually happens and add a privacy note if you collect personal data.

---

## 4. Responsive behaviour

The layout is built mobile-first and tested across these approximate ranges:

- Phones: 320 px – 599 px (single column, hamburger menu, full-width form)
- Large phones / small tablets: 600 px – 767 px (2-column facility grid)
- Tablets: 768 px – 959 px (2-column grids, hamburger menu)
- Desktop: 960 px+ (horizontal nav, 3-column pricing, 2-column contact)
- Wide desktop: 1100 px+ (4-column facilities)

Key mobile safeguards:
- 16 px form text size (prevents iOS auto-zoom)
- 44–50 px minimum tap targets
- Fluid `clamp()` typography
- No fixed-width content, images scale with their containers
- `overflow-x` protection and scroll padding under the fixed header

Supported: current Chrome, Safari (macOS/iOS), Edge and Firefox.

---

## 5. Accessibility & performance notes

- Skip-to-content link
- Semantic landmarks, headings and visible form labels
- Keyboard support for the menu (Escape closes it) and visible focus outlines
- `aria-expanded` / `aria-controls` on the mobile menu
- Inline validation errors announced via `aria-live`
- Honest demo success message (never claims an enquiry was sent)
- Reduced-motion support via `prefers-reduced-motion`
- Self-hosted fonts, WebP images, lazy loading below the fold, preloaded hero image
- No JavaScript libraries or external CDN requests
- Basic SEO metadata, Open Graph tags and `HealthClub` structured data

> The structured data and social sharing image use relative paths. After deploying, update them to absolute URLs for the best results.

### Quality checks (local audit)
- Tested in Chromium at 320, 375, 390, 768, 844 (landscape), 1024, 1440 and 1920 px widths
- No horizontal overflow, menu and anchor navigation verified at every breakpoint
- Automated axe audit: **0 violations**
- Lighthouse (local Python server, no compression/caching): **94 performance · 100 accessibility · 100 best practices · 100 SEO**

Production hosts should enable Brotli/gzip compression and long-lived cache headers for images and fonts. Those two settings are the easiest way to improve the performance score further.

---

## 6. Publish online

Any static host works. Drag-and-drop options:

- **Netlify:** app.netlify.com/drop → drag this folder
- **Vercel:** import the folder/project
- **GitHub Pages:** push these files to a repository → Settings → Pages
- **Cloudflare Pages:** create a project and upload/connect the folder

No environment variables or server configuration are needed.

---

## 7. Demo content disclaimer

This is a demonstration website. The phone number, email and address are placeholders — no real gym contact details are included. All prices (₹999, ₹1,499, ₹2,499) are sample demo prices and are not offers.

Photography is loaded from Unsplash for demonstration purposes. Replace it with the gym's own photos, or check the Unsplash licence before using the images commercially.

Camera/photo sources (Unsplash):
- Hero: `photo-1534438327276-14e5300c3a48`
- About: `photo-1571019613454-1cb2f99b2d8b`
- Strength: `photo-1581009146145-b5ef050c2e1e`
- Cardio: `photo-1538805060514-97d9cc17730c`
- Personal training: `photo-1571019614242-c5c5dee9f50b`
- Functional fitness: `photo-1517963879433-6ad2b056d712`

---

Built as a clean, lightweight demo that is easy to rebrand for any gym.
