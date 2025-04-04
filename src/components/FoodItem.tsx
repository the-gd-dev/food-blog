import { FoodItem } from "@/data/food-blogs";
import moment from "moment";
import Image from "next/image";
import { UserDetails } from "./UserDetails";
import { FoodPreference } from "./FoodPreference";
import Link from "next/link";

export const FoodPost: React.FC<{ item: FoodItem }> = ({ item }) => {
  return (
    <Link href={`/blog/${item.id}`} key={`food_item_${item.id}`}>
      <div
        className={`w-full border-1 border-gray-200 mb-4 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all`}
      >
        <div className="flex">
          <div
            className={`${
              !item.imageUrl ? "w-full" : "w-1/2"
            } p-3 flex flex-col justify-between`}
          >
            <div className="flex items-center gap-2">
              <FoodPreference
                foodPreference={item.food_preference}
                textVisibility="hidden"
              />
              <h3 className="text-lg font-extrabold">{item.title}</h3>
            </div>
            <div
              className={`w-full text-md ${
                !item.imageUrl
                  ? "bg-slate-100 h-30 my-4 rounded-lg flex flex-col items-center justify-center text-xl font-medium"
                  : ""
              }`}
            >
              <p>{item.description}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-gray-500">
                <small>
                  {moment(item.datePosted).format("ddd, D MMM YYYY")}
                </small>
                <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                <UserDetails
                  profile={{
                    profile_pic: `https://randomuser.me/api/portraits/men/1.jpg`,
                    username: item.postedBy,
                  }}
                  textClasses="font-normal text-sm text-slate-800"
                  classes="w-5 h-5"
                />
              </div>
              <ul className="flex gap-2">
                <li className="text-sm">{item.likes} likes</li>
                <li className="text-sm">{item.comments} comments</li>
              </ul>
            </div>
          </div>
          {item.imageUrl && (
            <div className="w-1/2 h-50 relative">
              <Image
                fill
                sizes="100vw 100vh"
                src={`/upload/${item.imageUrl}`}
                alt={item.title || "Image"}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
