# Agent Context Guide

This file is the short entry point for coding agents. Read the root `AGENTS.md` first. Then use this guide to find the project information relevant to the current task.

## Required startup order

1. Read [`../AGENTS.md`](../AGENTS.md) for stable project-wide rules.
2. Read this guide.
3. Read [`PROJECT-MAP.md`](PROJECT-MAP.md) and find the routes, features, server modules, and integrations related to the task.
4. Read only the relevant source files and any applicable nested `AGENTS.md` files.

Do not scan the whole repository unless the task requires it or the needed context cannot be found through this process.

## Documentation index

| Document                                                   | Purpose                                                | When to read                                           |
| ---------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| [`../AGENTS.md`](../AGENTS.md)                             | Project-wide rules and working conventions             | Every task                                             |
| [`PROJECT-MAP.md`](PROJECT-MAP.md)                         | Actual project structure and how major modules connect | Every task, focusing on relevant areas                 |
| [`decisions/README.md`](decisions/README.md)               | Architecture Decision Record rules                     | When making or changing a major architectural decision |
| [`decisions/0000-template.md`](decisions/0000-template.md) | ADR template                                           | When recording a major decision                        |
| [`AGENT-TOOLS.md`](AGENT-TOOLS.md)                         | Installed agent skill and MCP references               | When using the related library or tool                 |
| [`../CHANGELOG.md`](../CHANGELOG.md)                       | Notable user-facing changes and fixes                  | When a task causes a notable change                    |

## Architecture reminders

- The app uses the Next.js App Router unless the user chooses otherwise.
- Server Components come first. Keep `use client` at the lowest component level that needs it.
- Keep routes and Route Handlers thin. Put business logic under `src/server/` or the owning feature.
- Do not create a `shared/` folder. Use conventional top-level folders such as `src/components/`, `src/hooks/`, `src/lib/`, and `src/types/` for domain-neutral code.
- Start feature folders flat. Add subfolders only when they improve clarity. Use sibling features for up to three subdomains; nest under a parent when there are more than three.
- Keep an `index.ts` only when a deliberate public entry point is useful. Do not create barrel files everywhere.
- The user chooses the ORM, authentication library, and deployment provider.
- For Prisma, keep schema and migrations in root `prisma/`. For Drizzle, keep schema and migration files in `src/server/db/`.
- Use the central API response contract in `src/types/api.ts` and the helpers in `src/server/api/`. A 204 response must have an empty body.
- Use Axios for browser HTTP requests, configured in `src/config/http.ts`. Use TanStack Query for client-side server state. Use server access from Server Components instead of calling the same app's API unnecessarily.
- Throw typed errors inside server logic. Route Handlers map errors through `handleRouteError`. Server Actions return typed UI-boundary results for expected domain errors.
- Fix implicit state machines with explicit states, valid transitions, and discriminated unions where appropriate.
- Functional testing is manual. Run and report ESLint, TypeScript, and production build checks when applicable.

## Important files to locate

Update this list as the project takes shape.

| Area                                | Project file or folder     | Notes                                                  |
| ----------------------------------- | -------------------------- | ------------------------------------------------------ |
| App configuration                   | `src/config/`              | App-specific settings and validated environment access |
| Browser HTTP client                 | `src/config/http.ts`       | Shared Axios instance                                  |
| Icon map                            | `src/constants/icons.ts`   | Semantic keys mapped to Iconify identifiers            |
| API response types                  | `src/types/api.ts`         | Source of truth for `ApiResponse<T>`                   |
| API helpers and route error mapping | `src/server/api/`          | Response helpers and `handleRouteError`                |
| Domain error classes                | `src/server/errors/`       | Typed errors thrown by server logic                    |
| Server authentication               | `src/server/auth/`         | Auth library integration and server checks             |
| Server integrations                 | `src/server/integrations/` | Provider clients and SDK setup                         |
| Storage                             | `src/server/storage/`      | Storage abstraction and provider implementations       |
| Feature UI                          | `src/features/`            | Feature-owned UI and client logic                      |
| Feature server logic                | `src/server/features/`     | Feature-owned business logic                           |
| Global styles and tokens            | `src/styles/`              | Global styles, design tokens, themes, vendor overrides |
| Bruno collection                    | `bruno/`                   | Manual API requests grouped by feature                 |
| Database                            | User-selected location     | `prisma/` for Prisma or `src/server/db/` for Drizzle   |

Remove or amend rows that do not apply to the actual project. Do not create these files or folders solely to satisfy this table.

## Decisions that belong to the user

Ask the user rather than guessing when the choice is not already recorded for the project.

- ORM choice, Prisma or Drizzle.
- Authentication library.
- Deployment and hosting provider.
- Product-specific design direction.
- Any major architectural choice with meaningful trade-offs.

## Update discipline

- Update `PROJECT-MAP.md` after meaningful changes to routes, features, folder structure, data flow, or integrations.
- Add an ADR for a major, durable architecture decision.
- Update `CHANGELOG.md` for notable user-facing changes, meaningful fixes, and breaking changes.
- Keep this guide short. Link to detailed rules instead of copying the entire root `AGENTS.md`.
