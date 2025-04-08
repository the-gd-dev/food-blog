"use client";
import { FoodItemsList, FoodPostsTimeline } from "@/components";
import { useEffect } from "react";

export default function Blog() {
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
