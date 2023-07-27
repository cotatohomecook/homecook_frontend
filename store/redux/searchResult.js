import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk(
  "searchResults/fetchSearchResults",
  async ({ searchText, searchType, currentPage, orderBy }) => {
    console.log(searchText, searchType, currentPage, orderBy);
    try {
      const url =
        searchType === "상호명"
          ? `http://3.38.33.21:8080/api/shops/search?latitude=37.60264&longitude=126.924805&shopName=${searchText}&page=${currentPage}&size=6&orderBy=${orderBy}`
          : `http://3.38.33.21:8080/api/shops/search?latitude=37.602643&longitude=126.924805&menuName=${searchText}&page=${currentPage}&size=6&orderBy=${orderBy}`;

      const response = await fetch(url);
      const data = await response.json();

      let sortedResults = data.data.content;

      return {
        sortedResults,
        currentPage,
        totalPages: data.data.totalPages,
      };
    } catch (error) {
      console.error("검색 에러:", error);
      throw error;
    }
  }
);

const searchResultSlice = createSlice({
  name: "searchResults",
  initialState: {
    searchResults: [],
    loading: false,
    modalVisible: false,
    currentPage: 0,
    isLastPage: false,
    searchType: "상호명",
  },
  reducers: {
    updateSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    currentPageIncrement: (state) => {
      state.currentPage += 1;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentPage = 0;
      state.isLastPage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.isLastPage =
          action.payload.currentPage + 1 >= action.payload.totalPages;
        state.searchResults = [
          ...state.searchResults,
          ...action.payload.sortedResults,
        ];
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { actions: searchActions } = searchResultSlice;
export default searchResultSlice.reducer;
