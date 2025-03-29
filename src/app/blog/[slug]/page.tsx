"use client";

import moment from "moment";
import { useState } from "react";
import { useParams } from "next/navigation";
import { foodPosts } from "../data/food-blogs";
import { comments, CommentType } from "../data/comments";
import Image from "next/image";

const SingleComment = ({ comment }: { comment: CommentType }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="border border-gray-200 p-3 rounded-lg mb-4 shadow-sm">
      <div className="flex flex-col">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-3">
            <Image
              height={100}
              width={100}
              src={comment.user.profile_pic ?? ""}
              alt={comment.user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="text-gray-800 font-bold">{comment.user.name}</div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2"
            >
              <span className="text-gray-600">⋮</span>
            </button>
            {showOptions && (
              <div className="absolute bg-white border border-gray-300 right-2 rounded-sm py-2 shadow-md">
                <ul>
                  <li className="hover:bg-gray-200 cursor-pointer px-4 py-1">
                    Edit
                  </li>
                  <li className="hover:bg-gray-200 cursor-pointer px-4 py-1">
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-800 mt-2">{comment.text}</p>
        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <small>{moment(comment.createdAt).format("LLL")}</small>
          <small>{comment.likes} Likes</small>
        </div>
      </div>
    </div>
  );
};

// Page Component
export default function Page() {
  const { slug } = useParams();
  const post = foodPosts.find((fp) => fp.id === Number(slug)) ?? null;

  if (!post) {
    return <p className="text-center text-red-500 mt-5">Post not found!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Post Card */}
      <div className="border border-gray-300 overflow-hidden rounded-2xl shadow-md">
        <Image
          height={100}
          width={100}
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-60 object-cover"
        />
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
