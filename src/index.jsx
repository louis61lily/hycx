import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./app";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        headerBg: "#ffffff",
        bodyBg: "#ffffff"
      }
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
