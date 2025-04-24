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

export const foodItemKeys = Object.keys({
  id: 0,
  title: "",
  imageUrl: "",
  description: "",
  likes: 0,
  comments: 0,
  postedBy: "",
  datePosted: "",
  foodCategory: "",
  foodPreference: "",
}) as Array<keyof FoodItem>;
