"use server";

import moment from "moment";
import { foodPosts } from "../data/food-blogs";
export async function generateStaticParams({ params }) {
  return [];
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = foodPosts.find((fp) => fp.id === parseInt(slug)) ?? {};

  return (
    <>
      <div className="h-full rounded-2xl w-4/8 mt-28 border-gray-300 border-1 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="h-full w-full" />
        <div className="p-2">
          <div className="w-100 flex items-center gap-1 mb-1">
            {!post.isNonVeg ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-300"></div> Veg
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-red-300"></div> Non-Veg
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
      <div className="h-full w-1/8"></div>
    </>
  );
}
