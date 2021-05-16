import { FETCH_TABLE, RESET_TABLE } from "./types";

export const fetchTableAction = payload => dispatch => {
  dispatch({
    type: FETCH_TABLE,
    payload: {
      labels: payload.labels,
      items: payload.items,
      total: payload.total,
    },
  });
};

export const resetTableAction = _ => dispatch => {
  dispatch({
    type: RESET_TABLE,
  });
};
