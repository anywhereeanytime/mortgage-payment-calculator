import { createSlice } from "@reduxjs/toolkit";

const formErrorSlice = createSlice({
  name: "formError",
  initialState: {
    errors: {},
  },
  reducers: {
    setError(state, action) {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    clearError(state, action) {
      const field = action.payload;
      delete state.errors[field];
    },
    clearAllErrors(state) {
      state.errors = {};
    },
  },
});

export const { setError, clearError, clearAllErrors } = formErrorSlice.actions;
export default formErrorSlice.reducer;
