import { FoodItem } from "@/data/food-blogs";
import { stat } from "fs";
import { create } from "zustand";

interface StoreState {
  foodItems: FoodItem[];
  createPost: boolean;
  updateFoodItem: (foodItemId: number, foodItem: FoodItem) => void;
  deleteFoodItem: (foodId: number) => void;
  createFoodItem: (foodItem: FoodItem) => void;
  toggleCreatePost: () => void;
}

export const useStore = create<StoreState>((set) => ({
  foodItems: [],
  createPost: false,
  createFoodItem: (foodItem: FoodItem) =>
    set((state) => ({
      foodItems: [...state.foodItems, foodItem],
    })),
  deleteFoodItem: (food_id: number) =>
    set((state) => ({
      foodItems: state.foodItems.filter((f) => f.id !== food_id),
    })),
  updateFoodItem: (foodItemId: number, foodItem: FoodItem) =>
    set((state) => ({
      foodItems: state.foodItems.map((f: FoodItem) => {
        if (f.id === foodItemId) return foodItem;
        return f;
      }),
    })),
  toggleCreatePost: () => set((state) => ({ createPost: !state.createPost })),
}));
