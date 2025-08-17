import type {FilterValuesType, TaskType} from './App'
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

  const changeTodolistTitleHandler = (title:string) => {
    changeTodolistTitle(todolistId, title)
  }

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        <Button title={'x'} onClick={() => removeTodolist(todolistId)}/>
      </h3>
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
                  onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}
                />
                <EditableSpan
                  title={task.title}
                  onChange={(title: string) => changeTaskTitle(todolistId, task.id, title)}/>
                <Button title={'x'} onClick={() => removeTask(todolistId, task.id)}/>
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button title={'All'} className={filter === 'all' ? 'active-filter' : ''}
                onClick={() => changeTodolistFilter(todolistId, 'all')}/>
        <Button title={'Active'} className={filter === 'active' ? 'active-filter' : ''}
                onClick={() => changeTodolistFilter(todolistId, 'active')}/>
        <Button title={'Completed'} className={filter === 'completed' ? 'active-filter' : ''}
                onClick={() => changeTodolistFilter(todolistId, 'completed')}/>
      </div>
    </div>
  )
}