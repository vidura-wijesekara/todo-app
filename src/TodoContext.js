// TodoContext.js
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const TodoContext = createContext();

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS": // Add a new action type to set todos
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "GET_TODOS":
      return state.todos;
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/task", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }); // Adjust the API endpoint
      dispatch({ type: "SET_TODOS", payload: response.data.items }); // Set todos data
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
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
