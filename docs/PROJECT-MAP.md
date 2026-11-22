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
│       ├── AppleStyleDock.tsx         # Bottom dock launcher with icon magnification
│       ├── Dock.tsx                   # Motion-driven macOS style dock primitive
│       ├── Icon.tsx                   # Semantic Iconify wrapper component
│       └── ThemeToggler.tsx           # Accessible animated mode toggle (Light/Dark/System)
├── constants/
│   └── icons.ts                       # Central semantic icon map to Iconify identifiers
├── features/
│   └── anatomy/                       # Feature module for interactive muscle atlas
│       ├── index.ts                   # Public entry point exporting BodyViewer
│       ├── components/
│       │   ├── AnteriorSvg.tsx        # Front-body interactive SVG model
│       │   ├── PosteriorSvg.tsx       # Back-body interactive SVG model
│       │   └── BodyViewer.tsx         # Combined viewer with basic/advanced split toggle
│       ├── constants/
│       │   ├── excluded.ts            # Non-muscle SVG path IDs (bones, joints, outlines)
│       │   ├── muscleLookup.ts        # Muscle-to-group and ID-to-muscle lookup dictionaries
│       │   ├── musclesAnterior.ts     # Anterior muscle definitions and movement groups
│       │   └── musclesPosterior.ts    # Posterior muscle definitions and movement groups
│       ├── hooks/
│       │   └── useMuscleHighlight.ts  # Targeted DOM diffing for high-performance SVG highlight updates
│       └── types/
│           └── anatomyColors.ts       # SVG color palette tokens and overrides
├── hooks/
│   ├── useTheme.ts                    # Hook consuming ThemeContext
│   └── useToggle.ts                   # Domain-neutral boolean toggle utility hook
├── lib/
│   ├── cn.ts                          # clsx and tailwind-merge helper
│   ├── storage.ts                     # Safe browser localStorage wrapper
│   └── theme/                         # Color mode, color scheme, transitions, and meta-color sync
└── styles/
    ├── globals.css                    # Tailwind v4 import, Ark UI styling, theme palettes, and goey-toast styles
    ├── ark-ui.css                     # Headless Ark UI style definitions
    └── theme-palettes.css             # Semantic CSS tokens and theme variables
```

## Routes and layouts

| Route | Layout | Purpose | Main feature |
| --- | --- | --- | --- |
| `/` | `src/app/layout.tsx` | Main anatomy workspace & muscle inspection | `anatomy` (`src/features/anatomy`) |

## Features

| Feature | Client location | Server location | Public entry point | Notes |
| --- | --- | --- | --- | --- |
| `anatomy` | `src/features/anatomy/` | N/A (client-side) | `src/features/anatomy/index.ts` | Front and back body SVG models, hover detection, basic/advanced group filtering |

## Data flow

1. **Static Rendering & Anti-Flash**: `RootLayout` (`src/app/layout.tsx`) renders the HTML shell and injects `ThemeScript` in `<head>`. This prevents theme flash by applying `.dark` and `data-theme` before React mounts.
2. **Theme Synchronization**: `ThemeProvider` initializes theme state via `useSyncExternalStore` against `localStorage` and system media queries. Updates trigger document View Transitions when motion is enabled.
3. **Muscle Highlight Interaction**: `BodyViewer` manages hover state and granularity. `useMuscleHighlight` diffs modified SVG element IDs directly in the DOM, avoiding complete SVG re-renders of the large 500KB+ paths.
4. **Dock Animation**: `AppleStyleDock` uses `motion/react` spring physics to scale icons based on mouse cursor proximity.

## Icons

- **Semantic Mapping:** Defined in `src/constants/icons.ts`.
- **Component:** `src/components/ui/Icon.tsx` renders icons using `@iconify/react` backed by `IconSet`.
- Arbitrary inline icon string literals are prohibited across components.

## Toasts

- **Default Library:** `goey-toast`.
- **Mount Point:** `<ToastProvider />` mounted in `src/app/layout.tsx`.
- **Stylesheet:** `goey-toast/styles.css` imported in `src/styles/globals.css`.

## Documentation links

| Document | Purpose |
| --- | --- |
| `AGENTS.md` | Stable project-wide agent rules |
| `docs/AGENT-CONTEXT.md` | Agent starting guide |
| `docs/AGENT-TOOLS.md` | Agent tool and skill references |
| `docs/decisions/` | Architecture Decision Records |
| `CHANGELOG.md` | Notable changes |
