import type {TasksStateType} from "../App";
import {v1} from "uuid";
import {
  type AddTodolistActionType,
  type RemoveTodolistActionType,
  todolistId1, todolistId2
} from "./todolists-reducer";

export const initialTasksState: TasksStateType = {
  [todolistId1]: [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false}
  ],
  [todolistId2]: [
    {id: v1(), title: '2HTML&CSS', isDone: true},
    {id: v1(), title: '2JS', isDone: false},
    {id: v1(), title: '2ReactJS', isDone: true}
  ]
}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: ActionType): TasksStateType => {
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
        [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => {
          return task.id === action.taskId ? {
            ...task,
            isDone: action.taskStatus
          } : task;
        })
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => {
          return task.id === action.taskId ? {
            ...task,
            title: action.taskTitle
          } : task;
        })
      }
    }
    default:
      return state;
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