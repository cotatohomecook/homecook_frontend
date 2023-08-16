// customerHomeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategoryData = createAsyncThunk(
  "customerHome/fetchData",
  async ({ category, currentPage }) => {
    console.log(currentPage);
    let url = `http://3.38.33.21:8080/api/shops/list?latitude=37.602643&longitude=126.924805&page=${currentPage}&size=5`;

    switch (category) {
      case "korean":
        url += "&category=한식";
        break;
      case "chinese":
        url += "&category=중식";
        break;
      case "western":
        url += "&category=양식";
        break;
      case "all":
      default:
        url += "&category=통합";
        break;
    }
    const response = await axios.get(url);
    return {
      data: response.data.data.content,
      totalPages: response.data.data.totalPages,
    };
  }
);

const customerHomeSlice = createSlice({
  name: "customerHome",
  initialState: {
    allData: [],
    data: [],
    showCategoryData: false,
    selectedCategory: null,
    isLoading: false,
    currentPage: 0,
    totalPages: 0,
    isButtonDisabled: false,
    initialLoad: false,
  },
  reducers: {
    setInitialLoad(state) {
      state.initialLoad = true;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setIsButtonDisabled(state, action) {
      state.isButtonDisabled = action.payload;
    },
    setSelectedCategory(state, action) {
      if (state.selectedCategory !== action.payload) {
        state.selectedCategory = action.payload;
        state.currentPage = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        const currentData = action.payload.data;
        state.data = currentData;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
        state.showCategoryData = true;
        if (state.currentPage === 0) {
          state.allData = currentData;
        } else {
          const prevData = state.allData.filter(
            (oldItem) =>
              !currentData.some((item) => item.shopId === oldItem.shopId)
          );
          state.allData = [...prevData, ...currentData];
        }

        state.data = currentData;
      });
  },
});

export const {
  setInitialLoad,
  setCurrentPage,
  setIsButtonDisabled,
  setSelectedCategory,
} = customerHomeSlice.actions;

export default customerHomeSlice.reducer;
