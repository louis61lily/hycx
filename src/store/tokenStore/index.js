import { createSlice } from "@reduxjs/toolkit";

const tokenStore = createSlice({
  name: "tokenStore",
  initialState: {
    token: localStorage.getItem("token") || null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    }
  }
});

export const { setToken, removeToken } = tokenStore.actions;
export default tokenStore;
