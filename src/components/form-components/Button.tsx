import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "outline" | "none";
  className?: string;
  disabled?: boolean;
  loader?: boolean;
}

const baseStyles = `cursor-pointer inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60`;

const variants: { [key in NonNullable<ButtonProps["variant"]>]: string } = {
  none: ``,
  primary: `px-3 py-2 shadow-sm bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus-visible:ring-amber-500`,
  secondary: ` px-3 py-2 shadow-sm bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400`,
  danger: `px-3 py-2 shadow-sm bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500`,
  outline: `px-3 py-2 shadow-sm border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400`,
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loader = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loader && (
        <div className="h-5 w-5 animate-spin mr-2 border-amber-400 border-l-3 border-l-white border-3 rounded-full relative"></div>
      )}
      {children}
    </button>
  );
};
