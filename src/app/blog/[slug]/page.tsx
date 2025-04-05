"use client";

import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { comments } from "../../../data/comments";
import { useEffect, useMemo } from "react";
import { useStore } from "@/store";
import { UserComment, FoodPreference, UserDetails, Button } from "@/components";
import { foodCategories } from "@/data/categories";
import { PencilIcon, TrashIcon } from "@/assets/icons";

export default function Page() {
  const route = useRouter();
  const params = useParams();
  const { foodItems } = useStore();
  const post = foodItems.find((fp) => fp.id === Number(params?.slug)) ?? null;

  if (!post) {
    return <p className="text-center text-red-500 mt-5">Post not found!</p>;
  }

  const category = useMemo(
    () => foodCategories.find((i) => i.value === post.foodCategory)?.label,
    [post]
  );

  useEffect(() => {
    document.title = `${post.title} | Food App`;
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 w-4/7">
      {/* Post Card */}
      <div className="w-full py-4 flex justify-between">
        <Button text="Back" onClick={() => route.back()} />
        <div className="flex w-fit gap-2">
          <Button variant="info" text="Edit" height="w-fit px-4">
            <PencilIcon height={16} width={16} />
          </Button>
          <Button variant="danger" text="Delete" height="w-fit px-4">
            <TrashIcon height={16} width={16} />
          </Button>
        </div>
      </div>
      <div className="border relative border-gray-300 overflow-hidden rounded-2xl shadow-md">
        {/* Ensure parent has height */}
        <div className="relative w-full h-100">
          <Image
            fill
            sizes="100vw 100vh"
            src={`/upload/${post.imageUrl}`}
            alt={post.title}
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <FoodPreference
              foodPreference={post.food_preference}
              textVisibility="visible"
            />
          </div>

          <div className="flex justify-between">
            <h1 className="text-xl font-bold">
              {post.title} <span className="text-gray-500">({category})</span>
            </h1>
            <UserDetails
              profile={{
                profile_pic: `https://randomuser.me/api/portraits/men/1.jpg`,
                username: post.postedBy,
              }}
              textClasses="font-normal text-sm text-slate-800"
              classes="w-5 h-5"
            />
          </div>

          <p className="py-3">{post.description}</p>

          <div className="text-gray-500 text-sm">
            {moment(post.datePosted).format("ddd, D MMM YYYY")}
          </div>

          <ul className="flex gap-2 text-sm mt-2">
            <li>{post.likes} likes</li>
            <li>{post.comments} comments</li>
          </ul>
        </div>
      </div>

      {/* Comments Section */}
      <div className="p-4 mt-4 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="pb-2 font-semibold">Comments ({comments.length})</h2>
        <form>
          <textarea
            className="h-20 w-full p-2 resize-none border border-gray-300 rounded-lg"
            placeholder="Write a comment..."
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="bg-amber-500 p-1 px-4 rounded cursor-pointer hover:bg-amber-600">
              Comment
            </button>
          </div>
        </form>
        <div id="comments" className="mt-4">
          {comments.map((comment) => (
            <UserComment comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
