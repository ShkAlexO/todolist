import '../App.css'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist";
import {useApp} from "./hooks/useApp";

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
    const {
        todolists,
        tasks,
        addTodolist,
        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
        addTask,
        removeTask,
        changeTaskTitle,
        changeTaskStatus
    } = useApp()

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
