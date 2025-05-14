"use client";
import { FoodItemSkeleton, FoodPost, FoodPostsHeaderSkeleton, NoFoodPosts } from "@/components";
import { useHyderation } from "@/hooks";
import { FoodItem, LayoutTypes } from "@/types";

const layoutClasses: Record<LayoutTypes, string> = {
  grid: `grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 w-full gap-2 flex-wrap`,
  list: `grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-3`,
};

export const FoodItemsList: React.FC<{ foodItems?: FoodItem[]; itemsLayout: LayoutTypes }> = ({
  foodItems = [],
  itemsLayout = "grid",
}) => {
  const { hydrated } = useHyderation();

  if (!hydrated) {
    return (
      <div>
        <FoodPostsHeaderSkeleton />
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 w-full gap-3 flex-wrap">
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
      <div id="food-items" className={layoutClasses[itemsLayout]}>
        {foodItems.map((fp) => (
          <FoodPost item={fp} key={fp._id} layout={itemsLayout} />
        ))}
      </div>

      {foodItems.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full py-2">
          <p className="text-gray-500 text-md w-full">No food items match your filter criteria.</p>
        </div>
      )}
    </div>
  );
};
