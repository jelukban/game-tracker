import { Provider } from "react-redux";
import { createStore } from "redux";
import ReactDOM from "react-dom/client";
import App from "./App.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Provider>
    <App />
  </Provider>
);
