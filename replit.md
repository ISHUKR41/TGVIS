# TGVIS — The Green Valley International School

## Project overview

TGVIS is a static, multi-page school website for The Green Valley International
School in Bihta, Bihar. It uses plain HTML, CSS, and JavaScript so every page
can be edited without a framework or build step.

## Folder guide

- `index.html`, `home.css`, and `home.js` — the public homepage.
- `pages/<section>/` — one folder per school section. Each section keeps its
  own HTML, CSS, and JavaScript files where page-specific behavior is needed.
- `assets/css/` — shared design tokens, components, and animation styles.
- `assets/js/` — shared utilities, navigation, accessibility, and animation
  behavior used across pages.
- `assets/images/` — organized school artwork grouped by purpose.
- `server.js` — the dependency-free local/Replit static file server.

## Run locally or on Replit

```bash
npm start
```

The server binds to `0.0.0.0:5000`, which is the port used by the Replit web
preview. It serves `/` as `index.html` and preserves the existing nested page
URLs.

## Editing conventions

Use clear English comments when adding a section or behavior. Keep shared
styles and scripts in `assets/`; keep page-specific code beside its page. Use
relative URLs for internal links and do not add hard-coded localhost URLs.

## Current content notes

The school phone, email, social, and admission-session details should be
replaced with verified official values before publishing. The image placeholders
in `assets/images/` can be replaced with approved school photography without
changing the existing HTML paths.