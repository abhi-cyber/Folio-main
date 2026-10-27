# abhirajchatrath.netlify.app

Personal site of Abhiraj Singh Chatrath, Lead AI Engineer.

## Stack

- **Vite + React 18** with React Router (`/` and `/resume`)
- **GSAP 3.13** (ScrollTrigger, SplitText) for scroll choreography, plus **Lenis** smooth scrolling
- **Three.js / React Three Fiber** for the hero "knowledge graph" (lazy-loaded, paused off-screen, skipped without WebGL)
- **Netlify Functions + Blobs** for live visitor reactions (`/api/reactions`)
- **FormSubmit** (AJAX) for the contact form, delivered to abhicyber.dev@gmail.com

All content lives in `src/data/profile.js`, mirroring the resume PDF in `public/resume/`. To update the site after a resume change, edit that file and replace the PDF.

`backend_sanity/` is the old Sanity Studio. The site no longer reads from Sanity, so no API token is shipped to the browser.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
```

The reactions counter needs Netlify's runtime (`netlify dev`); without it the buttons still work and the count is hidden.

## Accessibility & motion

Everything respects `prefers-reduced-motion`: no smooth scroll, no preloader, no pinned sections, and the 3D scene renders a single still frame. The custom cursor only appears on fine pointers.
