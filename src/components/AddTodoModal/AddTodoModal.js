// AddTodoModal.js
import React, { useState } from "react";
import { useTodoContext } from "../../services/TodoProvider";
import { Button, Grid, TextField, IconButton, Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { setData } from "../../services/TodoFunctions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddTodoModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const { dispatch } = useTodoContext();
  const data = [
    {
      title: title,
      completed: completed,
    },
  ];

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTodo = () => {
    if (title.trim() === "") {
      return; // Don't add empty title todos
    }

    try {
      setData(data, dispatch);
      handleClose();
      closeModal();
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          closeModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              <IconButton
                aria-label="close"
                onClick={() => {
                  handleClose();
                  closeModal();
                }}
              >
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
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleClose();
                  closeModal();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddTodoModal;
