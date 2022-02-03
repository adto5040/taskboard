// Functions that mutate the state/data aggregation
import { Task } from './task.model';

const add = (task: Task) => (tasks: Task[]) => [...tasks, task];

const removeAtIndex = (guid: string) => (tasks: Task[]) =>
  tasks.filter(task => task.guid !== guid);

const update = (task: Task) => (tasks: Task[]) => {
  const idx = tasks.findIndex(t => t.guid === task.guid);
  if (idx < 0) {
    return [...tasks];
  } else {
    return tasks
      .slice(0, idx)
      .concat(task)
      .concat(tasks.slice(idx + 1));
  }
};

const deleteAll = () => () => [];

export { add, removeAtIndex, update, deleteAll };
