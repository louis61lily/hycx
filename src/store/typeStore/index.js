import { createSlice } from "@reduxjs/toolkit";

const typeSlice = createSlice({
  name: "typeStore",
  initialState: {
    type: 0 // 普通用户为0，管理员为1
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    }
  }
});

export const { setType } = typeSlice.actions;
export default typeSlice.reducer;
