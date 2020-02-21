import axios from "../apis/axios";

export const loginUser = ({ formValues, callback }) => async dispatch => {
  const user = await axios.get("/login", {
    params: formValues
  });
  dispatch({ type: "LOGIN_USER", payload: { user: user.data, callback } });
};

//export default { loginUser };
