import { FoodItem } from "@/app/blog/data/food-blogs";
import moment from "moment";
import Image from "next/image";

export const FoodPost: React.FC<{ item: FoodItem }> = ({ item }) => {
  return (
    <div
      className={`w-full border-1 border-gray-200 mb-4 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:bg-gray-100`}
    >
      <div className="flex">
        <div className="w-3/4 p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            {!item.isNonVeg ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </>
            )}
            <h3 className="text-md font-extrabold">{item.title}</h3>
          </div>
          <p className="w-full text-sm">{item.description}</p>
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
        <div className="w-3/4 h-50 relative">
          <Image
            fill
            sizes="100vw 100vh"
            src={item.imageUrl}
            alt={item.title || "Image"}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};
