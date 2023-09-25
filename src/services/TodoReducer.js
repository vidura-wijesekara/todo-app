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

export default todoReducer;
