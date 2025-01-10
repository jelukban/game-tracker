import { configureStore } from "@reduxjs/toolkit";
import followReducer from "./reducers";

export const store = configureStore({ reducer: { follow: followReducer } });
