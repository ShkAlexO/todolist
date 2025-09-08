import {action} from "storybook/actions";
import {EditableSpan} from "./EditableSpan";

export default {
  title: 'EditableSpan Component', // ❗ Заголовок в боковой панели Storybook
  component: EditableSpan,         // ❗ Компонент, для которого пишем stories
};

// 📌 Создаём callback для Storybook Actions
const onChangeCallback = action("Change EditableSpan");

export const EditableSpanBaseExample = () => {
  return (
    <>
      <EditableSpan
        title={'Start value'}
        onChange={onChangeCallback}
      />
    </>
  );
};