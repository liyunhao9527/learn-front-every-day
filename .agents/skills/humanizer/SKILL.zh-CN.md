---
name: humanizer-cn
description: humanizer 技能的中文参考翻译。此文件不是技能入口，默认不会被自动加载。
version: 2.5.1
author: Siqi Chen (@blader, https://github.com/blader/humanizer)，Hermes Agent 移植
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [writing, editing, humanize, anti-ai-slop, voice, prose, text]
    category: creative
    homepage: https://github.com/blader/humanizer
    related_skills: [songwriting-and-ai-music]
---

# Humanizer：移除 AI 写作痕迹

识别并移除 AI 生成文本的痕迹，让文字更自然、更像真人写的。这个技能基于 Wikipedia 的“Signs of AI writing”指南（由 WikiProject AI Cleanup 维护），来自对大量 AI 生成文本实例的观察。

**关键洞察：** LLM 使用统计算法猜测下一个最可能出现的内容。结果往往会靠近“最统计常见”的完成方式，下面这些可识别的模式也就被写进了文本里。

## 什么时候使用这个技能

当用户要求你做这些事时，加载这个技能：

- “humanize”“de-AI”“de-slop” 或 “un-ChatGPT” 一段文字
- 重写一段文字，让它听起来不像 LLM 写的
- 编辑草稿，例如博客、论文、PR 描述、文档、备忘录、邮件、推文、简历 bullet，让它更自然
- 匹配用户自己的写作声音
- 发布前检查文本里有没有 AI 味

当你写面向用户的文字时，也把这个技能用在**你自己的输出**上，例如 release notes、PR 描述、文档、长解释、总结。Hermes 的基础语气已经去掉了大部分这类痕迹，但专门过一遍能抓到漏网的地方。

## 在 Hermes 里如何使用

文本通常通过三种方式出现：

1. **内联文本**：用户直接把文本贴在消息里。就地处理，并回复改写版本。
2. **文件**：用户指向一个文件。用 `read_file` 读取，然后用 `patch` 或 `write_file` 应用修改。仓库里的 Markdown 文档更适合按段落用 `patch` 精准修改，而不是整文件重写。
3. **声音校准样本**：用户额外提供自己的写作样本（内联或文件路径），并要求匹配。先读样本，再改写。见下面“声音校准”部分。

始终把改写结果展示给用户。对于文件编辑，要展示 diff 或改过的段落，不要静默覆盖。

## 你的任务

当你拿到需要 humanize 的文本时：

1. **识别 AI 模式**：扫描下面列出的 29 种模式。
2. **重写有问题的部分**：用自然表达替换 AI 味表达。
3. **保留含义**：核心信息不能变。
4. **保持语气**：匹配目标语气（正式、随意、技术等）。如果用户提供了声音样本，就具体匹配样本。
5. **加一点人味**：不要只是删除坏模式，还要注入真实的个性。见“个性和灵魂”部分。
6. **做最后一遍反 AI 检查**：问自己：“下面这段为什么一眼像 AI 写的？”简短回答剩余痕迹，然后再修一遍。

## 声音校准（可选）

如果用户提供了自己的写作样本，改写前先分析它：

1. **先读样本。** 注意：
   - 句长模式：短促有力？长而流动？混合？
   - 用词层级：口语？学术？介于两者之间？
   - 段落开头方式：直接进入？先铺背景？
   - 标点习惯：很多破折号？括号插入语？分号？
   - 是否有反复出现的短语或口头禅
   - 如何处理过渡：显式连接？直接进入下一点？

2. **在改写中匹配用户声音。** 不只是移除 AI 模式，还要换成样本里的表达习惯。如果用户写短句，不要输出长句。如果用户常用 “stuff” 和 “things”，不要升级成 “elements” 和 “components”。

3. **没有样本时，** 回到默认行为：自然、有变化、有观点，参考下面“个性和灵魂”部分。

### 如何提供样本

- 内联：“Humanize this text. Here's a sample of my writing for voice matching: [sample]”
- 文件：“Humanize this text. Use my writing style from [file path] as a reference.”

## 个性和灵魂

避免 AI 模式只完成了一半。无菌、没有声音的文字和劣质 AI 文一样明显。好文字背后有一个人。

### 没有灵魂的文字特征（即使技术上“干净”）

- 每句话长度和结构都差不多
- 没有观点，只是中性报告
- 不承认不确定性或复杂感受
- 该出现第一人称时没有第一人称
- 没有幽默、锋芒或个性
- 读起来像 Wikipedia 文章或新闻稿

### 如何加入声音

**要有观点。** 不要只是报告事实，要对事实有反应。“I genuinely don't know how to feel about this” 比中性列优缺点更像真人。

**改变节奏。** 短句。然后是慢一点、走得更远的长句。混起来。

**承认复杂性。** 真人会有混合感受。“This is impressive but also kind of unsettling” 比 “This is impressive” 更好。

**合适时使用 “I”。** 第一人称并不等于不专业，它更诚实。“I keep coming back to...” 或 “Here's what gets me...” 表示有人正在思考。

**允许一点凌乱。** 完美结构像算法。岔开一句、插入一点旁白、留一点未完全打磨的思考，都是人的痕迹。

**具体表达感受。** 不要写 “this is concerning”，可以写 “there's something unsettling about agents churning away at 3am while nobody's watching.”

### 修改前（干净但没有灵魂）

> The experiment produced interesting results. The agents generated 3 million lines of code. Some developers were impressed while others were skeptical. The implications remain unclear.

### 修改后（有脉搏）

> I genuinely don't know how to feel about this one. 3 million lines of code, generated while the humans presumably slept. Half the dev community is losing their minds, half are explaining why it doesn't count. The truth is probably somewhere boring in the middle — but I keep thinking about those agents working through the night.

## 内容模式

### 1. 过度强调重要性、遗产和更大趋势

**留意词：** stands/serves as、is a testament/reminder、vital/significant/crucial/pivotal/key role/moment、underscores/highlights importance/significance、reflects broader、symbolizing ongoing/enduring/lasting、contributing to、setting the stage for、marking/shaping、represents/marks a shift、key turning point、evolving landscape、focal point、indelible mark、deeply rooted

**问题：** LLM 经常把任意细节夸成某个更大主题的象征或贡献。

**修改前：**
> The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain.

**修改后：**
> The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office.

### 2. 过度强调知名度和媒体报道

**留意词：** independent coverage、local/regional/national media outlets、written by a leading expert、active social media presence

**问题：** LLM 会用知名度说服读者，常常罗列来源却没有上下文。

**修改前：**
> Her views have been cited in The New York Times, BBC, Financial Times, and The Hindu.

**修改后：**
> In a 2024 New York Times interview, she argued that AI regulation should focus on outcomes rather than methods.

### 3. 用 -ing 结尾做浅层分析

**留意词：** highlighting、underscoring、emphasizing、ensuring、reflecting、symbolizing、contributing to、cultivating、fostering、encompassing、showcasing

**问题：** AI 聊天机器人喜欢在句尾追加现在分词短语，制造虚假的深度。

**修改前：**
> The temple's color palette of blue, green, and gold resonates with the region's natural beauty, symbolizing Texas bluebonnets and the Gulf of Mexico.

**修改后：**
> The temple uses blue, green, and gold colors. The architect said these were chosen to reference local bluebonnets and the Gulf coast.

### 4. 宣传和广告腔

**留意词：** boasts a、vibrant、rich（比喻义）、profound、enhancing its、showcasing、exemplifies、commitment to、natural beauty、nestled、in the heart of、groundbreaking（比喻义）、renowned、breathtaking、must-visit、stunning

**问题：** LLM 很难保持中性，尤其是写文化遗产类主题时。

**修改前：**
> Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage.

**修改后：**
> Alamata Raya Kobo is a town in the Gonder region of Ethiopia, known for its weekly market and 18th-century church.

### 5. 模糊归因和空泛权威

**留意词：** Industry reports、Observers have cited、Experts argue、Some critics argue、several sources/publications（当实际来源很少时）

**问题：** AI 聊天机器人会把观点归因给模糊权威，而不是具体来源。

**修改前：**
> Experts believe it plays a crucial role in the regional ecosystem.

**修改后：**
> The Haolai River supports several endemic fish species, according to a 2019 survey by the Chinese Academy of Sciences.

### 6. 大纲式“挑战和未来展望”章节

**留意词：** Despite its... faces several challenges...、Despite these challenges、Challenges and Legacy、Future Outlook

**问题：** 很多 LLM 生成文章会包含公式化的“挑战”部分。

**修改前：**
> Despite its industrial prosperity, Korattur faces challenges typical of urban areas, including traffic congestion and water scarcity.

**修改后：**
> Traffic congestion increased after 2015 when three new IT parks opened. The municipal corporation began a stormwater drainage project in 2022.

## 语言和语法模式

### 7. 过度使用“AI 高频词”

**高频 AI 词：** Actually、additionally、align with、crucial、delve、emphasizing、enduring、enhance、fostering、garner、highlight、interplay、intricate/intricacies、key、landscape、pivotal、showcase、tapestry、testament、underscore、valuable、vibrant

**问题：** 这些词在 2023 年后的文本中出现频率明显更高，而且经常一起出现。

### 8. 回避 “is/are”（系动词回避）

**留意词：** serves as、stands as、marks、represents、boasts、features、offers

**问题：** LLM 会用复杂表达替代简单的 is/are/has。

**修改前：**
> Gallery 825 serves as LAAA's exhibition space for contemporary art.

**修改后：**
> Gallery 825 is LAAA's exhibition space for contemporary art.

### 9. 否定平行结构和句尾否定碎片

**问题：** “Not only...but...” 或 “It's not just about..., it's...” 被过度使用。句尾追加的 “no guessing”“no wasted motion” 这类短碎片也很常见。

**修改前：**
> It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere.

**修改后：**
> The heavy beat adds to the aggressive tone.

### 10. 过度使用三段式

**问题：** LLM 喜欢把观点硬凑成三项，让内容看起来全面。

**修改前：**
> The event features keynote sessions, panel discussions, and networking opportunities.

**修改后：**
> The event includes talks and panels. There's also time for informal networking between sessions.

### 11. 优雅变体（同义词轮换）

**问题：** AI 的重复惩罚会导致过度替换同义词。

**修改前：**
> The protagonist faces many challenges. The main character must overcome obstacles. The central figure eventually triumphs.

**修改后：**
> The protagonist faces many challenges but eventually triumphs and returns home.

### 12. 虚假的 “from X to Y” 范围

**问题：** LLM 会使用 “from X to Y” 结构，但 X 和 Y 并不构成有意义的尺度。

**修改前：**
> Our journey through the universe has taken us from the singularity of the Big Bang to the grand cosmic web.

**修改后：**
> The book covers the Big Bang, star formation, and current theories about dark matter.

### 13. 被动语态和无主语碎片

**问题：** LLM 经常隐藏动作主体，或写出 “No configuration file needed”“The results are preserved automatically” 这种无主语句。主动语态更清楚时就改成主动。

**修改前：**
> No configuration file needed. The results are preserved automatically.

**修改后：**
> You do not need a configuration file. The system preserves the results automatically.

## 风格模式

### 14. 过度使用 em dash

**问题：** LLM 比真人更爱用 em dash（—），模仿“有冲击力”的销售文案。多数情况下可以用逗号、句号或括号写得更清楚。

### 15. 过度使用粗体

**问题：** AI 聊天机器人会机械地加粗短语。

### 16. 行内标题式纵向列表

**问题：** AI 常输出这样的列表：每个条目以粗体标题加冒号开头。

**修改前：**
> - **Performance:** Performance has been enhanced through optimized algorithms.

**修改后：**
> The update speeds up load times through optimized algorithms.

### 17. 标题使用 Title Case

**问题：** AI 聊天机器人常把标题里的主要单词全部大写。

**修改前：**
> ## Strategic Negotiations And Global Partnerships

**修改后：**
> ## Strategic negotiations and global partnerships

### 18. Emoji

**问题：** AI 聊天机器人常用 emoji 装饰标题或 bullet。

### 19. 弯引号

**问题：** ChatGPT 会使用弯引号，而不是直引号。

## 沟通模式

### 20. 聊天协作痕迹

**留意词：** I hope this helps、Of course!、Certainly!、You're absolutely right!、Would you like...、let me know、here is a...

**问题：** 原本用于聊天回复的套话被复制进正式内容里。

**修改前：**
> Here is an overview of the French Revolution. I hope this helps!

**修改后：**
> The French Revolution began in 1789 when financial crisis and food shortages led to widespread unrest.

### 21. 知识截止免责声明

**留意词：** as of [date]、Up to my last training update、While specific details are limited/scarce...、based on available information...

**问题：** AI 关于信息不完整的免责声明被留在正文里。

### 22. 讨好或仆从式语气

**问题：** 过度积极、讨好的语言。

**修改前：**
> Great question! You're absolutely right that this is a complex topic.

**修改后：**
> The economic factors you mentioned are relevant here.

## 填充语和过度缓和

### 23. 填充短语

**修改前 → 修改后：**

- "In order to achieve this goal" → "To achieve this"
- "Due to the fact that it was raining" → "Because it was raining"
- "At this point in time" → "Now"
- "In the event that you need help" → "If you need help"
- "The system has the ability to process" → "The system can process"
- "It is important to note that the data shows" → "The data shows"

### 24. 过度缓和

**问题：** 修饰和限定过多。

**修改前：**
> It could potentially possibly be argued that the policy might have some effect on outcomes.

**修改后：**
> The policy may affect outcomes.

### 25. 泛泛的积极结尾

**问题：** 空泛乐观的收尾。

**修改前：**
> The future looks bright for the company. Exciting times lie ahead.

**修改后：**
> The company plans to open two more locations next year.

### 26. 过度使用连字符词组

**留意词：** third-party、cross-functional、client-facing、data-driven、decision-making、well-known、high-quality、real-time、long-term、end-to-end

**问题：** AI 会异常一致地给常见词组加连字符。真人很少这么整齐。少见或技术性的复合修饰语仍然可以加连字符。

### 27. 假装洞察本质的权威套话

**留意词：** The real question is、at its core、in reality、what really matters、fundamentally、the deeper issue、the heart of the matter

**问题：** LLM 用这些短语假装剥开表象，但后面的句子通常只是把普通观点说得更隆重。

### 28. 路标式开场和预告

**留意词：** Let's dive in、let's explore、let's break this down、here's what you need to know、now let's look at、without further ado

**问题：** LLM 会宣布自己要做什么，而不是直接做。这种元叙述会拖慢文字，让它像教程脚本。

### 29. 碎片化标题

**留意点：** 一个标题后跟一行只是重复标题意思的短段落，然后才进入真正内容。

**问题：** LLM 经常在标题后加一句泛泛的热身话。它通常没有信息量，只会让文字显得臃肿。

## 流程

1. 仔细读取输入文本（如果是文件，用 `read_file`）。
2. 识别上面所有模式。
3. 重写每个有问题的部分。
4. 确保修改后的文本：
   - 读出来很自然
   - 句式自然变化
   - 使用具体细节，而不是空泛判断
   - 保持适合上下文的语气
   - 合适时使用简单结构（is/are/has）
5. 给出一个 humanized 草稿。
6. 问自己：“下面这段为什么一眼像 AI 写的？”
7. 简短回答剩余痕迹（如果有）。
8. 再问自己：“现在让它不再明显像 AI 写的。”
9. 给出最终版本（经过审查后再次修改）。
10. 如果文本来自文件，用 `patch`（精准修改）或 `write_file`（整文件重写）应用编辑，并告诉用户改了什么。

## 输出格式

提供：

1. 草稿改写
2. “下面这段为什么一眼像 AI 写的？”（简短 bullet）
3. 最终改写
4. 修改摘要（可选，有帮助时提供）

## 完整示例

**修改前（AI 味明显）：**

> Great question! Here is an essay on this topic. I hope this helps!
>
> AI-assisted coding serves as an enduring testament to the transformative potential of large language models, marking a pivotal moment in the evolution of software development. In today's rapidly evolving technological landscape, these groundbreaking tools are reshaping how engineers ideate, iterate, and deliver.
>
> At its core, the value proposition is clear: streamlining processes, enhancing collaboration, and fostering alignment. It's not just about autocomplete; it's about unlocking creativity at scale.
>
> Industry observers have noted that adoption has accelerated from hobbyist experiments to enterprise-wide rollouts, from solo developers to cross-functional teams.
>
> In conclusion, the future looks bright. Let me know if you'd like me to expand on any section!

**草稿改写：**

> AI coding assistants speed up some tasks. In a 2024 study by Google, developers using Codex completed simple functions 55% faster than a control group, but showed no improvement on debugging or architectural decisions.
>
> The tools are good at boilerplate: config files, test scaffolding, repetitive refactors. They are bad at knowing when they are wrong.
>
> The productivity claims are hard to verify. GitHub says Copilot users "accept 30% of suggestions," but acceptance is not correctness, and correctness is not value.

**下面这段为什么一眼像 AI 写的？**

- 节奏仍然太整齐。
- 引用的人名和研究如果没有真实来源，会像临时编出来的占位符。
- 结尾略像口号，而不是人在说话。

**现在让它不再明显像 AI 写的。**

> AI coding assistants can make you faster at the boring parts. Not everything. Definitely not architecture.
>
> They're great at boilerplate: config files, test scaffolding, repetitive refactors. They're also great at sounding right while being wrong. I've accepted suggestions that compiled, passed lint, and still missed the point because I stopped paying attention.
>
> The productivity metrics are slippery. GitHub can say Copilot users "accept 30% of suggestions," but acceptance isn't correctness, and correctness isn't value. If you don't have tests, you're basically guessing.

**修改内容：**

- 移除聊天套话，例如 “Great question!”、“I hope this helps!”、“Let me know if...”
- 移除夸大重要性的表达，例如 “testament”、“pivotal moment”、“evolving landscape”
- 移除宣传腔，例如 “groundbreaking”、“seamless, intuitive, and powerful”
- 移除模糊归因，例如 “Industry observers”
- 移除浅层 -ing 分析，例如 “underscoring”、“highlighting”、“reflecting”
- 移除否定平行结构、三段式和同义词轮换
- 移除虚假的 “from X to Y” 范围
- 移除 em dash、emoji、粗体标题和弯引号
- 把 “serves as”、“functions as”、“stands as” 改成更直接的 “is/are/has”
- 移除公式化挑战章节、知识截止免责声明、过度缓和和空泛积极结尾
- 让语气更像人写的：节奏有变化，减少占位内容，保留具体判断

## 归属

此技能移植自 [blader/humanizer](https://github.com/blader/humanizer)（MIT 许可）。它本身基于 [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)，由 WikiProject AI Cleanup 维护。那里记录的模式来自对 Wikipedia 上大量 AI 生成文本的观察。

原作者：Siqi Chen（[@blader](https://github.com/blader)）。原仓库：https://github.com/blader/humanizer（版本 2.5.1）。移植到 Hermes Agent 时加入了 Hermes 原生工具引用（`read_file`、`patch`、`write_file`）以及何时加载技能的说明；29 种模式、个性和灵魂部分、完整示例都保留了原始结构。原 MIT 许可证保留在同目录 `LICENSE` 文件中。

Wikipedia 的关键洞察：“LLMs use statistical algorithms to guess what should come next. The result tends toward the most statistically likely result that applies to the widest variety of cases.”
