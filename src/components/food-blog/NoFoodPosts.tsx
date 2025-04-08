import { useStore } from "@/store";
import React from "react";
import { Button } from "../Button";

export const NoFoodPosts = () => {
  const { toggleCreatePost } = useStore();
  return (
    <div className="rounded-xl h-50 lg:h-90 mt-3 w-full flex flex-col items-center justify-center bg-gray-100 shadow-md p-4">
      <h1 className="text-xl font-medium text-gray-800">
        No New Posts Found
      </h1>
      <p className="text-sm  font-light mt-2 text-gray-600 text-center mb-3">
        It looks like there are no posts yet. Why not create one?
      </p>
      <Button onClick={toggleCreatePost}>Create A New Post</Button>
    </div>
  );
};
