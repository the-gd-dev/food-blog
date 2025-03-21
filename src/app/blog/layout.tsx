"use client";

import { useState } from "react";
import { foodPosts } from "./data/food-blogs";

const CategoryFilter: React.Component<{
  data: string[];
  heading: string;
  currentSelection: string;
  onChangeCategory: () => void;
}> = ({ data, heading, currentSelection, onChangeCategory }) => {
  return (
    <div className="mt-4 border-1 border-gray-200 rounded-xl px-4 h-100 pb-2 overflow-y-scroll relative">
      <h1 className="font-bold mb-1 sticky top-0 bg-white py-2">{heading}</h1>
      <ul className="list-none">
        {data &&
          data.length > 0 &&
          data.sort().map((fl, _index) => (
            <li key={`category_${_index}`} className="mb-1 ">
              <div
                className={`hover:text-amber-500 cursor-pointer w-fit ${
                  currentSelection === fl ? "text-amber-500" : ""
                }`}
                onClick={() => onChangeCategory(fl)}
              >
                {fl}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [category, setCategory] = useState("American");
  const [foodAuther, setFoodAuther] = useState("");

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
                  onClick={() => {
                    new CustomEvent("show-editor");
                  }}
                  className="bg-amber-400 px-2 h-10 w-full cursor-pointer hover:bg-amber-500 rounded-md"
                >
                  Write New Blog
                </button>
              </li>
              <li>
                <CategoryFilter
                  currentSelection={category}
                  onChangeCategory={(v) => {
                    new CustomEvent("category-filter", { key: "foodCategory", item: v });
                  }}
                  data={[...new Set(foodPosts.map((i) => i.foodCategory))]}
                  heading={"Filter By Category"}
                />
                <CategoryFilter
                  currentSelection={foodAuther}
                  onChangeCategory={(v) => {
                    new CustomEvent("category-filter", { key: "postedBy", item: v });
                  }}
                  data={[...new Set(foodPosts.map((i) => i.postedBy))]}
                  heading={" Filter By Food Auther"}
                />
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
