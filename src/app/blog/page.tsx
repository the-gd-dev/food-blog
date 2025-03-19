"use client";

import Image from "next/image";
import { foodPosts } from "./data/food-blogs";
import { useEffect, useState } from "react";
import { months } from "./constants/months";
import moment from "moment";
import Link from "next/link";
import { FoodItem } from "./data/food-blogs";

const FoodPost: React.Component<{ item: FoodItem }> = ({ item }) => {
  return (
    <div
      className={`w-full border-1 border-gray-200 mb-4 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:bg-gray-100`}
    >
      <div className="flex">
        <div className="w-3/4 p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            {!item.isNonVeg ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-300"></div>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-red-300"></div>
              </>
            )}
            <h3 className="text-md font-extrabold">{item.title}</h3>
          </div>
          <p className="w-full w-100 text-sm">{item.description}</p>
          <div>
            <div className="flex items-center gap-1 text-gray-500">
              <small>{moment(item.datePosted).format("ddd, D MMM YYYY")}</small>
              <div className="w-1 h-1 rounded-full bg-gray-800"></div>
              <small>{item.postedBy}</small>
            </div>
            <ul className="flex gap-2">
              <li className="text-sm">{item.likes} likes</li>
              <li className="text-sm">{item.comments} comments</li>
            </ul>
          </div>
        </div>
        <div className="w-3/4 h-50">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover z-0 relative"
          />
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const [showNewBlogEditor, setShowNewBlogEditor] = useState(false);
  const [timeline, setTimeline] = useState({});
  const [blogPosts, setBlogPosts] = useState(foodPosts);
  const [timelineFilter, setTimelineFilter] = useState("");

  useEffect(() => {
    const years = [...new Set(foodPosts.map((i) => i.datePosted.split("-")[0]))]
      .sort()
      .reverse();
    const blogTimelines = {};
    years.map((y) => {
      const months = [
        ...new Set(
          foodPosts.map(
            (m) => m.datePosted.split("-")[0] === y && m.datePosted.split("-")[1]
          )
        ),
      ].sort();
      blogTimelines[y] = months;
    });
    setTimeline(blogTimelines);
  }, []);

  return (
    <>
      <div className="h-full rounded-2xl w-2/5">
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
                {timeline[key].map((m) => (
                  <li key={m} className="text-gray-500">
                    <div
                      className={`cursor-pointer max-w-fit hover:text-amber-500 ${
                        `${key}-${m}` === timelineFilter ? "text-amber-500" : ""
                      }`}
                      onClick={() => setTimelineFilter(`${key}-${m}`)}
                    >
                      {months[parseInt(m)]}
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
