import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark";
import shopInfoReducer from "./shopInfo";
import searchResultReducer from "./searchResult";
import customerHomeReducer from "./customerHome";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    shopInfo: shopInfoReducer,
    searchResult: searchResultReducer,
    customerHome: customerHomeReducer,
  },
});

export default store;
