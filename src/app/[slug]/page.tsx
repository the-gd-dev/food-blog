"use client";
import {
  CommentSolidIcon,
  HeartOutline,
  HeartSolid,
  TrashIcon,
} from "@/assets/icons";
import {
  Button,
  Comments,
  FoodPreference,
  NewComment,
  UserDetails,
} from "@/components";
import { foodCategories } from "@/data/categories";
import { AppDispatch, RootState } from "@/store";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/store/comments/slice";
import { deleteFoodItem } from "@/store/food-list/slice";
import { CommentType, FoodItem } from "@/types";
import { httpClient } from "@/utils";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const route = useRouter();
  const params = useParams();
  const [commentId, setCommentId] = useState("");
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState<FoodItem>();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.common);
  const { comments, loading: commentsLoading } = useSelector(
    (state: RootState) => state.comments
  );

  const category = useMemo(
    () => foodCategories.find((i) => i.value === post?.foodCategory)?.label,
    [post]
  );

  useEffect(() => {
    async function initialize() {
      const { ok, data } = await httpClient({
        apiUrl: `/food-posts/${params?.slug}`,
      });
      if (ok) {
        setPost(data as FoodItem);
        document.title = data?.title
          ? `${data?.title || "No Post Found"} | Food App`
          : "Food App";
      }
    }
    dispatch(getComments({ postId: params?.slug as string }));
    initialize();
  }, []);

  const onDeleteItem = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      dispatch(deleteFoodItem(post?._id));
      route.back();
    }
  };

  const editCommentHandler = (item: CommentType) => {
    setCommentId(item._id!);
    setNewComment(item.text!);
  };

  const deleteCommentHandler = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      dispatch(deleteComment({ id: id }));
      setPost((prevPost) => {
        if (!prevPost) return prevPost; // Handle undefined case
        return {
          ...prevPost,
          comments: comments.length - 1,
        };
      });
    }
  };

  const newCommentHandler = () => {
    if (!newComment) return;
    if (post) {
      if (commentId) {
        dispatch(
          updateComment({
            text: newComment,
            _id: commentId,
            postId: post?._id as string,
          })
        );
        dispatch(getComments({ postId: post?._id as string }));
        setCommentId("");
      } else {
        dispatch(
          createComment({ text: newComment, postId: post?._id } as CommentType)
        );
      }

      setPost({
        ...post,
        comments: comments.length + 1,
      });
    }
    setNewComment("");
  };

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 w-full md:w-4/7 h-100 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">404 - Not Found</h2>
        <p className="text-gray-600 mb-4">
          Sorry, the page you are looking for does not exist or has been
          removed.
        </p>
        <Button onClick={() => route.push("/")} className="px-4">
          Go To Home
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full md:w-3/5 lg:w-4/5 p-4 md:p-0 md:pl-8">
      <div className="w-full flex flex-col xl:flex-row mt-4 gap-2">
        <div className="w-full xl:w-1/2 relative">
          <div className="w-full pb-4 flex justify-between items-center absolute z-20 p-3">
            <Button variant="secondary" onClick={() => route.back()}>
              Back
            </Button>
            <div className="flex w-fit gap-2">
              {isAuthenticated && (
                <Button isRounded variant="danger" onClick={onDeleteItem}>
                  <TrashIcon height={16} width={16} />
                </Button>
              )}
            </div>
          </div>
          <div className="border relative border-gray-300 overflow-hidden rounded-2xl shadow-md">
            <div className="relative w-full h-75">
              <div
                className={`food-bg-image absolute h-full w-full z-10 transition-all`}
                style={{
                  background: `url(${post?.imageUrl}) no-repeat`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserDetails
                  profile={{
                    profile_pic: (post?.postedBy as any)?.profilePicture,
                    username: (post?.postedBy as any)?.name,
                  }}
                  textClasses="font-normal text-sm text-slate-800"
                  classes="w-5 h-5"
                />
              </div>

              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                  {post?.title}{" "}
                  <span className="text-gray-500">({category})</span>
                </h1>
                <FoodPreference
                  foodPreference={post?.foodPreference || "Unknown"}
                  textVisibility="visible"
                />
              </div>

              <p className="py-3 text-gray-700">{post?.description}</p>
              <div className="flex w-full justify-between items-center">
                <ul className="flex gap-4 text-normal text-gray-600">
                  <li className="flex gap-1 items-center">
                    <HeartOutline
                      fill="transparent"
                      stroke="#000"
                      height={24}
                      width={24}
                    />
                    {post?.likes} likes
                  </li>
                  <li className="flex gap-1 items-center">
                    <CommentSolidIcon fill={"#6a6a6a"} height={24} width={24} />
                    {post?.comments} comments
                  </li>
                </ul>
                <div className="text-gray-500 text-sm">
                  {moment(post?.datePosted).format("ddd, D MMM YYYY")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="mt-4 xl:mt-0 xl:px-4">
            <NewComment
              commentPosting={commentsLoading}
              comment={newComment}
              onChangeText={(v) => setNewComment(v)}
              onSubmit={newCommentHandler}
            />
            {comments.length > 0 && (
              <Comments
                onEditComment={editCommentHandler}
                onDeleteComment={deleteCommentHandler}
                items={comments}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
