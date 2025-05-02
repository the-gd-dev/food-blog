import { FoodItem } from "@/types";
import moment from "moment";
import Link from "next/link";
import { FoodPreference } from "./FoodPreference";
import { CommentSolidIcon, HeartOutline } from "@/assets/icons";

const baseClasses = `relative rounded-2xl overflow-hidden  cursor-pointer`;
const layoutClasses = {
  grid: `${baseClasses} food-link flex items-end w-full h-60 lg:h-75 border-1 border-gray-200 hover:shadow-md`,
  list: `${baseClasses} w-full h-28 lg:h-30 border-gray-200 border-1 hover:bg-gray-100 hover:border-gray-100 hover:shadow-md`,
};

export const FoodPost: React.FC<{
  item: FoodItem;
  layout: "grid" | "list";
}> = ({ item, layout }) => {
  const isGrid = layout === "grid";
  return (
    <Link href={`/${item._id}`} className={`${layoutClasses[layout]}`}>
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
          isGrid ? "items-end" : "center h-full"
        } w-full  relative z-20`}
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
                foodPreference={item.foodPreference ?? ""}
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
              className={`w-full text-sm my-1 ${
                !isGrid ? "text-gray-500  xl:w-60" : ""
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
                  <li className="text-xs flex items-center gap-1">
                    <HeartOutline
                      fill={isGrid ? "#FFFFFF" : "#6a6a6a"}
                      height={16}
                      width={16}
                    />
                    <div>{item.likes} </div>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <CommentSolidIcon
                      fill={isGrid ? "#FFFFFF" : "#6a6a6a"}
                      height={16}
                      width={16}
                    />
                    {item.comments}
                  </li>
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
