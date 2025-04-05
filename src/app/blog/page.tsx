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
      {createPost && <div className="overlay" onClick={toggleCreatePost} />}
      <div className="h-full rounded-2xl w-4/9">
        {createPost && <NewFoodPost />}
        <FoodItemsList />
      </div>
      <div className="w-1/5 h-full py-1 sticky top-0">
        <FoodPostsTimeline />
      </div>
    </>
  );
}
