import { combineReducers } from "redux";

const loginReducer = (user = { _id: false }, action) => {
  if (action.type === "LOGIN_USER") {
    return action.payload;
  }
  return user;
};

const registerReducer = (user = { _id: false }, action) => {
  if (action.type === "REGISTER_USER") {
    return action.payload;
  }
  return user;
};

export default combineReducers({
  user: loginReducer,
  registeredUser: registerReducer
});
