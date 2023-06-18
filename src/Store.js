import { legacy_createStore as createStore } from "redux";
import addReducers from "./reducers/addReducers";

const store = createStore(addReducers);
export default store;
