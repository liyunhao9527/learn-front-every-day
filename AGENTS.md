# Agent Instructions

This project also has `CLAUDE.md`. Keep `AGENTS.md` and `CLAUDE.md` synchronized when changing project conventions, content structure, commands, architecture notes, or agent-facing instructions.

If you update one of these files with a rule that affects how agents should work in this repository, update the other file in the same change.

## Project

Code Atlas is a learning and practice monorepo for notes, examples, and real projects across the software stack. The notes app uses Astro + React + MDX + Tailwind CSS + Ant Design to render content from `apps/notes/content/`.

## Content Structure

`apps/notes/content/` is the source of truth for learning content. Keep note content, article-specific demos, and example files inside the notes app so they resolve the same app dependencies.

The TypeScript module homepage is driven by `apps/notes/content/typescript/learning-roadmap.ts`. Update that file when changing the TypeScript learning path, stage order, recommended topics, or demo ideas.

Use this structure for notes with interactive demos:

```text
apps/notes/content/{domain}/{group}/{topic}/
  note.mdx
  demo.tsx
  examples.ts
```

- `note.mdx`: note body, frontmatter, and demo import
- `demo.tsx`: interactive React component
- `examples.ts`: types, fixed options, sample data, and reusable example code

For learning topics, keep this loop clear:

```text
concept notes -> pure TypeScript examples -> interactive demo -> review notes
```

Use each file this way:

- `note.mdx`: explain the concept, summarize tradeoffs, and record review questions
- `examples.ts`: write pure TypeScript practice code, types, helpers, sample data, and reusable examples
- `demo.tsx`: turn examples into an interactive React demo; import types/data/helpers from `examples.ts` when useful

Example:

```text
apps/notes/content/typescript/basics/literal-types/
  note.mdx
  demo.tsx
  examples.ts
```

MDX imports demo components from `./demo`:

```mdx
import { LiteralTypesDemo } from './demo'

<LiteralTypesDemo client:load />
```

The demo file is named `demo.tsx`, but the exported React component still uses PascalCase, such as `LiteralTypesDemo`.

Pure notes without demos may use:

```text
apps/notes/content/{domain}/{group}/file.mdx
```

## Frontmatter

Every note must include:

```yaml
---
title: 标题
summary: 一句话描述这篇文章讲什么
domain: javascript | react | typescript
domainLabel: 显示用的领域名（如 TypeScript）
group: 分组标识（如 basics）
groupLabel: 显示用的分组名（如 TypeScript 基础）
order: 数字，决定排序
---
```

## Commands

```bash
pnpm dev
pnpm dev:notes
pnpm build:notes
pnpm lint
pnpm typecheck
```

Run `pnpm build:notes` after changing notes, demos, or content routing.

## Styling

The notes app supports Tailwind CSS, Sass, and Ant Design. Keep shared site styles in `apps/notes/src/styles/global.css`.

For interactive React demos, prefer Ant Design components for common controls and display surfaces, such as `Button`, `Space`, `Segmented`, `Input`, `InputNumber`, `Select`, `Checkbox`, `Card`, `Descriptions`, `Statistic`, `Alert`, and `List`. Use Tailwind utility classes for small layout adjustments, and use `!` utilities only when Ant Design styles cannot otherwise be overridden.

Keep global demo CSS minimal. Use it for shared article-demo wrappers and labels, such as `demo-card`, `demo-eyebrow`, and `demo-label`; avoid adding one-off global classes for buttons, inputs, logs, or output panels when an Ant Design component can express the UI.

For page-specific styles that are too verbose in plain CSS, prefer Astro scoped styles with Sass:

```astro
<style lang="scss">
  .page-block {
    &__item {
      color: var(--text);
    }
  }
</style>
```

## Path Aliases

In the notes app, prefer app-namespaced path aliases over long cross-directory relative imports:

- `@notes/*` -> `apps/notes/src/*`
- `@notes-content/*` -> `apps/notes/content/*`
- `@notes-public/*` -> `apps/notes/public/*`

Keep local same-folder imports as relative paths, such as `./examples` and `./demo`.
