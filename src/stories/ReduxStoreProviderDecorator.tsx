import { v1 } from 'uuid';
import { createStore, combineReducers } from 'redux';
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {type AppRootStateType} from "../state/store";
import {Provider} from "react-redux";

// 📌 Объединяем редюсеры
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
});

// 📌 Начальное состояние для Storybook
const  initialGlobalState = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
  ],
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};

// 📌 Создаём store для Storybook
// @ts-expect-error: несовпадение типов preloadedState в createStore, игнорируем для Storybook
const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}