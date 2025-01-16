import { configureStore } from "@reduxjs/toolkit";
import followReducer from "./slices/followSlice";

export const store = configureStore({
  reducer: { follow: followReducer },
});
