import './App.css'
import {Todolist} from "./Todolist";
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = Record<string, TaskType[]>

function App() {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn 1', filter: 'active'},
    {id: todolistId2, title: 'What to learn 2', filter: 'completed'},
  ])

  const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
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
    const action = addTodolistAC(title);
    dispatchTodolistsReducer(action)
    dispatchTasksReducer(action)
  }
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchTodolistsReducer(action)
    dispatchTasksReducer(action)
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolistsReducer(changeTodolistTitleAC(todolistId, title))
  }
  const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatchTodolistsReducer(changeTodolistFilterAC(todolistId, filter))
  }

  const addTask = (todolistId: string, title: string) => {
    dispatchTasksReducer(addTaskAC(todolistId, title))
  }
  const removeTask = (todolistId: string, taskId: string) => {
    dispatchTasksReducer(removeTaskAC(todolistId, taskId))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTasksReducer(changeTaskTitleAC( todolistId,  taskId,  title ))
  }
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTasksReducer(changeTaskStatusAC( todolistId,  taskId,  isDone ))
  }

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed sx={{mt: '50px'}}>
        <Grid container marginBottom={'30px'}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>

        <Grid container spacing={4}>
          {todolists.map(todolist => {
            let tasksForTodolist = tasksObj[todolist.id]
            if (todolist.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
            }
            if (todolist.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
            }

            return <Grid key={todolist.id} size={{xs: 6, lg: 4}}>
              <Paper sx={{padding: '20px 15px'}}>
                <Todolist
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
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default App
