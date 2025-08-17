import {Button} from "./Button";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
  addItem: (title: string)=>void;
}

export const AddItemForm = ({ addItem}:AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNewTaskTitle(e.currentTarget.value)
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim().length !== 0) {
      addItem(newTaskTitle)
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem(newTaskTitle)
      setNewTaskTitle('')
    }
  }

  return (
    <div>
      <input
        value={newTaskTitle}
        onKeyDown={onKeyPressHandler}
        onChange={onNewTitleChangeHandler}
        className={error ? 'error' : ''}
      />
      <Button
        title={'+'}
        onClick={addTaskHandler}
      />
      {error && <p className={error ? 'error-message' : ''}>{error}</p>}
    </div>
  )
}