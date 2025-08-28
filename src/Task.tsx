import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import type {TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";
import Delete from '@mui/icons-material/Delete';
import { memo } from "react";

type TaskPropsType = {
  todolistId: string
  task: TaskType
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const Task = memo((
  {
    todolistId,
    task,
    removeTask,
    changeTaskTitle,
    changeTaskStatus
  }: TaskPropsType) => {

  return (
    <div className={task.isDone ? 'is-done' : ''}>
      <Checkbox
        size={'small'}
        checked={task.isDone}
        onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}
      />

      <EditableSpan
        title={task.title}
        onChange={(title: string) => changeTaskTitle(todolistId, task.id, title)}/>

      <IconButton
        size={"small"}
        onClick={() => removeTask(todolistId, task.id)}
      >
        <Delete fontSize={'small'}/>
      </IconButton>
    </div>
  );
});
