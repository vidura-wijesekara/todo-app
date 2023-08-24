// TodoItem.js
import React, { useState } from "react";
import { useTodoContext } from "../../TodoContext";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import axios from "axios";

const TodoItem = ({ todo }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  };
  const { dispatch } = useTodoContext();
  const [completed, setCompleted] = React.useState(todo.completed);

  const handleChange = (event) => {
    setCompleted(event.target.checked);
    updateTodo(todo._uuid, event);
  };

  const removeTodo = async (id) => {
    setIsDeleted(true);
    try {
      await axios.delete(`/api/v1/task/${id}`, { headers });
      dispatch({ type: "REMOVE_TODO", payload: id });
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const updateTodo = async (id, event) => {
    try {
      await axios.put(
        `/api/v1/task/${id}`,
        { completed: event.target.checked },
        { headers }
      );
      console.log(event.target.checked);
      dispatch({
        type: "UPDATE_TODO",
        payload: { id: id, completed: event.target.checked },
      });
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
