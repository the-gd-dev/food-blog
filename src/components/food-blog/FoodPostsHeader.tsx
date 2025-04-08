import { foodCategories } from "@/data/categories";
import React, { useState } from "react";
import { FormSelect } from "../form-components";
import { Button } from "../Button";
import {
  FilterClearIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
} from "@/assets/icons";
import { useStore } from "@/store";

interface FoodPostsHeaderPropTypes {
  itemsLayout: "grid" | "list";
  onItemsLayoutChange: () => void;
}

const FoodPostsHeader: React.FC<FoodPostsHeaderPropTypes> = ({
  itemsLayout = "grid",
  onItemsLayoutChange,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const { foodItems } = useStore();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl py-4">Food Posts</h1>
        <div className="flex gap-2">
          <Button onClick={onItemsLayoutChange} variant="secondary">
            {itemsLayout === "grid" ? (
              <GridIcon height={24} width={24} />
            ) : (
              <ListIcon height={24} width={24} />
            )}
          </Button>

          <Button
            onClick={() => setShowFilter(!showFilter)}
            variant="secondary"
          >
            {showFilter ? (
              <FilterClearIcon height={24} width={24} />
            ) : (
              <FilterIcon height={24} width={24} />
            )}
          </Button>
        </div>
      </div>
      {showFilter && (
        <div className="flex w-full py-2 gap-4 mb-4">
          <FormSelect data={foodCategories} />
          <FormSelect data={[...new Set(foodItems.map((f) => f.postedBy))]} />
        </div>
      )}
    </>
  );
};

export default FoodPostsHeader;
