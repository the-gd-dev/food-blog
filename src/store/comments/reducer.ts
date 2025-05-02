import { CommentType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { createComment, getComments } from "./slice";

interface initialStateType {
  comments: CommentType[];
  loading: boolean;
}

const initialState: initialStateType = {
  comments: [],
  loading: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, payload) => {
        state.loading = false;
        state.comments = payload.payload.data as CommentType[];
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, payload) => {
        state.loading = false;
        state.comments.unshift(payload.payload.data as CommentType);
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
