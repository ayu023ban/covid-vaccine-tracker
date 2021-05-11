import { createSlice } from "@reduxjs/toolkit";
import beep from "../../assets/beep.mp3";

const initialState = {
  result: {},
  soundEnabled: true,
  audio: new Audio(beep),
};

const resultSlice = createSlice({
  name: "player2",
  initialState,
  reducers: {
    changeResult(state, { payload }) {
      state.result[payload.pincode] = payload.result;
    },
    deleteResult(state, { payload }) {
      delete state.result[payload];
    },
  },
});

export const { changeResult, deleteResult } = resultSlice.actions;

export default resultSlice.reducer;
