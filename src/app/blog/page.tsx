"use client";
import { FoodPost } from "@/components/FoodItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import { months } from "./constants/months";
import { FoodItem, foodPosts } from "./data/food-blogs";

interface TimelineType {
  [y: string]: string[];
}

export default function Blog() {
  const [showNewBlogEditor, setShowNewBlogEditor] = useState(false);
  const [timeline, setTimeline] = useState<TimelineType>({});
  const [blogPosts, setBlogPosts] = useState<FoodItem[]>([]);
  const [timelineFilter, setTimelineFilter] = useState("");

  useEffect(() => {
    const years = [...new Set(foodPosts.map((i) => i.datePosted.split("-")[0]))]
      .sort()
      .reverse();
    const blogTimelines: TimelineType = {};

    years.forEach((y) => {
      const months = [
        ...new Set(
          foodPosts
            .filter((m) => m.datePosted.split("-")[0] === String(y))
            .map((m) => m.datePosted.split("-")[1])
        ),
      ].sort();

      blogTimelines[y] = months;
    });

    setTimeline(blogTimelines);
    setBlogPosts(foodPosts);
  }, []);

  return (
    <>
      <div className="h-full rounded-2xl w-4/9">
        {showNewBlogEditor && (
          <div id="new-post" className="sticky top-0 z-30">
            <form
              action="/"
              className="flex flex-col my-4 bg-amber-500 relative rounded-xl p-3"
            >
              <input
                type="text"
                placeholder="Post Title"
                className="focus:outline-0 resize-none h-8 mb-2 py-2 px-4 bg-white rounded-md"
              />
              <textarea
                placeholder="Write a new blog post..."
                className="focus:outline-0 resize-none h-25 py-2 px-4 bg-white rounded-md mb-2"
              ></textarea>
              <input
                type="file"
                name=""
                className="bg-white file:bg-amber-200 rounded-md"
              />
              <div className="flex justify-end py-2">
                <button
                  onClick={() => setShowNewBlogEditor(false)}
                  type="button"
                  className="bg-white text-gray-600 text-sm px-4 py-1 rounded-md cursor-pointer mr-3"
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="bg-amber-400 hover:bg-amber-600 text-white text-sm px-4 py-1 rounded-md cursor-pointer "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        <div id="food-posts">
          {!showNewBlogEditor && (
            <h2 className="text-xl font-extrabold p-2 text-gray-800">Posts</h2>
          )}
          {blogPosts.map((fp, key) => (
            <Link href={`/blog/${fp.id}`} key={`food_item_${key}`}>
              <FoodPost item={fp} />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/5 h-full py-1 sticky top-0">
        <h1 className="text-lg font-bold ">Blog Timeline</h1>
        <ul className="mt-4">
          {Object.keys(timeline).map((key) => (
            <li className="mt-2" key={key}>
              <h1 className="font-bold text-gray-700">{key}</h1>
              <ul className="list-none flex flex-col flex-wrap">
                {timeline[key]?.map((m: string) => (
                  <li key={`${key}-${m}`} className="text-gray-500">
                    <div
                      className={`cursor-pointer max-w-fit hover:text-amber-500 ${
                        `${key}-${m}` === timelineFilter ? "text-amber-500" : ""
                      }`}
                      onClick={() => setTimelineFilter(`${key}-${m}`)}
                    >
                      {months[parseInt(m, 10) - 1] || m}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
