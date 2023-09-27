// TodoList.js
import React, { useEffect } from "react";
import { useTodoContext } from "../../services/TodoProvider";
import TodoItem from "../TodoItem/TodoItem";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchData } from "../../services/TodoFunctions";

const TodoList = () => {
  const { state } = useTodoContext();
  const { dispatch } = useTodoContext();

  const getData = () => {
    try {
      fetchData(dispatch);
    } catch (error) {
      console.error("Error fetching data", error);
      console.log(error);
      alert(`Error has occurred!`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
