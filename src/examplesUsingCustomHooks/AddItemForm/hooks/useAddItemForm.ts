import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import type {AddItemFormPropsType} from "../AddItemForm";

export const useAddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim().length !== 0) {
            addItem(newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter' && newTitle.trim().length !== 0) {
            addItem(newTitle)
            setNewTitle('')
        }
    }

    return {
        newTitle,
        setNewTitle,
        onNewTitleChangeHandler,
        addTaskHandler,
        onKeyPressHandler,
        error
    }
}