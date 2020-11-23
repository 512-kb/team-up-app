import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import _ from "lodash";

const loginReducer = (user = {}, action) => {
  const userAlreadyLoggedIn = JSON.parse(sessionStorage.getItem("user"));
  if (userAlreadyLoggedIn) return userAlreadyLoggedIn;
  switch (action.type) {
    case "LOGOUT":
      return {};
    case "LOGIN_USER":
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
    case "SWITCH_TAB":
    case "SWITCH_CHANNEL":
      return [];
    case "NEW_POST":
      return _.unionBy([...posts, ...action.payload], "_id");
    case "LOAD_USER_POSTS":
      return _.unionBy([...action.payload, ...posts], "_id");
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

export default combineReducers({
  user: loginReducer,
  channels: userChannelsReducer,
  posts: userPostsReducer,
  invites: userInvitesReducer,
  top5: top5Reducer,
  activeTab: activeTabReducer,
  activeChannel: activeChannelReducer,
  form: formReducer
});
