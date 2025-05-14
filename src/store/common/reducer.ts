import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  foodFormVisible: boolean;
  isAuthenticated: boolean;
  foodTimelineVisible: boolean;
  sidebarVisible: boolean;
}

const initialState: initialStateType = {
  foodFormVisible: false,
  isAuthenticated: false,
  foodTimelineVisible: false,
  sidebarVisible: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: { payload: Record<string, any> | string | boolean }) => {
      state.isAuthenticated = !!action.payload;
    },
    toggleFoodTimeline: (state) => {
      state.foodTimelineVisible = !state.foodTimelineVisible;
    },
    toggleFoodForm: (state) => {
      state.foodFormVisible = !state.foodFormVisible;
    },
    toggleSidebar: (state) => {
      state.sidebarVisible = !state.sidebarVisible;
    },
  },
});

export const { toggleFoodForm, setAuth, toggleFoodTimeline, toggleSidebar } = commonSlice.actions;
export default commonSlice.reducer;
