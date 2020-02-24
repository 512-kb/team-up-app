import { combineReducers } from "redux";
//import _ from "lodash";

const loginReducer = (user = { username: false }, action) => {
  const userAlreadyLoggedIn = JSON.parse(sessionStorage.getItem("user"));
  if (userAlreadyLoggedIn) return userAlreadyLoggedIn;
  if (action.type === "LOGIN_USER") {
    return action.payload;
  }
  if (action.type === "REGISTER_USER") {
    return action.payload;
  }
  if (action.type === "LOGOUT") {
    return { username: false };
  }
  return user;
};

const userDataReducer = (userData = {}, action) =>
  action.type === "LOAD_USER_DATA" ? action.payload : userData;

const top5Reducer = (top5 = false, action) => {
  if (action.type === "FETCH_TOP5") {
    return action.payload;
  }
  return top5;
};

export default combineReducers({
  user: loginReducer,
  userData: userDataReducer,
  top5: top5Reducer
});
