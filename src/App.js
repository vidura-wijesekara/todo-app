// App.js
import React, { useState } from "react";
import { TodoProvider } from "./services/TodoProvider";
import TodoList from "./components/TodoList/Todolist";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
