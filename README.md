# Royal Dum — Premium 3D Biryani Restaurant Website

A luxurious, cinematic restaurant website with an interactive 3D biryani handi hero,
functional shopping cart, and smooth scroll animations.

## Features

- **3D Hero** — Real-time Three.js scene: rotating brass handi with biryani, rising
  steam, floating saffron particles, cinematic lighting, and mouse-parallax camera.
  Lightweight fallback for low-powered devices.
- **Signature Menu** — Six biryanis with prices in INR, ratings, veg/non-veg marks,
  and 3D tilt-on-hover food cards with golden glow.
- **Functional Cart** — Add / increase / decrease / remove items, automatic subtotal,
  free delivery over ₹999, order placement, and localStorage persistence.
- **Cinematic Video Section** — Full-width video with play/pause and a graceful
  branded fallback if the video can't load.
- **About, Offers, Gallery, Contact** — Scroll-reveal animations, discount cards,
  interactive gallery, contact form and map embed.
- Fully responsive (mobile / tablet / desktop), dark-gold premium theme.

## Tech Stack

React 18 · Vite · Tailwind CSS · Three.js (React Three Fiber + Drei) · Framer Motion · Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite — no extra configuration needed. Deploy.

## Customizing

- **Menu items** — edit `src/components/Menu.jsx` (`MENU_ITEMS` array).
- **Video** — replace `VIDEO_SRC` in `src/components/VideoSection.jsx` with your own
  royalty-free video URL or a local file in `public/videos/`.
- **Images** — drop your photos into `public/images/` using the existing file names
  (`about-dum.jpg`, `gallery-1.jpg` … `gallery-5.jpg`).
- **Contact details** — update the placeholders in `src/components/Contact.jsx`
  (address, phone, and the Google Maps embed URL).
- **Brand colors** — adjust the palette in `tailwind.config.js`.
