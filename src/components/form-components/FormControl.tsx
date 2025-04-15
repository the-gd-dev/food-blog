import React, { ReactElement } from "react";

interface FormControlProps {
  label?: string;
  error?: string;
  children: ReactElement<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}

export const FormControl: React.FC<FormControlProps> = ({
  label,
  error,
  children,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="w-full mb-1">{children}</div>
      {error && (
        <div className="text-red-700 text-base text-semibold">{error}</div>
      )}
    </div>
  );
};
