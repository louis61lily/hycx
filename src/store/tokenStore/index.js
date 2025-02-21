import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: sessionStorage.getItem("token") || null
  }, // 初始状态
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload);
    },
    removeToken(state) {
      state.token = null;
      sessionStorage.removeItem("token");
    }
  } // 更新状态的方法
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
