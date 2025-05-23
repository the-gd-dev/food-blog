import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errMessage?: string;
  type: "text" | "file" | "date" | "datetime-local" | "email" | "password" | "url";
  placeholder?: string;
  name?: string;
  className?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type,
      placeholder,
      isInvalid = false,
      name,
      className = "",
      errMessage = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = `block w-full p-2 border-2 bg-white rounded-md  focus:outline-none transition-all`;
    const validInput = `border-gray-200 focus:ring-amber-500 focus:border-amber-500`;
    const invalidInput = `border-red-700 focus:ring-red-500 focus:border-red-500`;
    const combinedClasses = `${baseClasses} ${className} ${
      isInvalid ? invalidInput : validInput
    }`.trim();

    return (
      <>
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={combinedClasses}
          {...props}
        />
        {errMessage && <div className="text-sm text-red-500 mt-1">{errMessage}</div>}
      </>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
