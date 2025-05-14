"use client";
import { FoodItemsList, FoodPostsHeader, FoodPostsTimeline } from "@/components";
import { AppDispatch, RootState } from "@/store";
import { toggleFoodTimeline } from "@/store/common/reducer";
import { fetchFoodItems } from "@/store/food-list/slice";
import { AppliedFilters, FoodItem, LayoutTypes } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [search, setSearch] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);
  const [itemsLayout, setItemsLayout] = useState<LayoutTypes>("grid");

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.foodPosts);
  const { foodTimelineVisible } = useSelector((state: RootState) => state.common);
  useEffect(() => {
    document.title = "Food Blogs";
    dispatch(fetchFoodItems());
  }, []);

  return (
    <>
      <div className="h-full w-full px-4 rounded-2xl lg:w-3/4 md:px-6 mt-3 md:mt-0">
        <FoodPostsHeader
          searchQuery={search}
          onSearch={(s) => {
            setSearch(s);
            setAppliedFilters({});
          }}
          itemsLayout={itemsLayout}
          filterVisible={showFilter}
          toggleFilter={() => setShowFilter(!showFilter)}
          onFilter={(key: keyof FoodItem, v) => {
            const updatedFilters = { ...appliedFilters };
            if (key && v) {
              updatedFilters[key] = v;
            } else {
              delete updatedFilters[key];
            }
            setAppliedFilters(updatedFilters);
          }}
          onItemsLayoutChange={() => setItemsLayout(itemsLayout === "grid" ? "list" : "grid")}
        />

        <FoodItemsList foodItems={items} itemsLayout={itemsLayout} />
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
