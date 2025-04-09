import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "file" | "date" | "datetime-local";
  placeholder?: string;
  name?: string;
  className?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { type, placeholder, name, className = "", required = false, ...rest },
    ref
  ) => {
    const baseClasses =
      "focus:outline-0 h-9 px-2 w-full bg-white rounded-md file:h-10 file:bg-amber-300";

    const combinedClasses = `${baseClasses} ${className}`.trim();

    return (
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={combinedClasses}
        {...rest}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
