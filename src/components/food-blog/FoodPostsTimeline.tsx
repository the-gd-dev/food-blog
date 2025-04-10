'use client'
import { months } from "@/constants/months";
import { useStore } from "@/store";
import React, { useEffect, useState } from "react";
import { FoodPostsTimelineSkeleton } from "../skeleton-loaders";
import { useHyderation } from "@/hooks";
import { CrossIcon } from "@/assets/icons";
import { Button } from "@/components";

interface TimelineType {
  [y: string]: string[];
}

export const FoodPostsTimeline = () => {
  const { foodItems, toggleShowTimeline } = useStore();
  const [timeline, setTimeline] = useState<TimelineType>({});
  const [timelineFilter, setTimelineFilter] = useState("");
  const { hydrated } = useHyderation();

  useEffect(() => {
    if (foodItems.length > 0) {
      const years = [
        ...new Set(foodItems.map((i) => i.datePosted.split("-")[0])),
      ]
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
    }
  }, [foodItems]);

  if (!hydrated) {
    return <FoodPostsTimelineSkeleton />;
  }

  if (Object.keys(timeline).length == 0) {
    return (
      <div>
        <h1 className="text-md font-bold ">Blog Timeline</h1>
        <p className="text-gray-600">No Timeline found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-start">
        <Button
          variant="none"
          onClick={toggleShowTimeline}
          className="bg-transparent shadow-none outline-0 h-fit w-fit border-none -ml-1 mb-2 lg:hidden"
        >
          <CrossIcon height={30} width={30} />
        </Button>
        <h1 className="text-md font-bold">Blog Timeline</h1>
      </div>
      <div className="h-full overflow-auto">
        <ul>
          {Object.keys(timeline).map((key) => (
            <li className="mt-2" key={key}>
              <h1 className="font-bold text-gray-700">{key}</h1>
              <ul className="list-none flex flex-col flex-wrap">
                {timeline[key]?.map((m: string) => (
                  <li key={`${key}-${m}`} className="text-gray-500 pl-3">
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
    </div>
  );
};
