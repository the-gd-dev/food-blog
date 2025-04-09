import React from "react";
const variants = {
  mobile: {
    label: "text-gray-800 text-xs -mb-2",
    title: "text-amber-500 text-2xl font-semibold",
  },
  desktop: {
    label: "text-gray-800 text-sm -mb-2",
    title: "text-amber-500 text-4xl font-semibold",
  },
};

export const FoodBlogLogo: React.FunctionComponent<{
  variant: "desktop" | "mobile";
}> = ({ variant }) => {
  return (
    <div className="logo">
      <p className={variants[variant].label}>Write . Publish . Share</p>
      <h3 className={variants[variant].title}>FoodBlog</h3>
    </div>
  );
};
