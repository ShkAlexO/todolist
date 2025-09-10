import {useEffect, useState} from 'react';
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '1312ac5d-6246-4eb2-9525-25cd56c96337'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'New todolist'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistID = 'a90a7410-8d75-11f0-83ed-812303426aa4'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistID = 'a90a7410-8d75-11f0-83ed-812303426aa4'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {title: 'New todolist 2'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}