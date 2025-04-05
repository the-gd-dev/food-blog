"use client";
import { useMemo, useState } from "react";
import { Button, CategoryFilter } from "@/components";
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
      <div className="flex w-full xl:w-4/5 justify-between pt-2 relative">
        <div className="w-1/5 sticky top-0 h-full">
          <div className="flex justify-center flex-col py-4">
            <p className="text-gray-800 text-sm">Write . Publish . Share</p>
            <h3 className="text-amber-500 text-4xl font-semibold mb-4">
              Food Blog
            </h3>
            <Button
              height="h-10 w-full"
              text="Write New Blog"
              onClick={toggleCreatePost}
            />
          </div>
          <div className="rounded-xl p-4 bg-gray-100 shadow border-1 border-gray-200">
            <ul className="list-none">
              {[
                "My Profile",
                "Settings",
                "Logout",
                "Help",
                "Terms & Conditions",
              ].map((item, key) => (
                <li
                  key={key}
                  className="text-md hover:text-amber-400 w-fit cursor-pointer mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-justify text-md mt-4 font-semibold">
              Developed by
              <br />
              <a
                target="_blank"
                className="text-blue-400 hover:underline"
                href="http://github.com/the-gd-dev"
              >
                the-gd-dev
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
