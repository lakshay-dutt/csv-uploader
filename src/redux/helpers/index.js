import { fetchTableAction, resetTableAction } from "../actions/tableAction";
import { store } from "../store";

export const resetTable = () => store.dispatch(resetTableAction());

export const fetchTable = payload => store.dispatch(fetchTableAction(payload));
