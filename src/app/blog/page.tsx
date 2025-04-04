"use client";
import { FoodPost } from "@/components/FoodItem";
import { useStore } from "@/store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { months } from "../../constants/months";

interface TimelineType {
  [y: string]: string[];
}

export default function Blog() {
  const formRef = useRef<HTMLFormElement>(null);
  const [timeline, setTimeline] = useState<TimelineType>({});
  const [timelineFilter, setTimelineFilter] = useState("");
  const [newFoodItem, setNewFoodItem] = useState<{
    title: string;
    description: string;
    fileUpload?: string;
  }>({
    title: "",
    description: "",
    fileUpload: "",
  });

  const { createPost, foodItems, toggleCreatePost, createFoodItem } =
    useStore();

  useEffect(() => {
    const years = [...new Set(foodItems.map((i) => i.datePosted.split("-")[0]))]
      .sort()
      .reverse();
    const blogTimelines: TimelineType = {};

    years.forEach((y) => {
      const months = [
        ...new Set(
          foodItems
            .filter((m) => m.datePosted.split("-")[0] === String(y))
            .map((m) => m.datePosted.split("-")[1])
        ),
      ].sort();

      blogTimelines[y] = months;
    });

    setTimeline(blogTimelines);
    document.title = `Food App`;
  }, [foodItems]);

  const createNewFoodItem = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const file = formData.get("fileUpload") as File;

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          createFoodItem({
            id: foodItems.length + 1,
            title: title || "",
            imageUrl: data.fileName || "",
            description: description || "",
            likes: 100,
            comments: 100,
            postedBy: "John Doe",
            datePosted: new Date().toISOString(),
            foodCategory: "Some Food Category",
            isNonVeg: false,
          });
          formRef?.current?.reset();
          toggleCreatePost();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="h-full rounded-2xl w-4/9">
        {createPost && (
          <div id="new-post" className="sticky top-0 z-30">
            <form
              ref={formRef}
              className="flex flex-col my-4 bg-amber-500 relative rounded-xl p-3"
            >
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                className="focus:outline-0 resize-none h-8 mb-2 py-2 px-4 bg-white rounded-md"
              />
              <textarea
                name="description"
                placeholder="Write a new blog post..."
                className="focus:outline-0 resize-none h-25 py-2 px-4 bg-white rounded-md mb-2"
              ></textarea>
              <input
                name="fileUpload"
                type="file"
                className="bg-white file:bg-amber-200 rounded-md"
              />
              <div className="flex justify-end py-2">
                <button
                  onClick={toggleCreatePost}
                  type="button"
                  className="bg-white text-gray-600 text-sm px-4 py-1 rounded-md cursor-pointer mr-3"
                >
                  Discard
                </button>
                <button
                  onClick={createNewFoodItem}
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
          {foodItems.map((fp, key) => (
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
