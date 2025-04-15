import React from "react";

interface FormTextAreaProps {
  id?: string;
  rows?: number;
  className?: string;
  placeholder?: string;
}

export const FormTextArea: React.FC<
  FormTextAreaProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef(
  (
    {
      id = "",
      rows = 5,
      className = "w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500",
      placeholder = "",
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
      />
    );
  }
);

FormTextArea.displayName = "FormTextArea";
