import axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
};

export const fetchData = async (dispatch) => {
  const response = await axios.get(`/api/v1/task`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }); // Adjust the API endpoint
  dispatch({ type: "SET_TODOS", payload: response.data.items }); // Set todos data
};

export const setData = async (data, dispatch) => {
  const response = await axios.post(`/api/v1/task`, data, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }); // You need to implement your backend API
  dispatch({ type: "ADD_TODO", payload: response.data.items[0] });
};

export const deleteData = async (id, dispatch) => {
  await axios.delete(`/api/v1/task/${id}`, { headers });
  dispatch({ type: "REMOVE_TODO", payload: id });
};

export const updateData = async (id, event, dispatch) => {
  await axios.put(
    `/api/v1/task/${id}`,
    { completed: event.target.checked },
    { headers }
  );
  dispatch({
    type: "UPDATE_TODO",
    payload: { id: id, completed: event.target.checked },
  });
};
