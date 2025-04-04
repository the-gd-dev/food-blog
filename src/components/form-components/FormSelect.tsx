import React, { useEffect, useState } from "react";

interface SelectOptionItem {
  id: number;
  label: string;
  value: string;
}

interface FormSelectType {
  name?: string;
  data?: SelectOptionItem[] | string[] | number[];
}

export const FormSelect: React.FC<FormSelectType> = ({ name, data = [] }) => {
  const [items, setItems] = useState<SelectOptionItem[]>([]);
  useEffect(() => {
    if (data) {
      const updatedItems = data.map((v, k) => {
        if (typeof v !== "object") {
          return {
            id: k + 1,
            label: String(v),
            value: String(v).replace(" ", "-").toLowerCase(),
          };
        }
        return v;
      });
      setItems(updatedItems);
    }
  }, [data]);
  return (
    <select
      name={name}
      className="focus:outline-0 resize-none h-8 w-full px-4 bg-white rounded-md"
    >
      {items.map((item, idx) => (
        <option value={item.value} key={`${item.label}-${idx}`}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
