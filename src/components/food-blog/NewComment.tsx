import React, { FormEvent } from "react";
import { Button } from "../Button";

interface NewCommentPropTypes {
  onSubmit: () => void;
  comment?: string;
  onChangeText?: (txt: string) => void;
  maxCommentLength?: number;
}

export const NewComment: React.FC<NewCommentPropTypes> = ({
  onSubmit,
  maxCommentLength = 200,
  onChangeText,
  comment = "",
}) => {
  return (
    <div className="w-full">
      <textarea
        value={comment}
        onChange={(e: FormEvent<HTMLTextAreaElement>) =>
          onChangeText?.((e.target as HTMLTextAreaElement).value ?? "")
        }
        maxLength={maxCommentLength}
        className="h-20 w-full p-2 resize-none border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a comment..."
      ></textarea>
      <div className="flex justify-end mt-2">
        <Button onClick={onSubmit}>Comment</Button>
      </div>
    </div>
  );
};
