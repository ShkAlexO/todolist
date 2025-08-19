import { v1 } from 'uuid';
import type {FilterValuesType, TodolistType} from "../App";
import {
  type ChangeTodolistFilterActionType,
  type ChangeTodolistTitleActionType,
  todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ];

  const endState = todolistsReducer(startState, { type: "REMOVE-TODOLIST", todolistId: todolistId1 });

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

  const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const newTodolistTitle = "New Todolist"

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to Learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]

  const action:ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: todolistId2,
    title: newTodolistTitle
  }

  const endState = todolistsReducer(startState, action)

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

  const action:ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: todolistId2, filter:
    newFilter
  };
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
