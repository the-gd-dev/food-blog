"use client";
import { useStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";
import { FoodPostsTimeline, NewFoodPost, FoodPost } from "@/components";

export default function Blog() {
  const { createPost, foodItems, toggleCreatePost } = useStore();

  useEffect(() => {
    document.title = `Food App`;
  }, []);

  return (
    <>
      {createPost && <div className="overlay" />}
      <div className="h-full rounded-2xl w-4/9">
        {createPost && <NewFoodPost />}

        <div id="food-posts">
          {foodItems.map((fp, key) => (
            <FoodPost item={fp} />
          ))}
          {foodItems.length === 0 && (
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl mt-26 h-40  w-full flex flex-col items-center justify-center">
              <h1 className="text-3xl font-medium text-white">
                No New Posts Found.
              </h1>
              <p className="text-lg font-extralight mt-4">
                Add a{" "}
                <button
                  onClick={toggleCreatePost}
                  type="button"
                  className="bg-white px-2 rounded-md cursor-pointer"
                >
                  New Post
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-1/5 h-full py-1 sticky top-0">
        <FoodPostsTimeline />
      </div>
    </>
  );
}
