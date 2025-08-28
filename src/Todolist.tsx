import type {FilterValuesType, TaskType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {memo, useCallback} from "react";
import {Task} from "./Task";

type Props = {
  todolistId: string
  title: string
  tasksForThisTodolist: TaskType[]
  removeTodolist: (todolistId: string) => void
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
  filter: FilterValuesType
}

export const Todolist = memo((
  {
    todolistId,
    title,
    tasksForThisTodolist,
    removeTodolist,
    addTask,
    removeTask,
    changeTodolistTitle,
    changeTaskTitle,
    changeTaskStatus,
    changeTodolistFilter,
    filter
  }: Props) => {
  const changeTodolistTitleHandler = useCallback((title: string) => {
    changeTodolistTitle(todolistId, title)
  }, [changeTodolistTitle, todolistId])

  const addTaskHandler = useCallback((title: string) => {
    addTask(todolistId, title)
  }, [addTask, todolistId])

  const onAllClickHandler = useCallback(() => {
    changeTodolistFilter(todolistId, 'all')
  }, [changeTodolistFilter, todolistId])
  const onActiveClickHandler = useCallback(() => {
    changeTodolistFilter(todolistId, 'active')
  }, [changeTodolistFilter, todolistId])
  const onCompletedClickHandler = useCallback(() => {
    changeTodolistFilter(todolistId, 'completed')
  }, [changeTodolistFilter, todolistId])

  let tasksForTodolist = tasksForThisTodolist
  if (filter === 'active') {
    tasksForTodolist = tasksForThisTodolist.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasksForThisTodolist.filter(task => task.isDone)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
        <IconButton
          size={"medium"}
          onClick={() => removeTodolist(todolistId)}
        >
          <Delete fontSize={'medium'}/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler}/>

      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <div>
          {tasksForTodolist.map(task => {
            return <Task
              key={task.id}
              todolistId={todolistId}
              task={task}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
            />
          })}
        </div>
      )}
      <div>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={onAllClickHandler}
        >All</Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'outlined'}
          sx={{margin: '0 5px'}}
          onClick={onActiveClickHandler}
        >Active</Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={onCompletedClickHandler}
        >Completed</Button>
      </div>
    </div>
  )
})