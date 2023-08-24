// App.js
import React, { useState } from "react";
import { TodoProvider } from "./TodoContext";
import TodoList from "./components/TodoList/Todolist";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ack = [1, 2, 3, 4, 5];
  const ackk = ack.filter((item) => item !== 3);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <TodoProvider>
        <h1>Simple Todo App</h1>
        <Button onClick={openModal} variant="contained" endIcon={<AddIcon />}>
          Add New
        </Button>
        <TodoList />
        {isModalOpen && <AddTodoModal closeModal={closeModal} />}
      </TodoProvider>
    </div>
  );
}

export default App;
