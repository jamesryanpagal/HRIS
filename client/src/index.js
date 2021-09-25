import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { persiststore, store } from "./Redux/Redux_store/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persiststore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
