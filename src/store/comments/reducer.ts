import { CommentType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "./slice";

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
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data as CommentType[];
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload.data as CommentType);
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload?.data;

        if (!updatedComment?._id) return;

        state.comments = state.comments.map((c) =>
          c._id === updatedComment._id ? { ...c, ...updatedComment } : c
        );
      })
      .addCase(updateComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (c) => c._id !== action.payload.data?.id
        );
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
