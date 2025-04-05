import React from "react";

export const FoodPreference: React.FC<{
  foodPreference: string;
  textVisibility: "hidden" | "visible";
}> = ({ foodPreference = false, textVisibility = "hidden" }) => {
  const isNonVeg = foodPreference === "non-veg";
  const noPreference = foodPreference === "no-preference";
  return (
    <div className="flex items-center gap-2">
      {!noPreference && (
        <div
          className={`w-3 h-3 rounded-full ${
            isNonVeg ? "bg-red-500" : "bg-green-500"
          }`}
        />
      )}
      {textVisibility === "visible" && (
        <span>
          {!noPreference ? (isNonVeg ? "Non-Veg" : "Veg") : "No Preference"}
        </span>
      )}
    </div>
  );
};
