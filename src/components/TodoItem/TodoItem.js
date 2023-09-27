// TodoItem.js
import React, { useState } from "react";
import { useTodoContext } from "../../services/TodoProvider";
import Radio from "@mui/material/Radio";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { deleteData, updateData } from "../../services/TodoFunctions";

const TodoItem = ({ todo }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const { dispatch } = useTodoContext();
  const [completed, setCompleted] = useState(todo.completed);

  const handleChange = (event) => {
    setCompleted(event.target.checked);
    updateTodo(todo._uuid, event);
  };

  const removeTodo = (id) => {
    setIsDeleted(true);
    try {
      deleteData(id, dispatch);
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const updateTodo = (id, event) => {
    try {
      updateData(id, event, dispatch);
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  return (
    <div>
      {!isDeleted && (
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ borderColor: "black" }}
        >
          <Grid item xs={2}>
            <Radio
              checked={completed}
              onChange={handleChange}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              {todo.title}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-label="close"
              onClick={() => removeTodo(todo._uuid)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default TodoItem;
