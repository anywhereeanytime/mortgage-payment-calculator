import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "./resultSlice";
import formErrorReducer from "./formErrorSlice";

const store = configureStore({
  reducer: {
    result: resultReducer,
    formError: formErrorReducer,
  },
});

export default store;
