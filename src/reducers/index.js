import { combineReducers } from "redux";
import _ from "lodash";

const loginReducer = (user = { username: false }, action) => {
  if (action.type === "LOGIN_USER") {
    return action.payload;
  }
  return user;
};

const registerReducer = (user = { username: false }, action) => {
  if (action.type === "REGISTER_USER") {
    return action.payload;
  }
  return user;
};

const userDataReducer = (userData = {}, action) => {
  if (action.type === "LOAD_USER_DATA") {
    return _.assign(userData, action.payload);
  }
  return userData;
};

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
