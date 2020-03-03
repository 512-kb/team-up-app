import { combineReducers } from "redux";
import _ from "lodash";

const loginReducer = (user = { username: false }, action) => {
  const userAlreadyLoggedIn = JSON.parse(sessionStorage.getItem("user"));
  if (userAlreadyLoggedIn) return userAlreadyLoggedIn;
  switch (action.type) {
    case "LOGOUT":
      return { username: false };
    case "LOGIN_USER":
    case "REGISTER_USER":
      return action.payload;
    default:
      return user;
  }
};

const activeTabReducer = (activeTab = "POSTS", action) => {
  switch (action.type) {
    case "LOGOUT":
      return "POSTS";
    case "SWITCH_TAB":
      return action.payload;
    default:
      return activeTab;
  }
};

const activeChannelReducer = (
  activeChannel = { _id: false },
  { type, payload }
) => {
  switch (type) {
    case "LOGOUT":
      return { _id: false };
    case "LOAD_USER_CHANNELS":
    case "CREATE_CHANNEL":
      return payload.length < 1 ? activeChannel : payload[0];
    case "SWITCH_CHANNEL":
      return payload;
    default:
      return activeChannel;
  }
};

const userChannelsReducer = (channels = [], action) => {
  switch (action.type) {
    case "LOGOUT":
      return [];
    case "LOAD_USER_CHANNELS":
    case "CREATE_CHANNEL":
      return action.payload;
    default:
      return channels;
  }
};

const userPostsReducer = (posts = [], action) => {
  switch (action.type) {
    case "LOGOUT":
    case "SWITCH_CHANNEL":
      return [];
    case "NEW_POST":
      return [...posts, action.payload];
    case "LOAD_USER_POSTS":
      return [...action.payload, ...posts];
    default:
      return posts;
  }
};

const userInvitesReducer = (invites = [], action) => {
  switch (action.type) {
    case "LOGOUT":
      return [];
    case "LOAD_USER_INVITES":
      return action.payload;
    default:
      return invites;
  }
};

const top5Reducer = (top5 = {}, { type, payload }) => {
  switch (type) {
    case "LOGOUT":
      return {};
    case "FETCH_TOP5":
      return _.assign(top5, { [payload.entity]: payload.data });
    default:
      return top5;
  }
};

const pageNoReducer = (page = 0, { type }) => {
  switch (type) {
    case "LOGOUT":
      return 0;
    case "LOAD_USER_POSTS":
      return ++page;
    default:
      return page;
  }
};

export default combineReducers({
  user: loginReducer,
  channels: userChannelsReducer,
  posts: userPostsReducer,
  invites: userInvitesReducer,
  top5: top5Reducer,
  activeTab: activeTabReducer,
  activeChannel: activeChannelReducer,
  page: pageNoReducer
});
