import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { CartItem, MenuType } from "../types";

interface CartState {
  cartItems: CartItem[];
}

const getStorageItems = () => {
  try {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      return JSON.parse(storedCartItems);
    }
  } catch (error) {
    console.error("Error parsing stored cart items:", error);
  }
  return [];
};

const initialState: CartState = {
  cartItems: getStorageItems(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{ menuItem: MenuType; restaurantId: number }>
    ) => {
      const { menuItem, restaurantId } = action.payload;
      const index = state.cartItems.findIndex(
        (item) =>
          item.menuItem.id === menuItem.id && item.restaurantId === restaurantId
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ menuItem, quantity: 1, restaurantId });
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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
