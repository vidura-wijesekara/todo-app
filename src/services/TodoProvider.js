import React from "react";
import { createContext, useReducer, useEffect, useContext } from "react";
import todoReducer from "./TodoReducer"; // Import the reducer
import { fetchData } from "./TodoFunctions";

const TodoContext = createContext();

const initialState = {
  todos: [],
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodoContext };
