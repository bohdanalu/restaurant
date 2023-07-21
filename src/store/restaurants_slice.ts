import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RestaurantType } from "../types";
import { restaurantsURL } from "../constants";
import axios from "axios";
import { RootState } from "./store";

export const fetchRestaurants = createAsyncThunk<
  RestaurantType[],
  undefined,
  { rejectValue: string }
>("restaurants/fetchRestaurants", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(restaurantsURL);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

interface RestaurantsState {
  restaurants: RestaurantType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  isLoading: false,
  error: null,
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.error = action.payload || "Unknown error occurred";
        state.isLoading = false;
      });
  },
});

// export const {} = restaurantsSlice;

export const selectRestaurants = (state: RootState) =>
  state.restaurants.restaurants;
export const selectError = (state: RootState) => state.restaurants.error;
export const selectLoading = (state: RootState) => state.restaurants.isLoading;

export default restaurantsSlice;
