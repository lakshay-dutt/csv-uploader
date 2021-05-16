import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "../reducers";
import initialState from "./state";

const middleware = [thunk];
const persistConfig = {
  key: "table",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);

export { store, persistor };
