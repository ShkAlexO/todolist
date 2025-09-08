import { Task } from './Task';
import {action} from "storybook/actions";

export default {
  title: 'Task Component', // ❗ Заголовок в боковой панели Storybook
  component: Task,         // ❗ Компонент, для которого пишем stories
};

// 📌 Создаём callback для Storybook Actions
const changeTaskStatusCallback = action("Change task status clicked");
const changeTaskTitleCallback = action("Change task title clicked");
const editTaskTitleCallback = action("Edit task title clicked");
const removeTaskCallback = action("Remove task clicked");

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{ id: '1', isDone: true, title: 'CSS' }}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={'todolistId1'}
      />
      <Task
        task={{ id: '2', isDone: false, title: 'HTML' }}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={editTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={'todolistId2'}
      />
    </>
  );
};