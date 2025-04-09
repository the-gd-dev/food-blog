import { foodCategories } from "@/data/categories";
import React, { FormEvent } from "react";
import { FormInput, FormSelect } from "../form-components";
import { Button } from "../Button";
import {
  FilterClearIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
} from "@/assets/icons";
import { useStore } from "@/store";
import { FoodItem } from "@/data/food-blogs";

interface FoodPostsHeaderPropTypes {
  itemsLayout: "grid" | "list";
  filterVisible?: boolean;
  searchQuery?: string;
  onItemsLayoutChange: () => void;
  toggleFilter?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (key: keyof FoodItem, value: string | number) => void;
}

const FoodPostsHeader: React.FC<FoodPostsHeaderPropTypes> = ({
  itemsLayout = "grid",
  filterVisible = false,
  searchQuery,
  onItemsLayoutChange,
  onFilter = () => {},
  toggleFilter = () => {},
  onSearch = () => {},
}) => {
  const { foodItems } = useStore();
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full">
          <FormInput
            value={searchQuery}
            onChange={(e) => onSearch(e.target?.value)}
            placeholder="Search anything about food..."
            type="text"
            className="border-gray-200 border-1 rounded-sm mb-3"
          />
        </div>
        <div className="flex items-center justify-between pb-4">
          <h1 className="font-semibold text-lg">Food Posts</h1>
          <div className="flex gap-2">
            <Button onClick={onItemsLayoutChange} variant="secondary">
              {itemsLayout === "grid" ? (
                <GridIcon height={16} width={16} />
              ) : (
                <ListIcon height={16} width={16} />
              )}
            </Button>

            <Button onClick={toggleFilter} variant="secondary">
              {filterVisible ? (
                <FilterClearIcon height={16} width={16} />
              ) : (
                <FilterIcon height={16} width={16} />
              )}
            </Button>
          </div>
        </div>
        {filterVisible && (
          <div className="flex w-full py-2 gap-4 mb-4">
            <FormSelect
              className="w-1/2 sm:w-1/3 xl:w-1/4"
              onSelect={(val: string | number) => onFilter("foodCategory", val)}
              data={foodCategories}
            />
            <FormSelect
              className="w-1/2 sm:w-1/3 xl:w-1/4"
              tranformValue={false}
              onSelect={(val: string | number) => onFilter("postedBy", val)}
              data={[...new Set(foodItems.map((f) => f.postedBy))]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FoodPostsHeader;
