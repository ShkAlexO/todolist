import type {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {expect} from "vitest";

test('ids should be equal', () => {
  // Начальное состояние задач
  const startTasksState: TasksStateType = {}

  // Начальное состояние todolists
  const startTodolistsState: Array<TodolistType> = []

  // Создаем action для добавления нового todolist
  const action = addTodolistAC("new todolist")

  // Редьюсеры
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  // Получаем ключ (id) из tasks
  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]

  // Получаем id из todolists
  const idFromTodolists = endTodolistsState[0].id

  // Проверяем, что id совпадают с id из action
  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolistId should be deleted', () => {
  // Начальное состояние задач
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "Css", isDone: false },
      { id: "2", title: "Js", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  }

  // Action для удаления todolistId2
  const action = removeTodolistAC("todolistId2")
  // Вызываем редьюсер
  const endState = tasksReducer(startState, action)

  // Получаем ключи после удаления
  const keys = Object.keys(endState)

  // Проверяем, что ключ todolistId2 удален
  expect(keys).not.toContain("todolistId2")
  // Проверяем, что остался только todolistId1
  expect(keys.length).toBe(1)
  //Проверяем что ключ todolistId2 не определен(значит удален)
  expect(endState['todolistId2']).toBeUndefined();
})
