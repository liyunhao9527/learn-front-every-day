import { useState } from 'react'
import { Button, Descriptions, List, Segmented, Space, Statistic, Tag } from 'antd'

import {
  applySessionAction,
  createLearningSession,
  type LearningSession,
  type SessionAction,
  type SessionMode,
  type SessionSnapshot,
} from './examples'

const actionLabels: Record<SessionAction, string> = {
  complete: 'completeLesson()',
  reset: 'reset()',
  review: 'reviewLesson()',
}

function createState(mode: SessionMode) {
  const session = createLearningSession(mode)

  return {
    logs: [`new ${session.constructor.name}(...)`],
    session,
    snapshot: session.toSnapshot(),
  }
}

export function ClassPlaygroundDemo() {
  const [mode, setMode] = useState<SessionMode>('normal')
  const [state, setState] = useState<{
    logs: string[]
    session: LearningSession
    snapshot: SessionSnapshot
  }>(() => createState('normal'))

  function changeMode(nextMode: SessionMode) {
    setMode(nextMode)
    setState(createState(nextMode))
  }

  function runAction(action: SessionAction) {
    setState((current) => {
      const snapshot = applySessionAction(current.session, action)

      return {
        ...current,
        logs: [
          `${current.session.constructor.name}.${actionLabels[action]}`,
          ...current.logs,
        ].slice(0, 6),
        snapshot,
      }
    })
  }

  return (
    <div className="demo-card">
      <div>
        <p className="demo-eyebrow">Class Playground</p>
        <h3>观察实例状态和方法调用</h3>
        <p>切换普通练习和冲刺练习，观察同样的方法在不同 class 实例上的结果。</p>
      </div>

      <Segmented
        onChange={(value) => changeMode(value as SessionMode)}
        options={[
          { label: '普通实例', value: 'normal' },
          { label: '继承实例', value: 'intensive' },
        ]}
        value={mode}
      />

      <Space wrap>
        <Button htmlType="button" onClick={() => runAction('complete')} type="primary">
          完成课程
        </Button>
        <Button htmlType="button" onClick={() => runAction('review')}>
          回退复习
        </Button>
        <Button htmlType="button" onClick={() => runAction('reset')}>
          重置
        </Button>
      </Space>

      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="实例">
          <Tag color={state.snapshot.mode === 'intensive' ? 'blue' : 'green'}>
            {state.session.constructor.name}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="课程">{state.snapshot.title}</Descriptions.Item>
        <Descriptions.Item label="进度">{state.snapshot.label}</Descriptions.Item>
      </Descriptions>

      <Statistic suffix="%" title="完成比例" value={state.snapshot.percent} />

      <List
        bordered
        dataSource={state.logs.map((message, index) => ({ id: `${message}-${index}`, message }))}
        renderItem={(item) => <List.Item>{item.message}</List.Item>}
        size="small"
      />
    </div>
  )
}
