import type {FilterValuesType, TaskType} from './App'
import {Button} from "./Button";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
  todolistId: string
  title: string
  tasks: TaskType[]
  removeTodolist: (todolistId:string) => void
  addTask: (todolistId:string, title: string) => void
  removeTask: (todolistId:string, taskId: string) => void
  changeStatus: (todolistId:string, taskId: string, isDone: boolean) => void
  changeFilter: (todolistId: string, filter: FilterValuesType) => void
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
    changeStatus,
    changeFilter,
    filter
  }: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(todolistId, newTaskTitle)
      setNewTaskTitle('')
    }
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim().length !== 0) {
      addTask(todolistId, newTaskTitle)
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <h3>{title} <Button title={'x'} onClick={() => removeTodolist(todolistId)}/></h3>
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
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => changeStatus(todolistId, task.id, e.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button title={'x'} onClick={() => removeTask(todolistId, task.id)}/>
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button title={'All'} className={filter === 'all' ? 'active-filter' : ''}
                onClick={() => changeFilter(todolistId, 'all')}/>
        <Button title={'Active'} className={filter === 'active' ? 'active-filter' : ''}
                onClick={() => changeFilter(todolistId, 'active')}/>
        <Button title={'Completed'} className={filter === 'completed' ? 'active-filter' : ''}
                onClick={() => changeFilter(todolistId, 'completed')}/>
      </div>
    </div>
  )
}