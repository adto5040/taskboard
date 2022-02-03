import { map } from 'rxjs';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';

export function filterState(state: TaskState) {
  return map((tasks: Task[]) => tasks.filter(task => task.state === state));
}
