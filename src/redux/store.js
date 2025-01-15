import { configureStore } from "@reduxjs/toolkit";
import followReducer from "./slices/followSlice";
import gameDetailsReducer from "./slices/gameDetailsSlice";

export const store = configureStore({
  reducer: { follow: followReducer, gameDetails: gameDetailsReducer },
});
