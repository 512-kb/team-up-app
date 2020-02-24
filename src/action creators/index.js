import axios from "../apis/axios";

export const loginUser = formValues => async dispatch => {
  const user = await axios.get("/login", {
    params: formValues
  });
  dispatch({ type: "LOGIN_USER", payload: user.data });
};

export const logoutUser = () => {
  return { type: "LOGOUT" };
};

export const registerUser = formValues => async dispatch => {
  const user = await axios.post("/register", formValues);
  dispatch({ type: "REGISTER_USER", payload: user.data });
};

export const loadUserData = username => async dispatch => {
  const channels = (await axios.get("/channels", { params: { username } }))
    .data;
  const invites = (await axios.get("/invitations", { params: { username } }))
    .data;
  const posts = (
    await axios.get("/posts", {
      params: { username, channel_id: channels[0]._id }
    })
  ).data;
  dispatch({
    type: "LOAD_USER_DATA",
    payload: { channels, invites, posts }
  });
};

export const loadTop5 = () => async dispatch => {
  const top5 = (await axios.get("/top5")).data;
  dispatch({ type: "FETCH_TOP5", payload: top5 });
};
