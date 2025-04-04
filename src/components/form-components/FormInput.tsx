import React from "react";

interface FormInputType {
  type: "text" | "file" | "date" | "datetime-local";
  placeholder?: string;
  name?: string;
  classNames?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputType>(
  ({ type, placeholder, name, classNames }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        className={
          classNames ??
          `focus:outline-0 h-10 w-full bg-white rounded-md file:h-10 file:bg-amber-300`
        }
      />
    );
  }
);
