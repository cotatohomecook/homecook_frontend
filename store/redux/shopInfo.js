import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "shopInfo/fetchData",
  async (shopId) => {
    try {
      const url = `http://3.38.33.21:8080/api/shops/info/${shopId}`;
      const response = await axios.get(url);
      console.log("GET 요청 성공", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("GET 요청 실패:", error);
      throw error;
    }
  }
);

// 초기 상태 정의
const initialState = {
  data: null,
  error: null,
  isLoading: false,
  selectedMenuId: null,
};

const shopInfoSlice = createSlice({
  name: "shopInfo",
  initialState,
  reducers: {
    setSelectedMenuId: (state, action) => {
      state.selectedMenuId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { actions: shopInfoActions } = shopInfoSlice;

export default shopInfoSlice.reducer;
