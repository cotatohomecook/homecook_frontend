import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookmarkData = createAsyncThunk(
  "bookmark/fetchBookmarkData",
  async () => {
    try {
      const url = "http://3.38.33.21:8080/api/bookmarks";
      const response = await axios.get(url);
      console.log("GET 요청 성공:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("GET 요청 실패:", error);
      throw error;
    }
  }
);

export const sendBookmarkData = createAsyncThunk(
  "bookmark/sendBookmarkData",
  async ({ ids, categories }, { dispatch }) => {
    try {
      const url = `http://3.38.33.21:8080/api/bookmarks/${ids}/${categories}`;
      await axios.post(url);
      console.log("POST 요청 성공");
      // 즐겨찾기 데이터를 업데이트하기 위해 fetchBookmarkData 호출
      dispatch(fetchBookmarkData());
    } catch (error) {
      console.log("POST 요청 실패:", error);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    ids: [],
    categories: [],
    sendingStatus: "idle",
    error: null,
    bookmarks: [],
    fetchingStatus: "idle",
    folderNames: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      const index = state.ids.indexOf(action.payload.id);
      if (index !== -1) {
        state.ids.splice(index, 1);
      }
    },
    addCategory: (state, action) => {
      const newCategory = action.payload;
      if (!state.categories.includes(newCategory)) {
        state.categories.push(newCategory);
        state.folderNames = Array.from(new Set(state.categories));
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    resetBookmark: (state) => {
      state.ids = [];
      state.error = null;
      state.bookmarks = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendBookmarkData.fulfilled, (state) => {
      state.sendingStatus = "idle";
      state.error = null;
    });
    builder.addCase(sendBookmarkData.rejected, (state, action) => {
      state.sendingStatus = "idle";
      state.error = action.error.message;
    });
    builder.addCase(fetchBookmarkData.pending, (state) => {
      state.fetchingStatus = "loading";
      state.error = null;
    });
    builder.addCase(fetchBookmarkData.fulfilled, (state, action) => {
      state.fetchingStatus = "idle";
      state.bookmarks = action.payload;
      state.folderNames = state.folderNames.concat(
        action.payload.map((item) => item.folderName)
      );
      state.folderNames = Array.from(new Set(state.folderNames));
      state.categories = [...state.folderNames];
      state.error = null;
    });
    builder.addCase(fetchBookmarkData.rejected, (state, action) => {
      state.fetchingStatus = "idle";
      state.error = action.error.message;
    });
  },
});

export const {
  addFavorite,
  removeFavorite,
  addCategory,
  setCategories,
  resetBookmark,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
