import { FoodItem } from "@/data/food-blogs";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface UserType {
  username: string;
  name?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  bio?: string;
  niche?: string;
  location?: string;
  website?: string;
  social?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  recipesCount?: number;
  joinedDate?: string;
}

interface StoreState {
  isAuthenticated?: boolean;
  user?: UserType;
  showTimeline?: boolean;
  sideMenuOpen?: boolean;
  foodItems: FoodItem[];
  createPost: boolean;
  updateFoodItem: (foodItemId: number, foodItem: FoodItem) => void;
  deleteFoodItem: (foodId: number) => void;
  createFoodItem: (foodItem: FoodItem) => void;
  toggleCreatePost: () => void;
  toggleSideMenu: () => void;
  toggleShowTimeline: () => void;
  setAuthenticationStatus: (v: boolean) => void;
  setAuthUser: (u: UserType) => void;
  logoutUser: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      sideMenuOpen: false,
      foodItems: [],
      createPost: false,
      logoutUser: () => set(() => ({ isAuthenticated: false })),
      setAuthUser: (user: UserType) => set(() => ({ user: user })),
      setAuthenticationStatus: (v) => set(() => ({ isAuthenticated: v })),
      toggleShowTimeline: () =>
        set((state) => ({
          showTimeline: !state.showTimeline,
        })),
      toggleSideMenu: () =>
        set((state) => ({
          sideMenuOpen: !state.sideMenuOpen,
        })),
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
