# Changelog

Record notable user-facing changes, meaningful bug fixes, and breaking changes. Keep entries concise and group them by release or date.

Do not record routine internal cleanup, formatting-only changes, or minor refactors that have no meaningful user or maintainer impact.

## Unreleased

- Improved anatomy contrast and muscle/non-muscle color separation across all five color themes (`default`, `cloud`, `slate`, `stone`, `indigo`) in both light and dark modes.
- Applied squircle corner shaping (`corner-shape: squircle`) paired with design-token border radii across UI surfaces and controls.
- Reduced client JavaScript and low-tier GPU work by moving `BodyViewer`, `AnteriorSvg`, and `PosteriorSvg` to Server Components, replacing heavy full-width backdrop blur, and eliminating pointer-driven React re-renders.
