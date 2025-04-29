import { createSlice } from "@reduxjs/toolkit";
import { createFoodItem, deleteFoodItem, fetchFoodItems } from "./slice";
import { FoodItem } from "@/types";

interface intitialStateType {
  items: FoodItem[];
  loading?: boolean;
  error?: string | null;
}
const initialState: intitialStateType = {
  items: [],
  loading: false,
  error: null,
};

export default createSlice({
  name: "foodPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItems?.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoodItems?.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data as FoodItem[];
      })
      .addCase(fetchFoodItems?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error while fetching data!";
      })
      .addCase(createFoodItem?.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFoodItem?.fulfilled, (state, action) => {
        state.loading = false;
        state.items?.unshift(action.payload.data as FoodItem);
      })
      .addCase(createFoodItem?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error while submitting data!";
      })
      .addCase(deleteFoodItem?.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFoodItem?.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items?.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteFoodItem?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error while deleting data!";
      });
  },
}).reducer;
