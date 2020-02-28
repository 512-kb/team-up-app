import { combineReducers } from "redux";
//import _ from "lodash";

const loginReducer = (user = { username: false }, action) => {
  const userAlreadyLoggedIn = JSON.parse(sessionStorage.getItem("user"));
  if (userAlreadyLoggedIn) return userAlreadyLoggedIn;
  if (action.type === "LOGIN_USER" || action.type === "REGISTER_USER") {
    return action.payload;
  }
  if (action.type === "LOGOUT") {
    return { username: false };
  }
  return user;
};

const activeTabReducer = (activeTab = "POSTS", action) =>
  action.type === "SWITCH_TAB" ? action.payload : activeTab;

const userChannelsReducer = (channels = [], action) => {
  return action.type === "LOAD_USER_CHANNELS" ||
    action.type === "CREATE_CHANNEL"
    ? action.payload
    : channels;
};

const userPostsReducer = (posts = [], action) => {
  return action.type === "LOAD_USER_POSTS" ? action.payload : posts;
};

const userInvitesReducer = (invites = [], action) => {
  return action.type === "LOAD_USER_INVITES" ? action.payload : invites;
};

const top5Reducer = (top5 = [], action) => {
  if (action.type === "FETCH_TOP5") {
    return action.payload;
  }
  return top5;
};

export default combineReducers({
  user: loginReducer,
  channels: userChannelsReducer,
  posts: userPostsReducer,
  invites: userInvitesReducer,
  top5: top5Reducer,
  activeTab: activeTabReducer
});
