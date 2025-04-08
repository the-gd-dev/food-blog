import {
  FoodItemSkeleton,
  FoodPost,
  FoodPostsHeaderSkeleton,
  NoFoodPosts,
} from "@/components";
import { useHyderation } from "@/hooks";
import { useStore } from "@/store";
import FoodPostsHeader from "./FoodPostsHeader";
import { useState } from "react";

export const FoodItemsList = () => {
  const { foodItems } = useStore();
  const { hydrated } = useHyderation();
  const [itemsLayout, setItemsLayout] = useState<"grid" | "list">("grid");

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

  if (foodItems.length === 0) return <NoFoodPosts />;
  return (
    <div>
      <FoodPostsHeader
        itemsLayout={itemsLayout}
        onItemsLayoutChange={() =>
          setItemsLayout(itemsLayout === "grid" ? "list" : "grid")
        }
      />
      <div
        id="food-items"
        className="grid xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-2 xl:grid-cols-3 w-full gap-2 flex-wrap"
      >
        {foodItems.map((fp) => (
          <FoodPost item={fp} key={fp.id} />
        ))}
      </div>
    </div>
  );
};
