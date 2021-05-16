import React from "react";
import ReactDOM from "react-dom";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Spinner from "./components/Spinner";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
