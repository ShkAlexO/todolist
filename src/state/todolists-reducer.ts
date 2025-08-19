import type {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'ADD-TODOLIST':
      return [
        ...state,
        {
          id: v1(), //так делать не правильно, но это временно
          title: action.title,
          filter: 'all'
        }
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
      throw new Error('Unknown action')
  }
}

type StateType = Array<TodolistType>

type ActionType =
  AddTodolistActionType |
  RemoveTodolistActionType |
  ChangeTodolistTitleActionType |
  ChangeTodolistFilterActionType

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
}

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  todolistId: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  todolistId: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  todolistId: string
  filter: FilterValuesType
}