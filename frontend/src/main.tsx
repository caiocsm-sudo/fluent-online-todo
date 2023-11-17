import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FluentProvider className="fluent" theme={webLightTheme}>
        <App />
      </FluentProvider>
    </Provider>
  </React.StrictMode>
);
