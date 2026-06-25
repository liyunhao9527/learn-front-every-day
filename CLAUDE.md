# Code Atlas

面向完整软件技术栈的学习与实战 monorepo，主站使用 Astro + React + MDX + Tailwind CSS + Ant Design 渲染笔记内容。

## Agent 文档同步

本仓库同时维护 `AGENTS.md` 和 `CLAUDE.md`。

如果更新其中一个文件里的项目约定、内容结构、常用命令、架构说明或 agent 工作规则，必须在同一次改动中同步更新另一个文件。

## 技术栈

- **主站**：Astro 6 + React 19 + MDX + Tailwind CSS 4 + Ant Design
- **包管理**：pnpm 11 + Turborepo
- **语言**：TypeScript 5
- **Node**：>= 20.19.0

## 目录结构

```
.
├── apps/notes          # Astro 笔记站（包含内容与 demo）
│   └── content/        # 所有笔记正文、文章 demo 和示例代码
│       ├── javascript/
│       ├── react/
│       └── typescript/
└── packages/shared     # 共享类型和工具
```

**原则**：
- `apps/notes/content/` 是真正的内容仓库，和渲染它的 notes app 放在同一个依赖边界内
- 产品命名不绑定框架：`apps/notes` 而非 `apps/astro`
- 内容优先：笔记正文不再写进 TypeScript 对象
- TypeScript 栏目首页由 `apps/notes/content/typescript/learning-roadmap.ts` 驱动；调整学习路线、阶段顺序、推荐主题或 demo 想法时优先更新这个文件

## 内容组织

### 目录层级

```
apps/notes/content
├── javascript
│   ├── basics
│   └── browser
├── react
│   ├── basics
│   ├── advanced
│   └── architecture
└── typescript
    ├── basics
    └── advanced
```

### 文件组织

- **纯笔记**：`apps/notes/content/{domain}/{group}/file.mdx`
- **带交互 demo 的笔记**：`apps/notes/content/{domain}/{group}/topic/` 一个知识点一个目录
- 新增带 demo 的知识点时，默认使用 `note.mdx`、`demo.tsx`、`examples.ts` 三个文件

示例：

```
apps/notes/content/typescript/basics/literal-types/
  note.mdx      # 笔记正文和 demo 引入
  demo.tsx      # 交互组件
  examples.ts   # 类型、示例数据、可复用示例代码
```

学习主题遵循这个闭环：

```
概念笔记 -> 纯 TypeScript 示例 -> 交互 demo -> 复盘总结
```

三个文件的职责：

- `note.mdx`：解释概念、总结取舍、记录复盘问题
- `examples.ts`：写纯 TypeScript 练习代码、类型、工具函数、示例数据和可复用示例
- `demo.tsx`：把示例变成交互 React demo；需要时从 `examples.ts` 引入类型、数据和工具函数

### MDX Frontmatter 规范

每篇笔记必须包含：

```yaml
---
title: 标题
summary: 一句话描述这篇文章讲什么
domain: javascript | react | typescript
domainLabel: 显示用的领域名（如 JavaScript）
group: 分组标识（如 basics）
groupLabel: 显示用的分组名（如 JavaScript 基础）
order: 数字，决定排序
---
```

### 交互 Demo

- 文章专属 demo 放在**同一目录**，由 MDX 相对引用
- demo 文件统一命名为 `demo.tsx`，组件名仍使用 PascalCase，如 `LiteralTypesDemo`
- 示例类型、固定选项、示例数据优先放在 `examples.ts`
- React 组件使用 `client:load` 指令在 Astro 中激活交互
- 交互控件和常见展示面优先使用 Ant Design 组件，如 `Button`、`Space`、`Segmented`、`Input`、`InputNumber`、`Select`、`Checkbox`、`Card`、`Descriptions`、`Statistic`、`Alert`、`List`
- Tailwind utility class 用于少量布局调整；只有 Ant Design 样式无法正常覆盖时才使用 `!` utility

```mdx
import { LiteralTypesDemo } from './demo'

<LiteralTypesDemo client:load />
```

## 编码约定

- 使用 TypeScript，`strict` 模式
- 内容 demo 文件：`demo.tsx`
- React 组件名：PascalCase（如 `LiteralTypesDemo`）
- 工具/类型文件：camelCase
- 根 `tsconfig.json` 继承 `tsconfig.base.json`，并补充 notes content 需要的 JSX、DOM 类型和路径别名
- notes app 跨目录导入优先使用带 app 命名空间的路径别名：`@notes/*` 指向 `apps/notes/src/*`，`@notes-content/*` 指向 `apps/notes/content/*`，`@notes-public/*` 指向 `apps/notes/public/*`
- 同目录内容继续用相对路径，如 `./examples`、`./demo`

## 样式约定

- 项目支持 Tailwind CSS、Sass 和 Ant Design
- 全站通用样式放在 `apps/notes/src/styles/global.css`
- 全局 demo CSS 保持精简，只放共享文章 demo 外壳和标签样式，如 `demo-card`、`demo-eyebrow`、`demo-label`
- 按钮、输入框、分段选择、列表、日志、输出面板等常见 UI 不新增一-off 全局类，优先用 Ant Design 组件表达
- 页面专属且原生 CSS 写起来过长的样式，优先使用 Astro scoped style：

```astro
<style lang="scss">
  .page-block {
    &__item {
      color: var(--text);
    }
  }
</style>
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动 notes 站
pnpm dev:notes        # 同上
pnpm dev:all          # 全量开发模式

# 构建与检查
pnpm build            # 全量构建
pnpm build:notes      # 仅构建 notes
pnpm lint             # ESLint
pnpm typecheck        # TypeScript 检查
```

## 架构原则

1. **就近组织**：文章专属 demo 和文章放在同一目录，避免跨目录引用
2. **允许"笔记 + demo"共存**：每篇文章既能写说明，也能挂交互组件
3. **内容驱动**：新增技术领域时，先在 `apps/notes/content/` 创建目录结构，再调整站点的导航/路由
4. **monorepo 轻量**：只有必要时才拆包，demo 组件优先放在 content 目录而非 packages
