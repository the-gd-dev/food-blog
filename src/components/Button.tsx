import React from "react";

const colors = {
  primary: "bg-amber-500 hover:bg-amber-600 transition text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 transition text-gray-600",
  danger: "bg-rose-500 hover:bg-rose-600 transition text-white",
  info: "bg-blue-500 hover:bg-blue-600 transition text-white",
};

interface ButtonPropTypes {
  text?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "info";
  onClick?: () => void;
  height?: string;
  children?: React.ReactNode;
}
export const Button: React.FC<ButtonPropTypes> = ({
  height = "h-9",
  text = "Title",
  type = "button",
  variant = "primary",
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${colors[variant]} ${height} text-sm min-w-1/5 rounded-md cursor-pointer`}
    >
      {children ? children : text}
    </button>
  );
};
