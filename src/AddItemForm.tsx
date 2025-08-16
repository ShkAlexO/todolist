import {Button} from "./Button";

export type AddItemFormPropsType = {

}

export const AddItemForm = () => {
  return (
    <div>
      <input
        value={newTaskTitle}
        onKeyDown={onKeyPressHandler}
        onChange={onNewTitleChangeHandler}
        className={error ? 'error' : ''}
      />
      <Button
        title={'+'}
        onClick={addTaskHandler}
      />
      {error && <p className={error ? 'error-message' : ''}>{error}</p>}
    </div>
  )
}