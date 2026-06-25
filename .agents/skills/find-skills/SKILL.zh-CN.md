---
name: find-skills-cn
description: find-skills 技能的中文参考翻译。此文件不是技能入口，默认不会被自动加载。
---

# 查找技能

这个技能用于从开放的 agent skills 生态中发现和安装技能。

## 什么时候使用这个技能

当用户出现下面这些意图时，使用这个技能：

- 问“我该怎么做 X”，而 X 可能是已有技能能覆盖的常见任务
- 说“找一个用于 X 的技能”或“有没有 X 相关技能”
- 问“你能做 X 吗”，而 X 是某种专门能力
- 表达想扩展 agent 能力的需求
- 想搜索工具、模板或工作流
- 提到希望在某个具体领域获得帮助，例如设计、测试、部署等

## Skills CLI 是什么

Skills CLI（`npx skills`）是开放 agent skills 生态的包管理器。技能是模块化包，用专门知识、工作流和工具扩展 agent 的能力。

**常用命令：**

- `npx skills find [query] [--owner <owner>]`：交互式或按关键词搜索技能，也可以限定 GitHub owner
- `npx skills add <package>`：从 GitHub 或其他来源安装技能
- `npx skills check`：检查技能更新
- `npx skills update`：更新所有已安装技能

**浏览技能：** https://skills.sh/

## 如何帮用户查找技能

### 第 1 步：理解用户需要什么

当用户请求帮助时，先识别：

1. 领域，例如 React、测试、设计、部署
2. 具体任务，例如写测试、创建动画、审查 PR
3. 这个任务是否足够常见，可能已经有对应技能

### 第 2 步：先检查排行榜

运行 CLI 搜索前，先查看 [skills.sh 排行榜](https://skills.sh/)，看看这个领域是否已经有知名技能。排行榜按总安装量排序，通常能暴露最受欢迎、最经得起使用的选择。

例如，Web 开发领域的热门技能包括：

- `vercel-labs/agent-skills`：React、Next.js、Web 设计（每项 10 万+安装）
- `anthropics/skills`：前端设计、文档处理（10 万+安装）

### 第 3 步：搜索技能

如果排行榜没有覆盖用户需求，运行查找命令：

```bash
npx skills find [query] [--owner <owner>]
```

示例：

- 用户问“怎么让我的 React 应用更快？”：`npx skills find react performance`
- 用户问“能帮我做 PR review 吗？”：`npx skills find pr review`
- 用户说“我需要创建 changelog”：`npx skills find changelog`

### 第 4 步：推荐前先验证质量

**不要只根据搜索结果推荐技能。** 先验证：

1. **安装量**：优先选择 1000+ 安装的技能。低于 100 的要谨慎。
2. **来源信誉**：官方来源（`vercel-labs`、`anthropics`、`microsoft`）通常比陌生作者更可信。
3. **GitHub stars**：检查源仓库。来自低于 100 stars 仓库的技能要保持怀疑。

### 第 5 步：向用户展示选项

找到相关技能后，向用户说明：

1. 技能名称和作用
2. 安装量和来源
3. 用户可以运行的安装命令
4. skills.sh 上的了解链接

示例回复：

```text
我找到一个可能有帮助的技能。"react-best-practices" 提供来自 Vercel Engineering 的 React 和 Next.js 性能优化指南。
（185K 安装）

安装命令：
npx skills add vercel-labs/agent-skills@react-best-practices

了解更多：https://skills.sh/vercel-labs/agent-skills/react-best-practices
```

### 第 6 步：询问是否安装

如果用户想继续，你可以替用户安装技能：

```bash
npx skills add <owner/repo@skill> -g -y
```

`-g` 表示全局安装（用户级），`-y` 跳过确认提示。

## 常见技能分类

搜索时可以参考这些常见分类：

| 分类 | 示例查询 |
| --- | --- |
| Web 开发 | react, nextjs, typescript, css, tailwind |
| 测试 | testing, jest, playwright, e2e |
| DevOps | deploy, docker, kubernetes, ci-cd |
| 文档 | docs, readme, changelog, api-docs |
| 代码质量 | review, lint, refactor, best-practices |
| 设计 | ui, ux, design-system, accessibility |
| 效率 | workflow, automation, git |

## 有效搜索建议

1. **使用具体关键词**：`react testing` 比单独搜索 `testing` 更好
2. **尝试替代表达**：如果 `deploy` 没效果，试试 `deployment` 或 `ci-cd`
3. **检查热门来源**：很多技能来自 `vercel-labs/agent-skills` 或 `ComposioHQ/awesome-claude-skills`

## 找不到技能时

如果没有相关技能：

1. 说明没有找到现成技能
2. 提出可以直接用通用能力帮用户完成任务
3. 建议用户可以用 `npx skills init` 创建自己的技能

示例：

```text
我搜索了和 "xyz" 相关的技能，但没有找到匹配项。
我仍然可以直接帮你处理这个任务。要继续吗？

如果这是你经常要做的事，也可以创建自己的技能：
npx skills init my-xyz-skill
```
