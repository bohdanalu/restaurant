import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { CartItem, MenuType } from "../types";

interface AppState {
  cartItems: CartItem[];
}

const getStorageItems = () => {
  const storedCartItems = localStorage.getItem("cartItems");
  if (storedCartItems) {
    return JSON.parse(storedCartItems);
  }
};

const initialState: AppState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ menuItem: MenuType }>) => {
      const { menuItem } = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.menuItem.id === menuItem.id
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ menuItem, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.menuItem.id === action.payload
      );

      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
        if (state.cartItems[index].quantity === 0) {
          state.cartItems.splice(index, 1);
        }
      }
    },
    incrementItem: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.menuItem.id === action.payload
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, incrementItem } =
  cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice;
