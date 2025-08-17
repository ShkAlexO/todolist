import {type ChangeEvent, type KeyboardEvent, useState} from "react";

export type EditableSpanPropsType = {
  title: string
  onChange: (title: string) => void
}
export const EditableSpan = ({title, onChange}: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(title)

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false)
      onChange(value)
    }
  }

  const activateEditMode = () => {
    setEditMode(false)
    onChange(value)
  }

  return (
    editMode ?
      <input
        type="text"
        value={value}
        onChange={onChangeTitleHandler}
        onKeyDown={onKeyPressHandler}
        onBlur={activateEditMode}
        autoFocus
      /> :
      <span onDoubleClick={() => setEditMode(true)}>
        {value}
      </span>
  )
}