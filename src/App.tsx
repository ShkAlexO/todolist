import './App.css'
import {Todolist} from "./Todolist";
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
  type TodolistsStateType,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import type {AppRootState} from "./state/store";
import {useCallback} from "react";

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
  const todolists = useSelector<AppRootState, TodolistsStateType>((state) => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

  const dispatch = useDispatch()

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }, [dispatch])
  const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, filter))
  }, [dispatch])

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(addTaskAC(todolistId, title))
  }, [dispatch])
  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId))
  }, [dispatch])
  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, title))
  }, [dispatch])
  const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
  }, [dispatch])

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
            return <Grid key={todolist.id} size={{xs: 6, lg: 4}}>
              <Paper sx={{padding: '20px 15px'}}>
                <Todolist
                  todolistId={todolist.id}
                  title={todolist.title}
                  tasksForThisTodolist={tasks[todolist.id]}
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
