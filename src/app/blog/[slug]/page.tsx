"use client";

import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { CommentType } from "../../../data/comments";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/store";
import {
  UserComment,
  FoodPreference,
  UserDetails,
  Button,
  NewComment,
} from "@/components";
import { foodCategories } from "@/data/categories";
import { TrashIcon } from "@/assets/icons";

export default function Page() {
  const route = useRouter();
  const params = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const { foodItems, deleteFoodItem } = useStore();
  const post = foodItems.find((fp) => fp.id === Number(params?.slug)) ?? null;

  const category = useMemo(
    () => foodCategories.find((i) => i.value === post?.foodCategory)?.label,
    [post]
  );

  useEffect(() => {
    document.title = post
      ? `${post?.title || "No Post Found"} | Food App`
      : "Food App";
  }, [post]);

  const onDeleteItem = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      await deleteFoodItem(post!.id);
      route.back();
    }
  };

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 w-4/7 h-100 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-4">
          Sorry, the post you are looking for does not exist or has been
          removed.
        </p>
        <Button onClick={() => route.back()}>Go Back</Button>
      </div>
    );
  }

  const newCommentHandler = () => {
    if (!newComment) return;
    const newComm: CommentType = {
      id: comments.length + 1,
      user: {
        name: "John Doe",
        profile_pic: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      text: newComment,
      createdAt: new Date().toISOString(),
      likes: 10,
    };
    setComments([newComm, ...comments]);
    setNewComment("");
  };

  return (
    <div className="px-8 mx-auto w-4/5">
      <div className="w-full flex mt-4 gap-2">
        <div className="w-1/2">
          <div className="w-full pb-4 flex justify-between items-center">
            <Button onClick={() => route.back()}>Back</Button>
            <div className="flex w-fit gap-2">
              <Button variant="danger" onClick={onDeleteItem}>
                <TrashIcon height={16} width={16} />
              </Button>
            </div>
          </div>
          <div className="border relative border-gray-300 overflow-hidden rounded-2xl shadow-md">
            <div className="relative w-full h-75">
              <Image
                fill
                sizes="100vw 100vh"
                src={`/upload/${post?.imageUrl}`}
                alt={post?.title ?? ""}
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserDetails
                  profile={{
                    profile_pic: `https://randomuser.me/api/portraits/men/1.jpg`,
                    username: post?.postedBy ?? "Anonymous",
                  }}
                  textClasses="font-normal text-sm text-slate-800"
                  classes="w-5 h-5"
                />
              </div>

              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">
                  {post?.title}{" "}
                  <span className="text-gray-500">({category})</span>
                </h1>
                <FoodPreference
                  foodPreference={post?.food_preference || "Unknown"}
                  textVisibility="visible"
                />
              </div>

              <p className="py-3 text-gray-700">{post.description}</p>
              <div className="flex w-full justify-between items-center">
                <ul className="flex gap-4 text-sm text-gray-600">
                  <li>{post?.likes} likes</li>
                  <li>{post?.comments} comments</li>
                </ul>
                <div className="text-gray-500 text-sm">
                  {moment(post?.datePosted).format("ddd, D MMM YYYY")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="px-4">
            <NewComment
              comment={newComment}
              onChangeText={(v) => setNewComment(v)}
              onSubmit={newCommentHandler}
            />
            <div className="h-0.25 bg-gray-300 my-4 rounded-2xl"></div>
            <h2 className="pb-2 font-semibold text-lg">
              Comments ({comments.length})
            </h2>
            <div className="mt-4 max-h-100 overflow-y-auto space-y-4">
              {comments.map((comment) => (
                <UserComment
                  onDelete={(id) => {
                    if (confirm("Are you sure to delete this comment ?")) {
                      setComments(comments.filter((c) => c.id !== id));
                    }
                  }}
                  comment={comment}
                  key={comment.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
