import { CommentType, HttpClientResponse } from "@/types";
import { httpClient } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/get-all",
  async (payload: { postId: string }) => {
    return (await httpClient({
      apiUrl: `/food-posts/${payload.postId}/comments`,
      method: "GET",
    })) as HttpClientResponse;
  }
);

export const createComment = createAsyncThunk(
  "comments/create",
  async (payload: CommentType) => {
    return (await httpClient({
      apiUrl: "/food-posts/comments/create",
      method: "POST",
      data: payload,
      isPrivate: true,
    })) as HttpClientResponse;
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (payload: CommentType) => {
    return (await httpClient({
      apiUrl: `/food-posts/comments/${payload._id}/update`,
      method: "PUT",
      data: payload,
      isPrivate: true,
    })) as HttpClientResponse;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (payload: { id: string }) => {
    return (await httpClient({
      apiUrl: "/food-posts/comments/delete",
      method: "POST",
      data: payload,
      isPrivate: true,
    })) as HttpClientResponse;
  }
);
