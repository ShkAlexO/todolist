import {
  tasksReducer,
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC
} from './tasks-reducer';
import type {TasksStateType} from "../App";

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'));

  expect(endState["todolistId1"].length).toBe(3); // осталось столько же
  expect(endState["todolistId2"].length).toBe(2); // одна задача удалена

  expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy(); // проверяем, что задача id=2 реально удалена
  // строка выше делает то же самое, что и две строки ниже
  expect(endState["todolistId2"][0].id).toBe('1')
  expect(endState["todolistId2"][1].id).toBe('3')
});

test('correct task should be added from correct array', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const newTaskTitle = 'New task';
  const endState = tasksReducer(startState, addTaskAC('todolistId1', newTaskTitle));

  expect(endState["todolistId1"].length).toBe(4); // одна задача добавлена
  expect(endState["todolistId2"].length).toBe(3); // осталось столько же

  // проверяем что title новой таски действительно в первом элементе массива
  expect(endState["todolistId1"][0].title).toBe(newTaskTitle)
  // проверяем что id новой таски определен
  expect(endState["todolistId1"][0].id).toBeDefined()
  // проверяем что isDone установлено в false
  expect(endState["todolistId1"][0].isDone).toBe(false)
  // проверяем что первый элемент массива стал на второе место
  expect(endState["todolistId1"][1].title).toBe('CSS')
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '3',  true));

  expect(endState["todolistId1"][2].isDone).toBeFalsy();
  expect(endState["todolistId2"][2].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '3',  'Roshen'));

  expect(endState["todolistId1"][2].title).toBe('React');
  expect(endState["todolistId2"][2].title).toBe('Roshen');
});