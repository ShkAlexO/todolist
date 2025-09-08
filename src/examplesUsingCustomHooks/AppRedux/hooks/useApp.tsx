import {useDispatch, useSelector} from "react-redux";
import type {AppRootState} from "../../state/store";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    type TodolistsStateType
} from "../../state/todolists-reducer";
import {useCallback} from "react";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "../../state/tasks-reducer";
import type {FilterValuesType, TasksStateType} from "../App";

export const useApp = () => {
    const todolists = useSelector<AppRootState, TodolistsStateType>((state) => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])

    return {
        todolists,
        tasks,
        addTodolist,
        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
        addTask,
        removeTask,
        changeTaskTitle,
        changeTaskStatus
    }
}