import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: {
    isResultShown: false,
    monthlyPayment: null,
  },
  reducers: {
    toggleResult(state) {
      state.isResultShown = !state.isResultShown;
    },
    setMonthlyPayment(state, action) {
      state.monthlyPayment = action.payload;
    },
    clearResult(state) {
      state.isResultShown = false;
      state.monthlyPayment = null;
    },
  },
});

export const { toggleResult, setMonthlyPayment, clearResult } =
  resultSlice.actions;
export default resultSlice.reducer;
