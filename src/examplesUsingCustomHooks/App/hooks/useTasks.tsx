import {useState} from "react";
import {v1} from "uuid";
import type {TasksStateType} from "../App12lesson";
import {todolistId1, todolistId2} from "../id-utils";

export function useTasks() {
    const [tasksObj, setTasksObj] = useState<TasksStateType>({
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
    })

    const addTask = (todolistId: string, title: string) => {
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [{id: v1(), title: title, isDone: false}, ...tasks]
        setTasksObj({...tasksObj})
    }

    const removeTask = (todolistId: string, taskId: string) => {
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(task => task.id !== taskId)
        setTasksObj({...tasksObj})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(task => task.id === taskId)
        if (task) {
            task.title = title
            setTasksObj({...tasksObj})
        }
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const completelyRemoveTasksForTodolist = (todolistId: string) => {
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const addStateTasksForNewTodolist = (todolistId: string) => {
        setTasksObj({...tasksObj, [todolistId]: []})
    }

    return {
        tasksObj,
        setTasksObj,
        addTask,
        removeTask,
        changeTaskTitle,
        changeTaskStatus,
        addStateTasksForNewTodolist,
        completelyRemoveTasksForTodolist
    }
}