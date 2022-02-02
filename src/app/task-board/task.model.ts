import { TaskState } from './task-state.enum';

export interface Task {
  guid: string;
  title: string;
  text: string;
  state: TaskState;
}
