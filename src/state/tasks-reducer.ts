import type {TasksStateType} from "../App";
import {v1} from "uuid";
import type {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      return {...state, [action.todolistId]: []}
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.todolistId]
      return copyState
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.todolistId]: [
          {id: action.taskId, title: action.title, isDone: false},
          ...state[action.todolistId]
        ]
      }
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(todolist => todolist.id !== action.taskId)
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(todolist => {
          return todolist.id === action.taskId ? {
            ...todolist,
            isDone: action.taskStatus
          } : todolist;
        })
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(todolist => {
          return todolist.id === action.taskId ? {
            ...todolist,
            title: action.taskTitle
          } : todolist;
        })
      }
    }
    default:
      throw new Error('Unknown action')
  }
}

type ActionType =
  AddTaskActionType |
  RemoveTaskActionType |
  ChangeTaskStatusActionType |
  ChangeTaskTitleActionType |
  AddTodolistActionType |
  RemoveTodolistActionType

export type AddTaskActionType = {
  type: 'ADD-TASK'
  todolistId: string
  taskId: string
  title: string
}
export const addTaskAC = (
  todolistId: string, title: string
): AddTaskActionType => ({
  type: 'ADD-TASK',
  todolistId,
  taskId: v1(),
  title
})

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}
export const removeTaskAC = (
  todolistId: string, taskId: string
): RemoveTaskActionType => ({
  type: 'REMOVE-TASK',
  todolistId,
  taskId
})

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  todolistId: string
  taskId: string
  taskStatus: boolean
}
export const changeTaskStatusAC = (
  todolistId: string, taskId: string, taskStatus: boolean
): ChangeTaskStatusActionType => ({
  type: 'CHANGE-TASK-STATUS',
  todolistId,
  taskId,
  taskStatus,
})

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todolistId: string
  taskId: string
  taskTitle: string
}
export const changeTaskTitleAC = (
  todolistId: string, taskId: string, taskTitle: string
): ChangeTaskTitleActionType => ({
  type: 'CHANGE-TASK-TITLE',
  todolistId,
  taskId,
  taskTitle,
})