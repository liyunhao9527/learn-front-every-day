export type SessionMode = 'normal' | 'intensive'

export type SessionAction = 'complete' | 'review' | 'reset'

export type SessionSnapshot = {
  completedLessons: number
  label: string
  mode: SessionMode
  percent: number
  title: string
  totalLessons: number
}

export class LearningSession {
  completedLessons: number
  title: string
  totalLessons: number

  constructor(title: string, totalLessons: number, completedLessons = 0) {
    this.title = title
    this.totalLessons = totalLessons
    this.completedLessons = Math.min(completedLessons, totalLessons)
  }

  completeLesson() {
    this.completedLessons = Math.min(this.completedLessons + 1, this.totalLessons)
  }

  getProgressLabel() {
    return `${this.completedLessons}/${this.totalLessons}`
  }

  reset() {
    this.completedLessons = 0
  }

  reviewLesson() {
    this.completedLessons = Math.max(this.completedLessons - 1, 0)
  }

  toSnapshot(): SessionSnapshot {
    return {
      completedLessons: this.completedLessons,
      label: this.getProgressLabel(),
      mode: 'normal',
      percent: Math.round((this.completedLessons / this.totalLessons) * 100),
      title: this.title,
      totalLessons: this.totalLessons,
    }
  }
}

export class IntensiveLearningSession extends LearningSession {
  static fromPreset() {
    return new IntensiveLearningSession('Class 冲刺练习', 8, 2)
  }

  completeLesson() {
    super.completeLesson()
    super.completeLesson()
  }

  toSnapshot(): SessionSnapshot {
    return {
      ...super.toSnapshot(),
      mode: 'intensive',
    }
  }
}

export function applySessionAction(session: LearningSession, action: SessionAction) {
  if (action === 'complete') {
    session.completeLesson()
  }

  if (action === 'review') {
    session.reviewLesson()
  }

  if (action === 'reset') {
    session.reset()
  }

  return session.toSnapshot()
}

export function createLearningSession(mode: SessionMode) {
  if (mode === 'intensive') {
    return IntensiveLearningSession.fromPreset()
  }

  return new LearningSession('Class 基础练习', 6, 1)
}
