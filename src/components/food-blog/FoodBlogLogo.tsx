import React from "react";
const variants = {
  mobile: {
    label: "text-gray-800 text-xs",
    title: "text-amber-500 text-2xl font-semibold",
  },
  desktop: {
    label: "text-gray-800 text-sm",
    title: "text-amber-500 text-3xl font-semibold",
  },
};

export const FoodBlogLogo: React.FunctionComponent<{
  variant: "desktop" | "mobile";
}> = ({ variant }) => {
  return (
    <div className="logo">
      <p className={variants[variant].label}>Write . Publish . Share</p>
      <h3 className={variants[variant].title}>Food Blog</h3>
    </div>
  );
};
