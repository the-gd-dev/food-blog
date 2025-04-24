export interface FoodItem {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  likes?: number;
  comments?: number;
  postedBy?: string;
  datePosted?: string;
  foodCategory?: string;
  foodPreference?: string;
}

export interface CommentType {
  id: number;
  user: {
    name: string;
    profile_pic?: string;
  };
  text?: string;
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
