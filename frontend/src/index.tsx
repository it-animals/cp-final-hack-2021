import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./service/store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { AppLayout } from "./ui/containers/common/AppLayout";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppLayout>
        <App />
      </AppLayout>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
