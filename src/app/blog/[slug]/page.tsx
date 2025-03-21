"use client";

import moment from "moment";
import { foodPosts } from "../data/food-blogs";
import { useState } from "react";
import { comments } from "../data/comments";

interface Comment {
  id: number;
  user: {
    name: string;
    profile_pic: string;
  };
  comment: {
    text: string;
    createdAt: string;
    likes: number;
  };
}

const SingleComment: React.Component<{
  onClickUserOptions: () => void;
  comment: Comment;
}> = ({ onClickUserOptions, comment }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="single-comment border-1 border-gray-200  p-2 rounded-lg mb-4">
      <div className="flex flex-col">
        <div className="w-full flex justify-between">
          <div className="user-info flex items-center gap-2 mb-3">
            <div className="profile-pic h-7 w-7 bg-gray-200 rounded-full"></div>
            <div className="text-gray-800 font-bold">{comment?.user?.name}</div>
          </div>
          <div className="comment-options relative">
            <button
              className="flex items-center p-2 gap-0.5"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            </button>

            {showOptions && (
              <div className="options absolute bg-white border-1 border-gray-300 right-2 rounded-sm py-2">
                <ul>
                  <li className="hover:bg-gray-200 cursor-pointer px-4">Edit</li>
                  <li className="hover:bg-gray-200 cursor-pointer px-4">Delete</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="comment-content text-gray-800">
            <p>{comment.text}</p>
          </div>
        </div>
        <div className="w-full flex justify-between text-gray-600 mt-4">
          <small>{comment.createdAt}</small>
          <small> {comment.likes} Likes</small>
        </div>
      </div>
    </div>
  );
};

export default function Page({ params }) {
  const { slug } = params;
  const post = foodPosts.find((fp) => fp.id === parseInt(slug)) ?? {};
  const [showCommentInput, setShowCommentInput] = useState(false);
  return (
    <>
      <div className="h-full w-4/8 mt-4">
        <div className=" border-gray-300 border-1 overflow-hidden rounded-2xl ">
          <img src={post.imageUrl} alt={post.title} className="h-full w-full" />
          <div className="p-4">
            <div className="w-100 flex items-center gap-1 mb-1">
              {!post.isNonVeg ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div> Veg
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> Non-Veg
                </>
              )}
            </div>
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">
                {post?.title}{" "}
                <span className="text-gray-500"> ({post.foodCategory})</span>
              </h1>
              <div className="flex items-center gap-1 text-gray-800">
                Posted By : {post.postedBy}
              </div>
            </div>
            <p className="py-5">{post?.description}</p>
            <div className="">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                {moment(post.datePosted).format("ddd, D MMM YYYY")}
              </div>

              <ul className="flex gap-2">
                <li className="text-sm">{post.likes} likes</li>
                <li className="text-sm">{post.comments} comments</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4 mt-4 border-gray-300 border-1 overflow-hidden rounded-2xl">
          <h2 className="pb-2 font-semibold">Comments ({comments.length})</h2>
          <form action="">
            <textarea
              name=""
              id=""
              className="h-20 w-full p-2 resize-none border-gray-300 border-1 rounded-lg"
              placeholder="write a comment..."
            ></textarea>
            <div className="flex justify-end">
              <button className="bg-amber-500 p-1 px-4 rounded-sm cursor-pointer hover:bg-amber-600">
                Comment
              </button>
            </div>
          </form>
          <div id="comments" className="mt-4">
            {comments.map((comment) => (
              <SingleComment
                comment={comment}
                onClickUserOptions={() => {}}
                key={comment.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-full w-1/8"></div>
    </>
  );
}
