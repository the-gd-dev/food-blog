import React from "react";
import { FoodPost, FoodItemSkeleton, Button } from "@/components";
import { useHyderation } from "@/hooks";
import { useStore } from "@/store";
import { FilterIcon, GridIcon, ListIcon } from "@/assets/icons";

export const FoodItemsList = () => {
  const { foodItems, toggleCreatePost } = useStore();
  const { hydrated } = useHyderation();

  if (!hydrated) {
    return (
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 5 }).map((_, idx) => (
          <FoodItemSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="rounded-xl mt-6 h-40 w-full flex flex-col items-center justify-center bg-gray-100 shadow-md">
        <h1 className="text-2xl font-medium text-gray-800">
          No New Posts Found
        </h1>
        <p className="text-lg font-light mt-2 text-gray-600">
          It looks like there are no posts yet. Why not create one?
        </p>
        <button
          onClick={toggleCreatePost}
          type="button"
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          Create A New Post
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl py-4">Food Posts</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            height="w-9 h-9 flex justify-center items-center px-0"
          >
            <GridIcon height={24} width={24} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            height="w-9 h-9 flex justify-center items-center px-0"
          >
            <ListIcon height={24} width={24} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            height="w-9 h-9 flex justify-center items-center px-0"
          >
            <FilterIcon height={24} width={24} />
          </Button>
        </div>
      </div>
      <div id="food-items" className="flex w-full gap-2 flex-wrap">
        {foodItems.map((fp) => (
          <FoodPost item={fp} key={fp.id} />
        ))}
      </div>
    </div>
  );
};
