import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./tokenStore";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});

export default store;
