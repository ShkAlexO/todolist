import {AddItemForm} from './AddItemForm'
import {action} from "storybook/actions";

export default {
  title: 'AddItemForm Component', // Заголовок, как компонент будет отображаться в боковой панели Storybook
  component: AddItemForm          // Сам компонент, который будет использоваться в stories
}

// Создаём callback для Storybook, чтобы отслеживать события в панели Actions
const addItemFormCallback = action('была нажата кнопка отправки значения input');
// Любой вызов этой функции будет отображаться в панели Actions Storybook
// Это удобно для тестирования, что кнопки или события срабатывают корректно
// Значением, которое мы получим в панели Actions, будет тот аргумент,
// который передаётся при вызове функции addItem внутри компонента
// Например, если пользователь ввёл текст в input, в панели мы увидим этот текст
// Отдельная story — конкретный вариант отображения компонента

export const AddItemFormBaseExample = () => {
  return <AddItemForm addItem={addItemFormCallback}/>;
}