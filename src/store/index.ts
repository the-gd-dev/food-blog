import { configureStore } from "@reduxjs/toolkit";
import foodPostsReducer from "./food-list/reducers";
import authReducer from "./auth/reducer";
import commonReducers from "./common/reducer";
import commentReducers from "./comments/reducer";

export const store = configureStore({
  reducer: {
    foodPosts: foodPostsReducer,
    auth: authReducer,
    common: commonReducers,
    comments: commentReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
