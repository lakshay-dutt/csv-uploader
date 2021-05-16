import { FETCH_TABLE, RESET_TABLE } from "../actions/types";
import initialState from "../store/state";

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE:
      let total = action.payload.total || action.payload.items.length || 0;
      return { ...state, ...action.payload, total };
    case RESET_TABLE:
      return initialState;
    default:
      return state;
  }
};
export default tableReducer;
