import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types";
import { getAuthUser, logout } from "./slice";

interface initialStateType {
  loading?: boolean;
  user?: UserType;
  error?: string | null;
}

const initialState: initialStateType = {
  loading: true,
  user: {},
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getAuthUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = {};
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default authSlice.reducer;
