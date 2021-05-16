import { combineReducers } from "redux";
import tableReducer from "./table-reducer";

export default combineReducers({
  table: tableReducer,
});
