import "./index.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { AppConnected } from "./components/App/Connected/AppConnected";
import { store } from "./store";

ReactDOM.render(
    <Provider store={store}>
        <AppConnected />
    </Provider>,
    document.getElementById("root")
);
