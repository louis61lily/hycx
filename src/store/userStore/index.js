import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    type: Number(sessionStorage.getItem("type")) || 0, // 普通用户为0，管理员为1
    email: sessionStorage.getItem("email") || "" // 邮箱
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
      sessionStorage.setItem("type", action.payload);
    },
    removeType: (state) => {
      state.type = 0;
      sessionStorage.removeItem("type");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      sessionStorage.setItem("email", action.payload);
    },
    removeEmail: (state) => {
      state.email = "";
      sessionStorage.removeItem("email");
    }
  }
});

export const { setType, setEmail, removeEmail } = userSlice.actions;
export default userSlice.reducer;
