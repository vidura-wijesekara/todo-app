// TodoList.js
import React from "react";
import { useTodoContext } from "../../TodoContext";
import TodoItem from "../TodoItem/TodoItem";
import CircularProgress from "@mui/material/CircularProgress";

const TodoList = () => {
  const { state } = useTodoContext();

  console.log("fjiedhguigvhns");
  console.log(state);

  return (
    <div>
      <h2>Todo List</h2>
      {state.todos.length === 0 && <CircularProgress />}
      {state.todos?.map((todo) => (
        <TodoItem key={todo._uuid} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
