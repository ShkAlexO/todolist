import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})

// 1 вариант типизировать состояние всего state (вручную описать структуру состояния)
// type AppRootState = {
//   todolists: Array<TodolistType>,
//   tasks: TasksStateType,
// }

// 2 вариант  типизировать состояние всего state (автоматически вывести тип состояния через rootReducer)
export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer)

// @ts-expect-error: extend window object with custom store property
window.store = store;
