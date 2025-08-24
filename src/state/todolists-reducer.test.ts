import { v1 } from 'uuid';
import type {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('correct todolist should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newTodolistTitle = "New Todolist";

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ];

  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});

test('correct todolist should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should change its name', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const newTodolistTitle = "New Todolist"

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to Learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

  expect(endState[0].title).toBe("What to Learn")
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newFilter: FilterValuesType = "completed";

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ];

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test('new property with new array should be added when new todolist is added', () => {
  const startState:TasksStateType = {
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
  }

  const action = addTodolistAC("в данном случае заголовок не имеет значения")
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")

  if (!newKey) {
    throw new Error("new key should be added")
  }

  // Проверяем, что в endState теперь 3 свойства (добавился новый todolist)
  expect(keys.length).toBe(3)
  // Проверяем, что новое свойство (новый todolist) создалось с пустым массивом задач
  expect(endState[newKey]).toEqual([])
})
