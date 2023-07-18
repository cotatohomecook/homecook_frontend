import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark";
import shopInfoReducer from "./shopInfo";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    shopInfo: shopInfoReducer, // shopInfo 리듀서 추가
  },
});

export default store;
