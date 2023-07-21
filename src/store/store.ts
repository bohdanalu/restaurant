import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart_slice";
import restaurantsSlice from "./restaurants_slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    restaurants: restaurantsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
