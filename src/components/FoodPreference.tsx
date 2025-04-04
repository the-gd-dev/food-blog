import React from "react";

export const FoodPreference: React.FC<{
  isNonVeg: boolean;
  textVisibility: "hidden" | "visible";
}> = ({ isNonVeg = false, textVisibility = "hidden" }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          isNonVeg ? "bg-red-500" : "bg-green-500"
        }`}
      />
      {textVisibility === "visible" && (
        <span>{isNonVeg ? "Non-Veg" : "Veg"}</span>
      )}
    </div>
  );
};
