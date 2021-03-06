import axios from "../apis/axios";

export const loginUser = (formValues) => async (dispatch) => {
  const { data: user } = await axios.get("/login", {
    params: formValues
  });
  dispatch({ type: "LOGIN_USER", payload: user });
};

export const logoutUser = () => {
  return { type: "LOGOUT" };
};

export const switchTab = (tab) => {
  return { type: "SWITCH_TAB", payload: tab };
};

export const switchChannel = (channel) => {
  return { type: "SWITCH_CHANNEL", payload: channel };
};

export const loadChannels = (username) => async (dispatch) => {
  const { data: channels } = await axios.get("/channels", {
    params: { username }
  });
  dispatch({
    type: "LOAD_USER_CHANNELS",
    payload: channels
  });
};

export const loadPosts = (posts) => {
  return {
    type: "LOAD_USER_POSTS",
    payload: posts
  };
};

export const loadInvites = (username) => async (dispatch) => {
  const invites = (await axios.get("/invitations", { params: { username } }))
    .data;
  dispatch({
    type: "LOAD_USER_INVITES",
    payload: invites
  });
};

export const loadTop5 = (entity, filter) => async (dispatch) => {
  filter =
    filter.$gte || filter.$lte ? JSON.stringify({ created: filter }) : {};
  const data = (await axios.get("/top5", { params: { entity, filter } })).data;
  dispatch({ type: "FETCH_TOP5", payload: { entity, data } });
};

export const respondToInvite = (invite_data, isAccepted = true) => async () => {
  if (isAccepted) await axios.put("/invitations", invite_data);
  else await axios.delete("/invitations", { params: invite_data });
  return null;
};

export const createChannel = (formValues) => async (dispatch) => {
  const msg = (await axios.post("/channels", formValues)).data.msg;
  alert(msg);
  const channels = (
    await axios.get("/channels", { params: { username: formValues.username } })
  ).data;
  dispatch({ type: "CREATE_CHANNEL", payload: channels });
};

export const createInvite = async (formValues) => {
  const res = (await axios.post("/invitations", formValues)).data;
  return res;
};

export const updatePosts = (newPost) => {
  return { type: "NEW_POST", payload: newPost };
};
