import React from "react";

interface FormTextAreaProps {
  id?: string;
  rows?: number;
  className?: string;
  placeholder?: string;
  value?: string;
}

export const FormTextArea: React.FC<
  FormTextAreaProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef(
  (
    {
      id = "",
      rows = 5,
      className = "w-full border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500",
      placeholder = "",
      value = "",
      ...rest
    },
    ref
  ) => {
    return (
      <textarea
        id={id}
        rows={rows}
        className={className}
        placeholder={placeholder}
        ref={ref}
        defaultValue={value}
        {...rest}
      />
    );
  }
);

FormTextArea.displayName = "FormTextArea";
