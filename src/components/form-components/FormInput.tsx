import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "file" | "date" | "datetime-local";
  placeholder?: string;
  name?: string;
  classNames?: string;
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, placeholder, name, classNames, required = false, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={
          classNames ??
          `focus:outline-0 h-9 px-2 w-full bg-white rounded-md file:h-10 file:bg-amber-300`
        }
        {...rest}
      />
    );
  }
);

FormInput.displayName = "FormInput";
