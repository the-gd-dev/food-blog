export interface FoodItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
  postedBy: string;
  datePosted: string;
  foodCategory: string;
  food_preference: string;
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
  food_preference: "",
}) as Array<keyof FoodItem>;
