import { combineReducers } from "redux";

const loginReducer = (user = "NO_USER", action) => {
  if (action.type === "LOGIN_USER") {
    if (action.payload.user === "NOT_FOUND") action.payload.callback.fail();
    else action.payload.callback.success(action.payload.user);
    return action.payload.user;
  }

  return user;
};

export default combineReducers({
  user: loginReducer
});
