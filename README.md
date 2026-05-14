# Endpoint IT — Website

Static website for Endpoint IT, a sole-operator IT support business based in Perth's northern suburbs.

## Quick Start

No build step required. Open `index.html` in any modern browser:

```
# Option 1: Double-click index.html in your file manager

# Option 2: Use a local server (recommended for development)
npx serve .

# Option 3: Python
python -m http.server 8000
```

When deployed to Netlify, just push to the connected Git branch — Netlify serves the root directory as-is.

## Project Structure

```
endpoint-it/
├── index.html                  # Home page
├── netlify.toml                # Netlify deployment config
├── README.md                   # This file
│
├── css/
│   └── style.css               # All styles (variables, components, responsive)
│
├── js/
│   └── script.js               # All interactivity (nav, scroll, forms, pricing toggle)
│
├── pages/
│   ├── services.html           # Service descriptions
│   ├── pricing.html            # Full pricing with residential/business toggle
│   ├── about.html              # About the business
│   ├── clients.html            # Who we help + retainer explanation
│   ├── contact.html            # Contact form with client-side validation
│   └── privacy.html            # Privacy policy (AU-compliant)
│
└── images/
    ├── logo.svg                # Brand mark (network endpoint motif)
    ├── hero-bg.svg             # Abstract node/connection pattern for hero
    ├── icon-support.svg        # Headset icon (residential callouts)
    ├── icon-cloud.svg          # Cloud icon (M365 / migration)
    ├── icon-shield.svg         # Shield icon (trust / insurance)
    ├── icon-web.svg            # Browser icon (web design)
    └── icon-retainer.svg       # Recurring arrows icon (retainer plans)
```

## Tech Stack

- **HTML5** — semantic markup, ARIA attributes, OpenGraph meta tags
- **CSS3** — custom properties, grid, flexbox, clamp(), scroll animations
- **Vanilla JS** — IntersectionObserver, form validation, no dependencies
- **SVG** — hand-crafted icons and backgrounds, no external image downloads

No frameworks. No build tools. No dependencies.

## Features

- Dark theme with electric blue accent
- Responsive from 360px to desktop
- Mobile navigation with animated hamburger menu
- Sticky header with backdrop blur
- Scroll-reveal animations (IntersectionObserver)
- Back-to-top button
- Pricing toggle (Residential / Business tabs)
- Contact form with client-side validation + success toast
- Active nav state highlighting
- `prefers-reduced-motion` respected
- Skip-to-content link for accessibility
- Keyboard navigation support with visible focus states

## Deployment (Netlify)

1. Push this repo to GitHub
2. Connect the repo to Netlify
3. No build command needed — Netlify serves the root directory
4. Custom domain: point `endpointit.com.au` DNS to Netlify

The included `netlify.toml` configures the publish directory and security headers.

## Browser Support

Tested for modern evergreen browsers (Chrome, Firefox, Safari, Edge). IE11 is not supported.

## License

All rights reserved. Content and design are proprietary to Endpoint IT.
