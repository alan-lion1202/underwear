# Codex Workflow

## Purpose

This document defines how ChatGPT, Codex, GitHub, research, and code review should work together.

## Table of Contents

- [ChatGPT Responsibilities](#chatgpt-responsibilities)
- [Codex Responsibilities](#codex-responsibilities)
- [GitHub Workflow](#github-workflow)
- [Research Workflow](#research-workflow)
- [Code Review Workflow](#code-review-workflow)
- [Branch Strategy](#branch-strategy)
- [Prompt Conventions](#prompt-conventions)
- [Future Expansion](#future-expansion)

## ChatGPT Responsibilities

- Review product direction.
- Check business logic.
- Evaluate data quality.
- Help define strategy and requirements.

## Codex Responsibilities

- Modify code and documentation.
- Maintain project structure.
- Run build checks.
- Sync approved changes to GitHub.

## GitHub Workflow

- Keep GitHub as the deployable source.
- Commit meaningful project changes.
- Avoid committing generated folders such as `.next`, `node_modules`, and `outputs`.

## Research Workflow

- Use public sources only.
- Track source URLs.
- Mark unverifiable fields as `Unknown`.
- Separate research scope from development priority.

## Code Review Workflow

- Prioritize bugs, build failures, data integrity risks, and UI regressions.
- Verify with `pnpm build` when code changes.

## Branch Strategy

Current early-stage workflow may use `main` directly. Future production workflow should use feature branches and pull requests.

## Prompt Conventions

- State whether the task is code, docs, research, or review.
- State whether web research is allowed.
- State whether GitHub sync is required.

## Future Expansion

- Add release checklist.
- Add Vercel deployment workflow.
- Add issue templates.
