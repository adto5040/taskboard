import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import {
  add,
  deleteAll,
  removeAtIndex,
  update
} from './tasks-functions.service';

describe('TaskServiceFunctions', () => {
  const demoTasks: Task[] = [
    {
      guid: '1',
      title: 'First TODO',
      text: 'Test text',
      isFavorite: false,
      state: TaskState.TODO
    },
    {
      guid: '2',
      title: 'Just do it',
      text: 'Another test text',
      isFavorite: true,
      state: TaskState.TODO
    },
    {
      guid: '3',
      title: 'Just do it',
      text: "I'm currently working on that",
      isFavorite: true,
      state: TaskState.DOING
    },
    {
      guid: '4',
      title: 'Finish it',
      text: 'This should be finished',
      isFavorite: false,
      state: TaskState.DONE
    }
  ];

  it('should be possible to add a task', () => {
    const newTask: Task = {
      guid: '',
      title: 'New task',
      text: 'This is a special one',
      isFavorite: false,
      state: TaskState.DONE
    };
    const addFct = add(newTask);
    const updatedTasks = addFct(demoTasks);
    expect(updatedTasks.length).toBe(demoTasks.length + 1);
    expect(updatedTasks[updatedTasks.length - 1]).toBe(newTask);
  });

  it('should be possible to remove a task', () => {
    const guid = demoTasks[demoTasks.length - 1].guid;
    const removeFct = removeAtIndex(guid);
    expect(demoTasks.findIndex(task => task.guid === guid)).not.toBe(-1);

    const updatedTasks = removeFct(demoTasks);
    expect(updatedTasks.length).toBe(demoTasks.length - 1);
    expect(updatedTasks.findIndex(task => task.guid === guid)).toBe(-1);
  });

  it('should be possible to update a task', () => {
    const idx = 0;
    const newTitle = 'Blafoo';
    const newState = TaskState.DOING;
    const firstTask = { ...demoTasks[idx], title: newTitle, state: newState };
    const updateFct = update(firstTask);
    const updatedTasks = updateFct(demoTasks);
    expect(demoTasks[idx].title).not.toBe(newTitle);
    expect(demoTasks[idx].state).not.toBe(newState);
    expect(updatedTasks[idx].title).toBe(newTitle);
    expect(updatedTasks[idx].state).toBe(newState);
  });

  it('should be possible to delete all tasks at once', () => {
    const deleteAllFct = deleteAll();
    expect(deleteAllFct()).toEqual([]);
  });
});
