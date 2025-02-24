import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore";
import tokenReducer from "./tokenStore";

const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer
  }
});

export default store;
