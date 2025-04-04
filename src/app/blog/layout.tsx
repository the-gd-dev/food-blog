"use client";
import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components";
import { useStore } from "@/store";
import { foodCategories } from "@/data/categories";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toggleCreatePost, foodItems } = useStore();
  const [category, setCategory] = useState("American");
  const [foodAuther, setFoodAuther] = useState("");
  const foodAuthors = useMemo(
    () => [...new Set(foodItems.map((i) => i.postedBy))],
    [foodItems]
  );
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-4/5 justify-between py-1 relative">
        <div className="w-1/5 sticky top-0 h-full">
          <div className="flex justify-center flex-col py-4 mb-4 ">
            <p className="text-gray-800 text-sm">Write . Publish . Share</p>
            <h3 className="text-amber-500 text-4xl font-semibold">Food Blog</h3>
          </div>
          <div className="action-list">
            <ul className="list-none">
              <li>
                <button
                  type="button"
                  onClick={toggleCreatePost}
                  className="bg-amber-400 px-2 h-10 w-full cursor-pointer hover:bg-amber-500 rounded-md"
                >
                  Write New Blog
                </button>
              </li>
              <li>
                <CategoryFilter
                  currentSelection={category}
                  onChangeCategory={setFoodAuther}
                  data={foodCategories.map((i) => i.label)}
                  heading={"Filter By Category"}
                />
                {foodAuthors.length > 0 && (
                  <CategoryFilter
                    currentSelection={foodAuther}
                    onChangeCategory={setCategory}
                    data={foodAuthors.sort()}
                    heading={" Filter By Food Auther"}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
