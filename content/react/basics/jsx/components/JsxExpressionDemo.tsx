import { useMemo, useState } from 'react'

type Mood = '专注' | '轻松' | '卡住'

const baseLessons = [
  { id: 'jsx-expression', title: '表达式', done: true },
  { id: 'jsx-condition', title: '条件渲染', done: false },
  { id: 'jsx-list', title: '列表与 key', done: false },
]

const moodMessages: Record<Mood, string> = {
  专注: '适合继续推进，先把一个例子写完整。',
  轻松: '可以多做一点变体，感受 JSX 写法的弹性。',
  卡住: '先缩小问题，只保留一个变量和一个渲染结果。',
}

export function JsxExpressionDemo() {
  const [name, setName] = useState('小林')
  const [mood, setMood] = useState<Mood>('专注')
  const [showDone, setShowDone] = useState(true)

  const visibleLessons = useMemo(
    () => baseLessons.filter((lesson) => showDone || !lesson.done),
    [showDone],
  )
  const completedCount = baseLessons.filter((lesson) => lesson.done).length

  return (
    <div className="demo-card">
      <div>
        <p className="demo-eyebrow">JSX Preview</p>
        <h3>让数据决定界面长相</h3>
        <p>修改姓名、状态和筛选条件，观察 JSX 如何根据表达式重新生成 UI。</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <label className="demo-field">
          姓名
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>

        <label className="demo-field">
          学习状态
          <select
            className="demo-input"
            value={mood}
            onChange={(event) => setMood(event.target.value as Mood)}
          >
            <option value="专注">专注</option>
            <option value="轻松">轻松</option>
            <option value="卡住">卡住</option>
          </select>
        </label>

        <label className="demo-field">
          列表条件
          <span className="flex min-h-[38px] items-center gap-2 rounded-[7px] border border-[#c2d0dd] bg-white px-3">
            <input
              checked={showDone}
              className="h-4 w-4"
              type="checkbox"
              onChange={(event) => setShowDone(event.target.checked)}
            />
            显示已完成项
          </span>
        </label>
      </div>

      <div className="demo-output">
        <strong>{name || '匿名同学'}</strong>
        <span> 现在的状态是 </span>
        <strong>{mood}</strong>
        <span>。{moodMessages[mood]}</span>
      </div>

      <div className="demo-output">
        {completedCount > 0 ? (
          <span>已完成 {completedCount} 个 JSX 练习点。</span>
        ) : (
          <span>还没有完成的练习点。</span>
        )}
      </div>

      <ol className="demo-log">
        {visibleLessons.map((lesson) => (
          <li key={lesson.id}>
            {lesson.title}
            {lesson.done ? '：已完成' : '：待练习'}
          </li>
        ))}
      </ol>
    </div>
  )
}
