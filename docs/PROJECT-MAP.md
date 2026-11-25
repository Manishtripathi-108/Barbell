# Project Map

This document describes the actual architecture, routes, features, and folder relationships of **Barbell Atlas** (`barbell-wiki`).

## Overview

- **Project purpose:** Interactive barbell training atlas and anatomy visualizer for inspecting muscle movement zones, volume guidance, and workout split programming.
- **Framework and runtime:** Next.js 16 (App Router), React 19, TypeScript (strict mode), Tailwind CSS v4.
- **Package manager:** npm
- **Database and ORM:** Not configured yet (to be selected by the user: Prisma or Drizzle per `AGENTS.md`).
- **Authentication:** Not required at this stage.
- **Deployment provider:** Chosen by the user.

## Top-level structure

```text
src/
├── app/
│   ├── favicon.ico
│   ├── layout.tsx                     # Root App Router layout, font injection, ThemeScript, ThemeProvider, ToastProvider
│   └── page.tsx                       # Main anatomy workspace page
├── components/
│   ├── providers/
│   │   ├── ThemeProvider.tsx          # Client theme context provider (modes, color schemes, animated transitions)
│   │   ├── ThemeScript.tsx            # Anti-flash inline script in <head> for zero-hydration theme flash
│   │   └── ToastProvider.tsx          # Goey Toast provider following active theme mode
│   └── ui/
│       ├── Icon.tsx                   # Semantic Iconify wrapper component
│       └── ThemeToggler.tsx           # Accessible animated mode toggle (Light/Dark/System)
├── constants/
│   └── icons.ts                       # Central semantic icon map to Iconify identifiers
├── features/
│   └── anatomy/                       # Feature module for interactive muscle atlas
│       ├── index.ts                   # Public entry point for anatomy feature
│       ├── store.ts                   # Zustand store for anatomy mode and selection
│       ├── utils.ts                   # Label formatting and target resolution helpers
│       ├── components/
│       │   ├── AnatomyDetailsPanel.tsx # External selection details consumer
│       │   ├── AnatomyStage.tsx       # Client interaction controller (event delegation, path lookup, direct DOM diffing)
│       │   ├── AnatomyToolbar.tsx     # Client granularity toggle and selection indicator
│       │   ├── AnteriorSvg.tsx        # Server-rendered front-body SVG artwork with data-muscle-id attributes
│       │   ├── BodyViewer.tsx         # Server Component composing toolbar, stage, and SVG views
│       │   └── PosteriorSvg.tsx       # Server-rendered back-body SVG artwork with data-muscle-id attributes
│       └── constants/
│           └── muscles.ts             # Canonical muscle catalog and derived group lookups
├── hooks/
│   ├── useTheme.ts                    # Hook consuming ThemeContext
│   └── useToggle.ts                   # Domain-neutral boolean toggle utility hook
├── lib/
│   ├── cn.ts                          # clsx and tailwind-merge helper
│   ├── storage.ts                     # Safe browser localStorage wrapper
│   └── theme/                         # Color mode, color scheme, transitions, and meta-color sync
└── styles/
    ├── globals.css                    # Tailwind v4 import, Ark UI styling, squircle rules, anatomy CSS, goey-toast styles
    ├── ark-ui.css                     # Headless Ark UI style definitions
    └── theme-palettes.css             # Semantic OKLCH CSS tokens and anatomy variables for all 5 themes
```

## Routes and layouts

| Route | Layout               | Purpose                                    | Main feature                       |
| ----- | -------------------- | ------------------------------------------ | ---------------------------------- |
| `/`   | `src/app/layout.tsx` | Main anatomy workspace & muscle inspection | `anatomy` (`src/features/anatomy`) |

## Features

| Feature   | Client location         | Server location   | Public entry point              | Notes                                                                                 |
| --------- | ----------------------- | ----------------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| `anatomy` | `src/features/anatomy/` | N/A (client-side) | `src/features/anatomy/index.ts` | Server-rendered SVGs with delegated client class diffing and Zustand global selection |

## Data flow

1. **Static Rendering & Anti-Flash**: `RootLayout` (`src/app/layout.tsx`) renders the HTML shell, `<meta name="color-scheme" content="light dark" />`, and `ThemeScript` in `<head>`.
2. **Theme Synchronization**: `ThemeProvider` initializes theme state via `useSyncExternalStore` against `localStorage` and system media queries. Updates trigger document View Transitions when motion is enabled.
3. **Zero-Render Anatomy Interaction**: `BodyViewer` renders static `AnteriorSvg` and `PosteriorSvg` on the server so the 600KB+ SVG geometry stays out of the client JS bundle. `AnatomyStage` caches `[data-muscle-id]` elements once on mount, subscribes directly to Zustand in `useEffect`, and updates `.is-preview`, `.is-selected`, and `.is-pointer-source` classes directly on the DOM with zero React re-renders.

## Icons

- **Semantic Mapping:** Defined in `src/constants/icons.ts`.
- **Component:** `src/components/ui/Icon.tsx` renders icons using `@iconify/react` backed by `IconSet`.
- Arbitrary inline icon string literals are prohibited across components.

## Toasts

- **Default Library:** `goey-toast`.
- **Mount Point:** `<ToastProvider />` mounted in `src/app/layout.tsx`.
- **Stylesheet:** `goey-toast/styles.css` imported in `src/styles/globals.css`.

## Documentation links

| Document                | Purpose                         |
| ----------------------- | ------------------------------- |
| `AGENTS.md`             | Stable project-wide agent rules |
| `docs/AGENT-CONTEXT.md` | Agent starting guide            |
| `docs/AGENT-TOOLS.md`   | Agent tool and skill references |
| `docs/decisions/`       | Architecture Decision Records   |
| `CHANGELOG.md`          | Notable changes                 |
