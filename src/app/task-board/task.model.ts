import { TaskState } from './task-state.enum';

export interface Task {
  guid: string;
  title: string;
  text: string;
  state: TaskState;
}

export interface TaskServer {
  guid: string;
  title: string;
  text: string;
  isFavorite: boolean;
  isInProgress: boolean;
  isComplete: boolean;
}
