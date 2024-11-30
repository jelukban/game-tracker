import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));
const queryClient = new QueryClient();

root.render(
  // <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </Provider>
);
