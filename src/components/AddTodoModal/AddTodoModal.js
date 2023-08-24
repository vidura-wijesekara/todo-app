// AddTodoModal.js
import React, { useState } from "react";
import { useTodoContext } from "../../TodoContext";
import { Button, Grid, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";

const AddTodoModal = ({ closeModal }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const { dispatch } = useTodoContext();
  const data = [
    {
      title: title,
      completed: completed,
    },
  ];

  const addTodo = async () => {
    if (title.trim() === "") {
      return; // Don't add empty title todos
    }

    try {
      const response = await axios.post(`/api/v1/task`, data, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }); // You need to implement your backend API
      dispatch({ type: "ADD_TODO", payload: response.data.items[0] });
      console.log(response.data.items);
      closeModal();
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ border: "1px solid blue", margin: "auto", padding: "10px" }}
    >
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom>
          Add New Todo
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton aria-label="close" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </Grid>

      <Grid item xs={9}>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>

      <Grid
        item
        xs={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="contained" onClick={addTodo}>
          Confirm
        </Button>
        <Button variant="contained" color="error" onClick={closeModal}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodoModal;
