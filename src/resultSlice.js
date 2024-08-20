import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: {
    isResultShown: false,
  },
  reducers: {
    toggleResult(state) {
      state.isResultShown = !state.isResultShown;
    },
  },
});

export const { toggleResult } = resultSlice.actions;
export default resultSlice.reducer;
