"use client";
import { useStore } from "@/store";
import { useEffect } from "react";
import { FoodPostsTimeline, NewFoodPost, FoodItemsList } from "@/components";

export default function Blog() {
  const { createPost, toggleCreatePost } = useStore();

  useEffect(() => {
    document.title = "Food App";
  }, []);

  return (
    <>
      <div className="h-full w-full rounded-2xl lg:w-3/4 md:px-6 mt-3 md:mt-0">
        <FoodItemsList />
      </div>
      <div className="hidden lg:flex flex-col md:w-1/6 lg:1/4 h-full py-1 sticky top-0">
        <FoodPostsTimeline />
      </div>
    </>
  );
}
