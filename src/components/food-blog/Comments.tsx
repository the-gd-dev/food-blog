"use client";
import { CommentType } from "@/types";
import React from "react";
import { UserComment } from "../user-components";

export const Comments: React.FC<{ items: CommentType[] }> = ({ items }) => {
  return (
    <div>
      <div className="h-0.25 bg-gray-300 my-4 rounded-2xl" />
      <h2 className="pb-2 font-semibold text-normal">
        Comments ({items.length})
      </h2>
      <div className="mt-4 max-h-100 overflow-y-auto space-y-4">
        {items.map((comment) => (
          <UserComment
            onDelete={(id) => {}}
            comment={comment}
            key={comment._id as string}
          />
        ))}
      </div>
    </div>
  );
};
