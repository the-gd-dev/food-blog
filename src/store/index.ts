import { FoodItem } from "@/data/food-blogs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  foodItems: FoodItem[];
  createPost: boolean;
  updateFoodItem: (foodItemId: number, foodItem: FoodItem) => void;
  deleteFoodItem: (foodId: number) => void;
  createFoodItem: (foodItem: FoodItem) => void;
  toggleCreatePost: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      foodItems: [],
      createPost: false,
      createFoodItem: (foodItem: FoodItem) =>
        set((state) => ({
          foodItems: [foodItem, ...state.foodItems],
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
      toggleCreatePost: () =>
        set((state) => ({ createPost: !state.createPost })),
    }),
    {
      name: "@food-store",
    }
  )
);
