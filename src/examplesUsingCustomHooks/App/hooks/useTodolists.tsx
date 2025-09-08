import {useState} from "react";
import type {FilterValuesType, TodolistType} from "../App12lesson";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";

export function useTodolists(
    onTodolistAdded: (id: string) => void,
    onTodolistRemoved: (id: string) => void
) {
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn 1', filter: 'active'},
        {id: todolistId2, title: 'What to learn 2', filter: 'completed'},
    ])

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'active'}
        setTodolists([newTodolist, ...todolists])

        onTodolistAdded(todolistId)
    }

    const removeTodolist = (todolistId: string) => {
        const filteredTodolists = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists([...filteredTodolists])

        onTodolistRemoved(todolistId)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        const todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }

    return {
        todolists,
        addTodolist,
        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter
    }
}