import { combineReducers } from "redux";
//import _ from "lodash";

const loginReducer = (user = { username: false }, action) => {
  const userAlreadyLoggedIn = JSON.parse(sessionStorage.getItem("user"));
  if (userAlreadyLoggedIn) return userAlreadyLoggedIn;
  if (action.type === "LOGIN_USER") {
    return action.payload;
  }
  return user;
};

const registerReducer = (user = { username: false }, action) =>
  action.type === "REGISTER_USER" ? action.payload : user;

const userDataReducer = (userData = {}, action) =>
  action.type === "LOAD_USER_DATA" ? action.payload : userData;

const top5Reducer = (top5 = [], action) => {
  if (action.type === "FETCH_TOP5") {
    return action.payload;
  }
  return top5;
};

export default combineReducers({
  user: loginReducer,
  registeredUser: registerReducer,
  userData: userDataReducer,
  top5: top5Reducer
});
