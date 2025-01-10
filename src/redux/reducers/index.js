import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null };

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setId(state, action) {
      return action.payload;
    },
  },
});

export const { setId } = followSlice.actions;
export const selectId = (state) => state.follow.id;
export default followSlice.reducer;
