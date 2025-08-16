import './App.css'
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to learn 1', filter: 'active'},
    {id: todolistId2, title: 'What to learn 2', filter: 'completed'},
  ])

  const [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: '2HTML&CSS', isDone: true},
      {id: v1(), title: '2JS', isDone: false},
      {id: v1(), title: '2ReactJS', isDone: true}
    ]
  })

  const removeTodolist = (todolistId:string) => {
    const filteredTodolists  = todolists.filter(todolist => todolist.id !== todolistId)
    setTodolists([...filteredTodolists])
    delete tasksObj[todolistId]
    setTasksObj({...tasksObj})
  }

  const addTask = (id: string, title: string) => {
    const tasks = tasksObj[id]
    const newTask = {id: v1(), title: title, isDone: false}
    const newTasks = [newTask, ...tasks]
    tasksObj[id] = newTasks
    setTasksObj({...tasksObj})
  }

  const removeTask = (id: string, taskId: string) => {
    const tasks = tasksObj[id]
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    tasksObj[id] = filteredTasks
    setTasksObj({...tasksObj})
  }

  const changeStatus = (id: string, taskId: string, isDone: boolean) => {
    const tasks = tasksObj[id]
    const task = tasks.find(task => task.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksObj({...tasksObj})
    }
  }

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    const todolist = todolists.find(todolist => todolist.id === todolistId)
    if (todolist) {
      todolist.filter = filter
      setTodolists([...todolists])
    }
  }

  return (
    <div className="app">
      <div>
        {todolists.map(todolist => {
          let tasksForTodolist = tasksObj[todolist.id]
          if (todolist.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
          }
          if (todolist.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
          }

          return <Todolist
            key={todolist.id}
            todolistId={todolist.id}
            title={todolist.title}
            tasks={tasksForTodolist}
            removeTodolist={removeTodolist}
            addTask={addTask}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeFilter={changeFilter}
            filter={todolist.filter}
          />
        })}
      </div>
    </div>
  )
}

export default App
