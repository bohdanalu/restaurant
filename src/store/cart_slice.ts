import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { CartItem, MenuType } from "../types";

// rename `AppState` here to `CartState` 
interface AppState {
  cartItems: CartItem[];
}

const getStorageItems = () => {
  const storedCartItems = localStorage.getItem("cartItems");
  if (storedCartItems) {
    // add try/catch here as JSON.parse might throw an error
    return JSON.parse(storedCartItems);
  }
  return [];
};

const initialState: AppState = {
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
      // it's better to store only id of the menu item in the state instead of whole menu item
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
