import React, { useEffect, useMemo, useState } from "react";

interface SelectOptionItem {
  id: number;
  label: string;
  value: string;
}

interface FormSelectType {
  required?: boolean;
  name?: string;
  data?: SelectOptionItem[] | (string | number)[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectType> = ({
  name,
  data = [],
  required = false,
  placeholder = "Select an option",
}) => {
  const items = useMemo(() => {
    if (!data) return [];
    return data.map((v, k) => {
      if (typeof v !== "object") {
        return {
          id: k + 1,
          label: String(v),
          value: String(v).replace(/\s+/g, "-").toLowerCase(),
        };
      }
      return v as SelectOptionItem;
    });
  }, [data]);

  return (
    <select
      required={required}
      name={name}
      aria-label={name || "form-select"}
      className="focus:outline-0 resize-none h-9 w-full px-2 bg-gray-100 rounded-md"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {items.map((item) => (
        <option value={item.value} key={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
