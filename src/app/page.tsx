"use client";
import { FoodItemsList, FoodPostsTimeline } from "@/components";
import { AppDispatch, RootState } from "@/store";
import { toggleFoodTimeline } from "@/store/common/reducer";
import { fetchFoodItems } from "@/store/food-list/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, items, error } = useSelector(
    (state: RootState) => state.foodPosts
  );
  const { foodTimelineVisible } = useSelector(
    (state: RootState) => state.common
  );
  useEffect(() => {
    document.title = "Food Blogs";
    dispatch(fetchFoodItems());
  }, []);
  return (
    <>
      <div className="h-full w-full px-4 rounded-2xl lg:w-3/4 md:px-6 mt-3 md:mt-0">
        <FoodItemsList foodItems={items} />
      </div>
      <div className="hidden lg:flex flex-col md:w-1/6 lg:1/4 h-full sticky top-0">
        <FoodPostsTimeline />
      </div>
      <div
        className={`fixed lg:hidden top-14 md:top-0 h-full right-0 z-30 transition-all ${
          !foodTimelineVisible ? "translate-x-50" : ""
        }`}
      >
        <div
          className={`overlay ${!foodTimelineVisible ? "hidden" : ""}`}
          onClick={() => {
            dispatch(toggleFoodTimeline());
          }}
        />
        <div className="bg-white relative z-20 px-3 py-1 h-full w-50">
          <FoodPostsTimeline />
        </div>
      </div>
    </>
  );
}
