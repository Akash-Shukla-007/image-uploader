import addReducers from "./addReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  items: addReducers,
});

export default rootReducer;
