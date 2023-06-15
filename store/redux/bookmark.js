import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendBookmarkData = createAsyncThunk(
  "bookmark/sendBookmarkData",
  async ({ ids, categories }) => {
    try {
      const url = `http://3.38.33.21:8080/api/bookmarks/${ids}/${categories}`;
      await axios.post(url);
      console.log("POST 요청 성공");
    } catch (error) {
      console.log("POST 요청 실패:", error);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    ids: [],
    categories: ["한식", "중식", "베이커리", "일식"],
    sendingStatus: "idle",
    error: null,
    bookmarks: [],
    fetchingStatus: "idle",
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
      state.categories.push(action.payload);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
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
  },
});

export const { addFavorite, addCategory, setCategories } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
