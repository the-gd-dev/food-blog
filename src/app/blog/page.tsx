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
      <div className="h-full rounded-2xl w-3/6 px-4">
        <FoodItemsList />
      </div>
      <div className="w-1/6 h-full py-1 sticky top-0">
        <FoodPostsTimeline />
      </div>
    </>
  );
}
