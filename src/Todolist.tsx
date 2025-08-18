import type {FilterValuesType, TaskType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  todolistId: string
  title: string
  tasks: TaskType[]
  removeTodolist: (todolistId: string) => void
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
  filter: FilterValuesType
}

export const Todolist = (
  {
    todolistId,
    title,
    tasks,
    removeTodolist,
    addTask,
    removeTask,
    changeTodolistTitle,
    changeTaskTitle,
    changeTaskStatus,
    changeTodolistFilter,
    filter
  }: Props) => {

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolistId, title)
  }

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title)
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

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
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
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => changeTodolistFilter(todolistId, 'all')}
        >All</Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'outlined'}
          sx={{margin: '0 5px'}}
          onClick={() => changeTodolistFilter(todolistId, 'active')}
        >Active</Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => changeTodolistFilter(todolistId, 'completed')}
        >Completed</Button>
      </div>
    </div>
  )
}