import { months } from "@/constants/months";
import { useStore } from "@/store";
import React, { useEffect, useState } from "react";

interface TimelineType {
  [y: string]: string[];
}

export const FoodPostsTimeline = () => {
  const { foodItems } = useStore();
  const [timeline, setTimeline] = useState<TimelineType>({});
  const [timelineFilter, setTimelineFilter] = useState("");

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
  }, [foodItems]);

  return (
    <div>
      {Object.keys(timeline).length > 0 && (
        <h1 className="text-lg font-bold ">Blog Timeline</h1>
      )}
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
  );
};
