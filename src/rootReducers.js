import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/movies";

export default combineReducers({
  user,
  movies
});