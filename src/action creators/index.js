import axios from "../apis/axios";

export const loginUser = formValues => async dispatch => {
  const user = await axios.get("/login", {
    params: formValues
  });
  dispatch({ type: "LOGIN_USER", payload: user.data });
};

export const registerUser = formValues => async dispatch => {
  const user = await axios.post("/register", formValues);
  dispatch({ type: "REGISTER_USER", payload: user.data });
};
