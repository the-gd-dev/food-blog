export interface FoodItem {
  _id?: number | string;
  title: string;
  imageUrl: string | File;
  description: string;
  likes?: number;
  comments?: number;
  postedBy?: string;
  datePosted?: string;
  foodCategory?: string;
  foodPreference?: string;
}

export interface CommentType {
  _id?: string;
  text?: string;
  image?: string;
  userId?: Record<string, any> | undefined;
  postId?: string | undefined;
  createdAt?: string;
  likes?: number;
}

export interface UserType {
  username?: string;
  name?: string;
  email?: string;
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

export type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export type AppliedFilters = {
  [key in keyof FoodItem]?: string | number;
};

export interface HttpClientOptions {
  apiUrl: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  isPrivate?: boolean;
}

export interface HttpClientResponse {
  ok?: boolean;
  data?: Record<string, any>;
  message?: string;
  code?: number;
}
