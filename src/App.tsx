import './App.css'
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

export type TasksState = Record<string, TaskType[]>

function App() {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to learn 1', filter: 'active'},
    {id: todolistId2, title: 'What to learn 2', filter: 'completed'},
  ])

  const [tasksObj, setTasksObj] = useState<TasksState>({
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

  const addTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: TodolistType = {id: todolistId, title, filter: 'active'}
    setTodolists([newTodolist, ...todolists])
    setTasksObj({...tasksObj, [todolistId]: []})
  }

  const removeTodolist = (todolistId: string) => {
    const filteredTodolists = todolists.filter(todolist => todolist.id !== todolistId)
    setTodolists([...filteredTodolists])
    delete tasksObj[todolistId]
    setTasksObj({...tasksObj})
  }

  const addTask = (todolistId: string, title: string) => {
    const tasks = tasksObj[todolistId]
    tasksObj[todolistId] = [{id: v1(), title: title, isDone: false}, ...tasks]
    setTasksObj({...tasksObj})
  }

  const removeTask = (todolistId: string, taskId: string) => {
    const tasks = tasksObj[todolistId]
    tasksObj[todolistId] = tasks.filter(task => task.id !== taskId)
    setTasksObj({...tasksObj})
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    const todolist = todolists.find(todolist => todolist.id === todolistId)
    if (todolist) {
      todolist.title = title
      setTodolists([...todolists])
    }
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    const tasks = tasksObj[todolistId]
    const task = tasks.find(task => task.id === taskId)
    if (task) {
      task.title = title
      setTasksObj({...tasksObj})
    }
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const tasks = tasksObj[todolistId]
    const task = tasks.find(task => task.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksObj({...tasksObj})
    }
  }

  const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
    const todolist = todolists.find(todolist => todolist.id === todolistId)
    if (todolist) {
      todolist.filter = filter
      setTodolists([...todolists])
    }
  }

  return (
    <div className="app">
      <AddItemForm addItem={addTodolist}/>
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
            changeTodolistTitle={changeTodolistTitle}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            filter={todolist.filter}
          />
        })}
      </div>
    </div>
  )
}

export default App
