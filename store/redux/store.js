import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark";
import shopInfoReducer from "./shopInfo";
import searchResultReducer from "./searchResult";
import customerHomeReducer from "./customerHome";
import authReducer from "./Auth";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    shopInfo: shopInfoReducer,
    searchResult: searchResultReducer,
    customerHome: customerHomeReducer,
    auth: authReducer,
  },
});

export default store;
