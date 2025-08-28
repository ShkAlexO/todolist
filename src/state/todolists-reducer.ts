import type {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistId1 = v1()
export const todolistId2 = v1()

export const initialTodolistsState: TodolistsStateType = [
  {id: todolistId1, title: 'What to learn 1', filter: 'active'},
  {id: todolistId2, title: 'What to learn 2', filter: 'completed'},
]

export const todolistsReducer = (state: TodolistsStateType = initialTodolistsState, action: ActionType): TodolistsStateType => {
  switch (action.type) {
    case 'ADD-TODOLIST':
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all'
        },
        ...state
      ]
    case 'REMOVE-TODOLIST':
      return state.filter(todolist => todolist.id !== action.todolistId)
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(todolist => {
        return todolist.id === action.todolistId
          ? {...todolist, title: action.title} : todolist
      })
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(todolist => {
        return todolist.id === action.todolistId
          ? {...todolist, filter: action.filter} : todolist
      })
    default:
      return  state;
  }
}

export type TodolistsStateType = Array<TodolistType>

type ActionType =
  AddTodolistActionType |
  RemoveTodolistActionType |
  ChangeTodolistTitleActionType |
  ChangeTodolistFilterActionType

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  todolistId: string
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', todolistId}
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  todolistId: string
  title: string
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  todolistId: string
  filter: FilterValuesType
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
}