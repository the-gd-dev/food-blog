import {
  FoodItemSkeleton,
  FoodPost,
  FoodPostsHeaderSkeleton,
  NoFoodPosts,
} from "@/components";
import { useHyderation } from "@/hooks";
import { useStore } from "@/store";
import FoodPostsHeader from "./FoodPostsHeader";
import { useEffect, useState } from "react";
import { FoodItem, foodItemKeys } from "@/data/food-blogs";

const layoutClasses = {
  grid: `grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 w-full gap-2 flex-wrap`,
  list: `grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-3`,
};

type AppliedFilters = {
  [key in keyof FoodItem]?: string | number;
};

export const FoodItemsList = () => {
  const { foodItems } = useStore();
  const { hydrated } = useHyderation();
  const [itemsLayout, setItemsLayout] = useState<"grid" | "list">("grid");
  const [foodPosts, setFoodPosts] = useState<FoodItem[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setFoodPosts(foodItems);
  }, [foodItems]);

  useEffect(() => {
    if (!search) setFoodPosts(foodItems);
    if (search) {
      setFoodPosts(
        foodItems.filter(
          (food) =>
            food.description.toLowerCase().includes(search.toLowerCase()) ||
            food.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (Object.keys(appliedFilters).length > 0) {
      let finalFilteredItems = foodItems;
      Object.keys(appliedFilters).map((key) => {
        const typedKey = key as keyof FoodItem;
        finalFilteredItems = finalFilteredItems.filter(
          (ff) => ff[typedKey] === (appliedFilters[typedKey] as string | number)
        );
      });
      setFoodPosts(finalFilteredItems);
    }
  }, [appliedFilters, search]);

  if (!hydrated) {
    return (
      <div>
        <FoodPostsHeaderSkeleton />
        <div className="grid xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-2 xl:grid-cols-3 w-full gap-2 flex-wrap">
          {Array.from({ length: 4 }).map((_, idx) => (
            <FoodItemSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  const toggleFilterHandler = () => {
    setShowFilter(!showFilter);
    if (showFilter) {
      setFoodPosts(foodItems);
    }
  };
  if (foodItems.length === 0) return <NoFoodPosts />;
  return (
    <div>
      <FoodPostsHeader
        searchQuery={search}
        onSearch={(s) => {
          setAppliedFilters({});
          setSearch(s);
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
        {foodPosts.map((fp) => (
          <FoodPost item={fp} key={fp.id} layout={itemsLayout} />
        ))}
      </div>

      {foodPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full py-2">
          <p className="text-gray-500 text-md w-full">
            No food items match your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};
