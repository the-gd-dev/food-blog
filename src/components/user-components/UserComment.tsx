'use client'
import { CommentType } from "@/data/comments";
import moment from "moment";
import { useState } from "react";
import { UserDetails } from "./UserDetails";

interface UserCommentPropsType {
  comment: CommentType;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
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
              profile_pic: comment.user.profile_pic || "",
              username: comment?.user.name,
            }}
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
                    onClick={() => onEdit(comment?.id)}
                    className="hover:bg-gray-200 cursor-pointer px-4 py-1"
                  >
                    Edit
                  </li>
                  <li
                    onClick={() => onDelete(comment?.id)}
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
