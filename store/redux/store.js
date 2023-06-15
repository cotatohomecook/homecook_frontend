import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
  },
});

export default store;
