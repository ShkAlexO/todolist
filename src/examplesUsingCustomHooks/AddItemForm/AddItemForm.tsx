import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TextField from "@mui/material/TextField";
import {memo} from "react";
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = memo(({addItem}: AddItemFormPropsType) => {
    const {
        newTitle,
        onNewTitleChangeHandler,
        addTaskHandler,
        onKeyPressHandler,
        error
    } = useAddItemForm({addItem})

    return (
        <div>
            <TextField
                size={'small'}
                label="Title Todolist"
                variant="outlined"
                value={newTitle}
                onKeyDown={onKeyPressHandler}
                onChange={onNewTitleChangeHandler}
                helperText={error}
                error={!!error}
                sx={{marginRight: '5px'}}
            />

            <IconButton
                size={"medium"}
                color={'primary'}
                onClick={addTaskHandler}
            >
                <AddCircleOutlineIcon fontSize={'medium'}/>
            </IconButton>
        </div>
    )
})