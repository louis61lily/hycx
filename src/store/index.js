import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "./typeStore";
import tokenReducer from "./tokenStore";

const store = configureStore({
  reducer: {
    type: typeReducer,
    token: tokenReducer
  }
});

export default store;
