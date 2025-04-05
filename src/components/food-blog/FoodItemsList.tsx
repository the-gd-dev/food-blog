import { FoodItemSkeleton, FoodPost, NoFoodPosts } from "@/components";
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
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 5 }).map((_, idx) => (
          <FoodItemSkeleton key={idx} />
        ))}
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
      <div id="food-items" className="flex w-full gap-5 flex-wrap">
        {foodItems.map((fp) => (
          <FoodPost item={fp} key={fp.id} />
        ))}
      </div>
    </div>
  );
};
