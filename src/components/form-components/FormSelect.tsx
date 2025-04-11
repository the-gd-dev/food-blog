import React, { useMemo } from "react";

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
  disabled?: boolean;
  onSelect?: (v: string | number) => void;
  transformValue?: boolean;
  className?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectType>(
  (
    {
      name,
      data = [],
      required = false,
      placeholder = "Select an option",
      disabled = false,
      transformValue = true,
      onSelect,
      className,
      ...rest
    },
    ref
  ) => {
    const baseClass = `focus:outline-amber-400 resize-none h-9 px-2 bg-gray-100 rounded-md`;
    const defaultClasses = `w-full`;

    const items = useMemo(() => {
      if (!data) return [];
      return data.map((v, k) => {
        if (typeof v !== "object") {
          return {
            id: k + 1,
            label: String(v),
            value: transformValue
              ? String(v).replace(/\s+/g, "-").toLowerCase()
              : String(v),
          };
        }
        return v as SelectOptionItem;
      });
    }, [data, transformValue]);

    return (
      <select
        ref={ref}
        required={required}
        name={name}
        aria-label={name || "form-select"}
        className={`${baseClass} ${className || defaultClasses}`}
        disabled={disabled}
        onChange={(e) => onSelect && onSelect(e.target.value)}
        {...rest}
      >
        <option value="" disabled>{placeholder}</option>
        {items.map((item) => (
          <option value={item.value} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }
);

FormSelect.displayName = "FormSelect";
