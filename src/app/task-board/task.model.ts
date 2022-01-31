import { TaskState } from './task-state.enum';

export interface Task {
  id: string,
  state: TaskState,
  summary: string,
  description: string
}
