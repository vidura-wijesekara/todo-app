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
    console.log("fetching in action");
    getData();
  }, []);

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
