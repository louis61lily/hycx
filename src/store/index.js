import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "./typeStore";

const store = configureStore({
  reducer: {
    type: typeReducer
  }
});

export default store;
