import type {FilterValuesType, TaskType} from './App'
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";

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

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title)
  }

  return (
    <div>
      <h3>{title} <Button title={'x'} onClick={() => removeTodolist(todolistId)}/></h3>
      <AddItemForm addItem={addTaskHandler}/>

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