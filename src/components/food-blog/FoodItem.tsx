import { FoodItem } from "@/data/food-blogs";
import moment from "moment";
import Link from "next/link";
import { FoodPreference } from "./FoodPreference";

export const FoodPost: React.FC<{ item: FoodItem }> = ({ item }) => {
  return (
    <Link
      href={`/blog/${item.id}`}
      className="food-link flex relative items-end w-full h-60 lg:h-75 border-1 border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md"
    >
      <div
        className="food-bg-image absolute h-full w-full z-10 transition-all"
        style={{
          background: `url(${item?.imageUrl}) center no-repeat`,
          backgroundSize: "cover",
        }}
      />
      <div className={`flex items-end w-full relative z-20`}>
        <div className="w-full p-3 md:p-4 text-white bg-gradient-to-b to-80%  from-transparent to-black">
          <div className={`"flex flex-col justify-between`}>
            <div className="flex items-center gap-1">
              <FoodPreference
                foodPreference={item.food_preference}
                textVisibility="hidden"
              />
              <h3 className="text-base md:text-lg font-extrabold">{item.title}</h3>
            </div>
            <div className={`w-full text-md mb-4`}>
              <p>
                {item.description.length > 50
                  ? item.description.substring(0, 50) + "..."
                  : item.description}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <ul className="flex gap-2">
                  <li className="text-sm">{item.likes} likes</li>
                  <li className="text-sm">{item.comments} comments</li>
                </ul>
              </div>
              <small>{moment(item.datePosted).format("ddd, D MMM YYYY")}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
