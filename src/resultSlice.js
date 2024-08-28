import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: {
    isResultShown: false,
    monthlyPayment: null,
    totalRepayment: null,
  },
  reducers: {
    toggleResult(state) {
      state.isResultShown = !state.isResultShown;
    },
    setMonthlyPayment(state, action) {
      state.monthlyPayment = action.payload;
    },
    setTotalRepayment(state, action) {
      state.totalRepayment = action.payload;
    },
    clearResult(state) {
      state.isResultShown = false;
      state.monthlyPayment = null;
      state.totalRepayment = null;
    },
  },
});

export const {
  toggleResult,
  setMonthlyPayment,
  setTotalRepayment,
  clearResult,
} = resultSlice.actions;
export default resultSlice.reducer;
