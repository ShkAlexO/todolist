import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '1312ac5d-6246-4eb2-9525-25cd56c96337'
    }
}

export const todolistsAPI = {
    getTodolists() {
        return axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
    },
    deleteTodolist(id: string) {
        return axios.delete<DeleteTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolistTitle(id: string, title: string) {
        return axios.put<UpdateTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, settings)
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

export type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}