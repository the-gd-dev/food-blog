"use client";
import {
  FoodItemSkeleton,
  FoodPost,
  FoodPostsHeader,
  FoodPostsHeaderSkeleton,
  NoFoodPosts,
} from "@/components";
import { FoodItem, AppliedFilters } from "@/types";
import { useHyderation } from "@/hooks";
import { useState } from "react";

const layoutClasses = {
  grid: `grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 w-full gap-2 flex-wrap`,
  list: `grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-3`,
};

export const FoodItemsList: React.FC<{ foodItems?: FoodItem[] }> = ({
  foodItems = [],
}) => {
  const { hydrated } = useHyderation();
  const [itemsLayout, setItemsLayout] = useState<"grid" | "list">("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [search, setSearch] = useState<string>("");

  if (!hydrated) {
    return (
      <div>
        <FoodPostsHeaderSkeleton />
        <div className="grid xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-2 xl:grid-cols-3 w-full gap-3 flex-wrap">
          {Array.from({ length: 4 }).map((_, idx) => (
            <FoodItemSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  const toggleFilterHandler = () => {
    setShowFilter(!showFilter);
  };
  if (foodItems.length === 0) return <NoFoodPosts />;

  return (
    <div>
      <FoodPostsHeader
        searchQuery={search}
        onSearch={(s) => {
          setSearch(s);
          setAppliedFilters({});
        }}
        itemsLayout={itemsLayout}
        filterVisible={showFilter}
        toggleFilter={toggleFilterHandler}
        onFilter={(key: keyof FoodItem, v) => {
          const updatedFilters = { ...appliedFilters };
          if (key && v) {
            updatedFilters[key] = v;
          } else {
            delete updatedFilters[key];
          }
          setAppliedFilters(updatedFilters);
        }}
        onItemsLayoutChange={() =>
          setItemsLayout(itemsLayout === "grid" ? "list" : "grid")
        }
      />

      <div id="food-items" className={layoutClasses[itemsLayout]}>
        {foodItems.map((fp) => (
          <FoodPost item={fp} key={fp._id} layout={itemsLayout} />
        ))}
      </div>

      {foodItems.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full py-2">
          <p className="text-gray-500 text-md w-full">
            No food items match your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};
