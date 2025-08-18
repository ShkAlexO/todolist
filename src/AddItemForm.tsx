import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TextField from "@mui/material/TextField";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
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
    if (e.key === 'Enter' && newTaskTitle.trim().length !== 0) {
      addItem(newTaskTitle)
      setNewTaskTitle('')
    }
    else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField
        size={'small'}
        label="Title Todolist"
        variant="outlined"
        value={newTaskTitle}
        onKeyDown={onKeyPressHandler}
        onChange={onNewTitleChangeHandler}
        helperText={error}
        error={!!error}
        sx={{marginRight: '5px' }}
      />

      <IconButton
        size={"medium"}
        color={'primary'}
        onClick={addTaskHandler}
      >
        <AddCircleOutlineIcon fontSize={'medium'}/>
      </IconButton>
    </div>
  )
}