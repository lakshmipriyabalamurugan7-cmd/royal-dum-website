# Project memory

## Product intent & audience

- ROYAL DUM: premium biryani restaurant website.
- Audience: customers exploring menu/gallery and placing orders via cart.
- Features: 3D visuals (Three.js), cinematic video background hero, interactive menu, fully functional shopping cart.

## Brand personality & voice

- Royal, premium, cinematic Indian dining experience.
- Focus on authentic biryani heritage (chicken dum, mutton, handi, kebabs).

## Visual design & UX direction

- Dark-and-gold premium color theme throughout.
- Sections: hero (video bg), interactive menu, gallery, cart, navigation.
- Gallery: responsive grid, 8 tiles, featured large tile, `object-fit: cover`, rounded corners, hover zoom, scroll-reveal animations, captions.
- Prefer local image assets in project images folder over external URLs to avoid broken links.
- Fallback strategy: silently swap failed images to hero biryani photo — no broken boxes, placeholders, stars, or icons.
- Icons from `lucide-react`; JSX + Tailwind; `@/` path alias for imports.

## Decisions, constraints & rationale

- Local images verified to exist before wiring into components.
- Production build must pass after changes.
- When fixing one section, preserve all other sections, design, colors, navigation, and animations unchanged.
- No unnecessary package installs; use template defaults (JSX, Tailwind, React hooks, Lucide React).

## Open questions & assumptions

- Shopping cart is frontend-only state vs. connected to backend (unconfirmed).
- Three.js usage extent and specific 3D objects/interactions not yet detailed.
- Video background asset source and format not yet documented.
- Menu interactivity specifics (filtering, add-to-cart flow) not yet captured.