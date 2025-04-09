import { FoodItem } from "@/data/food-blogs";
import moment from "moment";
import Link from "next/link";
import { FoodPreference } from "./FoodPreference";

const baseClasses = `relative rounded-2xl overflow-hidden  cursor-pointer`;
const layoutClasses = {
  grid: `${baseClasses} food-link flex items-end w-full h-60 lg:h-75 border-1 border-gray-200 hover:shadow-md`,
  list: `${baseClasses} w-full h-28 lg:h-30 border-gray-200 border-1 hover:bg-gray-100 hover:border-gray-100`,
};

export const FoodPost: React.FC<{
  item: FoodItem;
  layout: "grid" | "list";
}> = ({ item, layout }) => {
  const isGrid = layout === "grid";
  return (
    <Link href={`/blog/${item.id}`} className={`${layoutClasses[layout]}`}>
      <div
        className={`food-bg-image absolute h-full w-full z-10 transition-all`}
        style={{
          background: `url(${item?.imageUrl}) no-repeat`,
          backgroundSize: isGrid ? "cover" : "35% 100%",
          backgroundPosition: isGrid ? "center" : "right",
        }}
      />
      <div
        className={`flex flex-col ${
          isGrid ? "items-end" : "center"
        } w-full h-full relative z-20`}
      >
        <div
          className={`w-full px-3 py-2 ${
            isGrid
              ? "text-white bg-gradient-to-b to-80%  from-transparent to-black"
              : ""
          }`}
        >
          <div className={`"flex flex-col justify-between`}>
            <div className="flex items-center gap-1">
              <FoodPreference
                foodPreference={item.food_preference}
                textVisibility="hidden"
              />
              <h3
                className={`text-base md:text-md font-semibold ${
                  !isGrid ? "text-gray-900" : ""
                }`}
              >
                {item.title}
              </h3>
            </div>
            <div
              className={`w-full text-sm my-2 ${
                !isGrid ? "text-gray-500" : ""
              }`}
            >
              <p>
                {item.description.length > 50
                  ? item.description.substring(0, 50) + "..."
                  : item.description}
              </p>
            </div>
            <div>
              <div className="flex flex-col">
                <ul className="flex gap-2">
                  <li className="text-xs">{item.likes} likes</li>
                  <li className="text-xs">{item.comments} comments</li>
                </ul>
                <small className="text-xs">
                  {moment(item.datePosted).format("ddd, D MMM YYYY")}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
