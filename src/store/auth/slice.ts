import { httpClient } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthUser = createAsyncThunk("auth/get-user", async () => {
  return await httpClient({ apiUrl: "/verify", isPrivate: true });
});

export const logout = createAsyncThunk("auth/logout-user", async () => {
  return await httpClient({
    apiUrl: "/logout",
    method: "POST",
    isPrivate: true,
  });
});
