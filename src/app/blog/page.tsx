"use client";
import { useStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";
import { FoodPostsTimeline, NewFoodPost, FoodPost } from "@/components";

export default function Blog() {
  const { createPost, foodItems } = useStore();

  useEffect(() => {
    document.title = `Food App`;
  }, []);

  return (
    <>
      <div className="h-full rounded-2xl w-4/9">
        {!createPost && <NewFoodPost />}

        <div id="food-posts">
          {foodItems.map((fp, key) => (
            <Link href={`/blog/${fp.id}`} key={`food_item_${key}`}>
              <FoodPost item={fp} />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/5 h-full py-1 sticky top-0">
        <FoodPostsTimeline />
      </div>
    </>
  );
}
