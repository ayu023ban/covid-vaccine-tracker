import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pincodes: [],
};

const pincodeSlice = createSlice({
  name: "player2",
  initialState,
  reducers: {
    add(state, { payload }) {
      const newArr = Array.from(state.pincodes);
      newArr.push(payload);
      state.pincodes = newArr.filter(
        (el, index, ar) => ar.indexOf(el) === index
      );
    },
    remove(state, { payload }) {
      state.pincodes = state.pincodes.filter((el) => el !== payload);
    },
  },
});

export const { add, remove } = pincodeSlice.actions;

export default pincodeSlice.reducer;
