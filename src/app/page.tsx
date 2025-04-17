"use client";
import { FoodItemsList, FoodPostsTimeline } from "@/components";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function Home() {
  const { showTimeline, toggleShowTimeline } = useStore();
  useEffect(() => {
    document.title = "Food App";
  }, []);

  return (
    <>
      <div className="h-full w-full px-4 rounded-2xl lg:w-3/4 md:px-6 mt-3 md:mt-0">
        <FoodItemsList />
      </div>
      <div className="hidden lg:flex flex-col md:w-1/6 lg:1/4 h-full sticky top-0">
        <FoodPostsTimeline />
      </div>
      <div
        className={`fixed lg:hidden top-14 md:top-0 h-full right-0 z-30 transition-all ${
          !showTimeline ? "translate-x-50" : ""
        }`}
      >
        <div
          className={`overlay ${!showTimeline ? "hidden" : ""}`}
          onClick={toggleShowTimeline}
        />
        <div className="bg-white relative z-20 px-3 py-1 h-full w-50">
          <FoodPostsTimeline />
        </div>
      </div>
    </>
  );
}
