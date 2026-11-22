# Project Map

> Starter template. Replace the prompts below with facts about this project. Do not leave guessed examples in the completed map. Update this file when routes, features, data flow, or folder structure change in a meaningful way.

## Overview

- **Project purpose:** TODO
- **Framework and runtime:** TODO
- **Package manager:** TODO
- **Database and ORM:** TODO
- **Authentication:** TODO or not used
- **Deployment provider:** Chosen by the user. Record the choice when known.

## Top-level structure

Describe only folders that exist in this repository and explain their role.

```text
TODO: Add the real project tree for important folders.
```

## Routes and layouts

| Route or route group | Layout | Purpose | Main feature |
| --- | --- | --- | --- |
| TODO | TODO | TODO | TODO |

Include important Route Handler paths and their HTTP methods where relevant.

## Features

| Feature | Client location | Server location | Public entry point | Notes |
| --- | --- | --- | --- | --- |
| TODO | `src/features/...` | `src/server/features/...` | TODO | TODO |

Document feature dependencies and public APIs. Do not list every implementation file.

## Server modules

Describe the important server services, database access, authentication, integrations, storage, jobs, and error handling modules.

| Module | Location | Responsibility | Used by |
| --- | --- | --- | --- |
| TODO | TODO | TODO | TODO |

## Data flow

Describe the main paths through the application. For example, explain when a page reads data in a Server Component, when a client component uses TanStack Query and Axios, and when a mutation uses a Server Action or Route Handler.

TODO

## Database

- **ORM:** TODO, selected by the user
- **Schema location:** TODO
- **Migration location:** TODO
- **Important tables or models:** TODO
- **Data ownership and relationships:** TODO

## Authentication and authorization

Describe the auth provider, session flow, role or permission model, and where server-side checks run.

TODO or not used

## External integrations and storage

| Provider or service | Client setup | Feature usage | Secrets or configuration |
| --- | --- | --- | --- |
| TODO | TODO | TODO | Variable names only. Never record secret values. |

## API and Bruno

- **Response contract:** `src/types/api.ts`
- **Response helpers and error mapping:** `src/server/api/`
- **Bruno collection:** `bruno/`
- **Environment names:** TODO
- **Important endpoints:** TODO

Describe any external API consumers or special endpoint contracts.

## State and background work

Describe important explicit state machines, Zustand stores, TanStack Query usage, and background job flows. Include state names and transition owners for important workflows.

TODO or not used

## Environment and configuration

List environment variable names and their purpose only. Do not include values, credentials, or secrets.

| Variable | Server or client | Required in | Purpose |
| --- | --- | --- | --- |
| TODO | TODO | TODO | TODO |

## Important conventions and exceptions

Record project-specific choices that differ from the root `AGENTS.md`. Link to the relevant nested `AGENTS.md` or ADR rather than copying lengthy instructions.

TODO or none

## Documentation links

| Document | Purpose |
| --- | --- |
| `AGENTS.md` | Stable project-wide agent rules |
| `docs/AGENT-CONTEXT.md` | Agent starting guide |
| `docs/decisions/` | Architecture Decision Records |
| `CHANGELOG.md` | Notable changes |

## Maintenance rule

Update this map when a meaningful architecture or folder change alters how an agent should locate or understand the project. Do not update it for routine edits, formatting, or small implementation changes.
