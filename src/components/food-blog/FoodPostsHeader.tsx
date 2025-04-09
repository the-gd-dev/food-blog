import {
  FilterClearIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  TimelineIcon,
} from "@/assets/icons";
import { Button, FormInput, FormSelect } from "@/components";
import { foodCategories } from "@/data/categories";
import { FoodItem } from "@/data/food-blogs";
import { useStore } from "@/store";
import React from "react";

interface FoodPostsHeaderPropTypes {
  itemsLayout: "grid" | "list";
  filterVisible?: boolean;
  searchQuery?: string;
  onItemsLayoutChange: () => void;
  toggleFilter?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (key: keyof FoodItem, value: string | number) => void;
}

export const FoodPostsHeader: React.FC<FoodPostsHeaderPropTypes> = ({
  itemsLayout = "grid",
  filterVisible = false,
  searchQuery = "",
  onItemsLayoutChange,
  onFilter = () => {},
  toggleFilter = () => {},
  onSearch = () => {},
}) => {
  const { foodItems, toggleShowTimeline } = useStore();
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full">
          <FormInput
            value={searchQuery}
            onChange={(e) => onSearch(e.target?.value)}
            placeholder="Search anything about food..."
            type="text"
            className="border-gray-200 border-1 rounded-xl mb-3 h-12 px-4"
          />
        </div>
        <div className="flex items-center justify-between pb-2">
          <h1 className="font-semibold text-lg">Food Posts</h1>
          <div className="flex gap-2">
            <Button onClick={onItemsLayoutChange} variant="secondary">
              {itemsLayout === "grid" ? (
                <GridIcon height={20} width={20} />
              ) : (
                <ListIcon height={20} width={20} />
              )}
            </Button>

            <Button onClick={toggleFilter} variant="secondary">
              {filterVisible ? (
                <FilterClearIcon height={20} width={20} />
              ) : (
                <FilterIcon height={20} width={20} />
              )}
            </Button>

            <Button
              variant="secondary"
              className="lg:hidden"
              onClick={toggleShowTimeline}
            >
              <TimelineIcon
                height={20}
                width={20}
                stroke="#333"
                fill={"#f1f1f1"}
              />
            </Button>
          </div>
        </div>
        {filterVisible && (
          <div className="flex w-full gap-4 mb-4">
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
