"use client";
import { CommentType } from "@/types";
import moment from "moment";
import { useState } from "react";
import { UserDetails } from "./UserDetails";

interface UserCommentPropsType {
  comment: CommentType;
  onEdit?: (item: CommentType) => void;
  onDelete?: (id: string) => void;
}

export const UserComment: React.FC<UserCommentPropsType> = ({
  comment,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="border border-gray-200 p-3 rounded-lg mb-4 shadow-sm">
      <div className="flex flex-col">
        <div className="w-full flex justify-between">
          <UserDetails
            profile={{
              profile_pic: comment?.userId?.profile_pic || "",
              username: comment?.userId?.name,
            }}
            textClasses="text-normal font-bold text-gray-800"
            classes="h-8 w-8"
          />
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
                  <li
                    onClick={() => {
                      setShowOptions(false);
                      onEdit(comment as CommentType);
                    }}
                    className="hover:bg-gray-200 cursor-pointer px-4 py-1"
                  >
                    Edit
                  </li>
                  <li
                    onClick={() => {
                      setShowOptions(false);
                      onDelete(comment?._id as string);
                    }}
                    className="hover:bg-gray-200 cursor-pointer px-4 py-1"
                  >
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
