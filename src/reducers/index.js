import { combineReducers } from "redux";
import _ from "lodash";

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
  action.type === "LOGOUT"
    ? "POSTS"
    : action.type === "SWITCH_TAB"
    ? action.payload
    : activeTab;

const activeChannelReducer = (
  activeChannel = { _id: false },
  { type, payload }
) => {
  if (type === "LOAD_USER_CHANNELS" || type === "CREATE_CHANNEL")
    return payload.length < 1 ? activeChannel : payload[0];

  return type === "SWITCH_CHANNEL" ? payload : activeChannel;
};

const userChannelsReducer = (channels = [], action) => {
  return action.type === "LOAD_USER_CHANNELS" ||
    action.type === "CREATE_CHANNEL"
    ? action.payload
    : channels;
};

const userPostsReducer = (posts = [], action) => {
  if (action.type === "SWITCH_CHANNEL" || action.type === "LOGOUT") return [];
  if (action.type === "NEW_POST")
    return [
      //...(posts.length > 30 ? posts.filter((p, i) => i !== 0) : posts),
      ...posts,
      action.payload
    ];

  if (action.type === "LOAD_USER_POSTS") return [...action.payload, ...posts];
  return posts;
};

const userInvitesReducer = (invites = [], action) => {
  return action.type === "LOAD_USER_INVITES" ? action.payload : invites;
};

const top5Reducer = (top5 = {}, { type, payload }) => {
  if (type === "FETCH_TOP5") {
    return _.assign(top5, { [payload.entity]: payload.data });
  }
  return top5;
};

export default combineReducers({
  user: loginReducer,
  channels: userChannelsReducer,
  posts: userPostsReducer,
  invites: userInvitesReducer,
  top5: top5Reducer,
  activeTab: activeTabReducer,
  activeChannel: activeChannelReducer
});
