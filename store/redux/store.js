import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark";
import shopInfoReducer from "./shopInfo";
import searchResultReducer from "./searchResult";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    shopInfo: shopInfoReducer,
    searchResult: searchResultReducer,
  },
});

export default store;
