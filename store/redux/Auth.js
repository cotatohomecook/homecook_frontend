// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerAccessToken: "",
  sellerAccessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.customerAccessToken = action.payload.customerAccessToken;
      state.sellerAccessToken = action.payload.sellerAccessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setLoginData } = authSlice.actions;
export default authSlice.reducer;
