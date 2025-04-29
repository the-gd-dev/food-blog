import { FoodItem, HttpClientResponse } from "@/types";
import { httpClient } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Fetch Food Items
 * @returns {FoodItem[]}
 */
export const fetchFoodItems = createAsyncThunk("food-posts/list", async () => {
  return (await httpClient({ apiUrl: "/food-posts" })) as HttpClientResponse;
});

/**
 * Delete Food Item
 * @returns id
 */
export const deleteFoodItem = createAsyncThunk(
  "food-posts/delete",
  async (id: string | number | undefined) => {
    return (await httpClient({
      apiUrl: `/food-posts/${id}/delete`,
      method: "DELETE",
      isPrivate: true,
    })) as HttpClientResponse;
  }
);

/**
 * Create Food Item
 * @returns {FoodItem}
 */
export const createFoodItem = createAsyncThunk(
  "food-posts/create",
  async (payload: FoodItem) => {
    return (await httpClient({
      apiUrl: `/food-posts/create`,
      method: "POST",
      data: payload,
      isPrivate: true,
    })) as HttpClientResponse;
  }
);
