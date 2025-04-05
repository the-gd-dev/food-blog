import { useStore } from "@/store";
import React from "react";

export const NoFoodPosts = () => {
  const { toggleCreatePost } = useStore();
  return (
    <div className="rounded-xl mt-6 h-40 w-full flex flex-col items-center justify-center bg-gray-100 shadow-md">
      <h1 className="text-2xl font-medium text-gray-800">No New Posts Found</h1>
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
};
