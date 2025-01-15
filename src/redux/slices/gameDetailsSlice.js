import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interestStatus: null,
  playedStatus: null,
};

const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState,
  reducers: {
    setInterestStatus(state, action) {
      return {
        ...state,
        interestStatus: action.payload,
      };
    },
    setPlayedStatus(state, action) {
      return {
        ...state,
        playedStatus: action.payload,
      };
    },
  },
});

export const { setInterestStatus, setPlayedStatus } = gameDetailsSlice.actions;
export const selectGameDetails = (state) => state.gameDetails;
export default gameDetailsSlice.reducer;
