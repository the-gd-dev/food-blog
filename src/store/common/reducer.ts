import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  foodFormVisible: boolean;
  isAuthenticated: boolean;
  foodTimelineVisible: boolean;
}

const initialState: initialStateType = {
  foodFormVisible: false,
  isAuthenticated: false,
  foodTimelineVisible: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setAuth: (
      state,
      action: { payload: Record<string, any> | string | boolean }
    ) => {
      state.isAuthenticated = !!action.payload;
    },
    toggleFoodTimeline: (state) => {
      state.foodTimelineVisible = !state.foodTimelineVisible;
    },
    toggleFoodForm: (state) => {
      state.foodFormVisible = !state.foodFormVisible;
    },
  },
});

export const { toggleFoodForm, setAuth, toggleFoodTimeline } = commonSlice.actions;
export default commonSlice.reducer;
