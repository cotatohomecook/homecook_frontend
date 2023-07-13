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

export const postData = createAsyncThunk(
  "shopInfo/postData",
  async (cartItem) => {
    try {
      const url = "http://3.38.33.21:8080/api/orders";
      const response = await axios.post(url, cartItem);
      console.log("POST 요청 성공", response.data);

      return response.data;
    } catch (error) {
      console.log("POST 요청 실패:", error);
      throw error;
    }
  }
);

export const addToCart = (cartItem) => {
  return {
    type: "shopInfo/ADD_TO_CART",
    payload: cartItem,
  };
};

export const updateCartItem = (index, updatedQuantity) => {
  return {
    type: "shopInfo/UPDATE_CART_ITEM",
    payload: { index, updatedQuantity },
  };
};

const initialState = {
  searchText: "",
  data: null,
  error: null,
  isLoading: false,
  selectedMenuId: null,
  quantity: 0,
  cart: [],
};

const shopInfoSlice = createSlice({
  name: "shopInfo",
  initialState,
  reducers: {
    setSelectedMenuId: (state, action) => {
      state.selectedMenuId = action.payload;
    },
    increaseQuantity: (state) => {
      state.quantity += 1;
    },
    decreaseQuantity: (state) => {
      if (state.quantity > 0) {
        state.quantity -= 1;
      }
    },
    updateCartItem: (state, action) => {
      const { cartItem, index } = action.payload;
      state.cart[index] = cartItem;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
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
      })
      .addCase("shopInfo/ADD_TO_CART", (state, action) => {
        const cartItem = action.payload;
        state.cart.push(cartItem);
      })
      .addCase("shopInfo/UPDATE_CART_ITEM", (state, action) => {
        const { index, updatedQuantity } = action.payload;
        if (index !== -1) {
          state.cart[index] = {
            ...state.cart[index],
            quantity: state.cart[index].quantity + updatedQuantity,
          };
        }
      });
  },
});

export const { actions: shopInfoActions } = shopInfoSlice;

export default shopInfoSlice.reducer;
