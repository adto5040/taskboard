import { TaskState } from './task-state.enum';

export interface Task {
  id: string | null,
  state: TaskState,
  summary: string,
  description: string
}
