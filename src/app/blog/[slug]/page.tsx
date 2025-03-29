"use client";

import { SingleComment } from "@/components/SingleComment";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { comments } from "../data/comments";
import { foodPosts } from "../data/food-blogs";

// Page Component
export default function Page() {
  const route = useRouter();
  const { slug } = useParams();
  const post = foodPosts.find((fp) => fp.id === Number(slug)) ?? null;

  if (!post) {
    return <p className="text-center text-red-500 mt-5">Post not found!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 w-4/7">
      {/* Post Card */}
      <div className="w-full py-4">
        <button
          onClick={() => route.back()}
          className="bg-amber-500 py-1 rounded-md text-black cursor-pointer w-20"
          type="button"
        >
          Back
        </button>
      </div>
      <div className="border relative border-gray-300 overflow-hidden rounded-2xl shadow-md">
        {/* Ensure parent has height */}
        <div className="relative w-full h-100">
          <Image
            fill
            sizes="100vw 100vh"
            src={post.imageUrl}
            alt={post.title}
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${
                post.isNonVeg ? "bg-red-500" : "bg-green-500"
              }`}
            ></div>
            <span>{post.isNonVeg ? "Non-Veg" : "Veg"}</span>
          </div>

          <div className="flex justify-between">
            <h1 className="text-xl font-bold">
              {post.title}{" "}
              <span className="text-gray-500">({post.foodCategory})</span>
            </h1>
            <p className="text-gray-700">Posted By: {post.postedBy}</p>
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
            <SingleComment comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
