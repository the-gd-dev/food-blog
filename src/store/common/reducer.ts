import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  foodFormVisible: boolean;
  isAuthenticated: boolean;
}

const initialState: initialStateType = {
  foodFormVisible: false,
  isAuthenticated: false,
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
    toggleFoodForm: (state) => {
      state.foodFormVisible = !state.foodFormVisible;
    },
  },
});

export const { toggleFoodForm, setAuth } = commonSlice.actions;
export default commonSlice.reducer;
