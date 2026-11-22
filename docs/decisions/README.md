# Architecture Decision Records

Store major, durable architecture decisions in this folder. An ADR explains why the project chose an approach so future work does not reopen the same question without new information.

## When to write an ADR

Write an ADR for decisions with lasting impact, such as:

- ORM or database architecture.
- Authentication and authorization design.
- Major data flow or state management architecture.
- Storage, background job, or external integration architecture.
- Major folder or feature boundary changes.
- Significant framework or infrastructure choices.

Do not write an ADR for routine implementation details, small refactors, or every dependency update.

## Workflow

1. Identify the decision and the problem it solves.
2. List viable options and their trade-offs.
3. Recommend an option with reasons.
4. Obtain the user's approval when the decision is a major choice reserved for them.
5. Record the accepted decision using `0000-template.md`.
6. Link related ADRs when a later decision changes or supersedes an earlier one.

Use sequential filenames such as `0001-use-drizzle.md` and `0002-authentication-approach.md`. Do not edit an accepted ADR to hide its history. Add a new ADR that supersedes it when the decision changes.

## Status values

Use one of `Proposed`, `Accepted`, `Rejected`, `Deprecated`, or `Superseded`.
