"use client";
import { FilterClearIcon, FilterIcon, GridIcon, ListIcon, TimelineIcon } from "@/assets/icons";
import { Button, FormInput, FormSelect } from "@/components";
import { foodCategories } from "@/data/categories";
import { AppDispatch, RootState } from "@/store";
import { toggleFoodTimeline } from "@/store/common/reducer";
import { FoodItem } from "@/types";
import Link from "next/link";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch<AppDispatch>();
  const { items: foodItems } = useSelector((state: RootState) => state.foodPosts);
  const suggestions = useMemo(() => {
    if (searchQuery) {
      return foodItems.filter(
        (food) =>
          food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }, [searchQuery]);

  const authors = useMemo(() => {
    if (foodItems.length > 0) {
      return [...new Set(foodItems.map((f) => f.postedBy?.name))];
    }
    return [];
  }, [foodItems]);

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full relative">
          <FormInput
            value={searchQuery}
            onChange={(e) => onSearch(e.target?.value)}
            placeholder="Search anything about food..."
            type="text"
            className="border-gray-200 border-1 rounded-xl mb-3 h-12 px-4"
          />
          <div
            className={`absolute ${
              !!searchQuery && suggestions.length > 0
                ? "opacity-100 top-13 max-h-40"
                : "opacity-0 -top-13 max-h-0"
            }  z-30 bg-gray-50 border-1 border-gray-200 w-full rounded-xl py-2 px-4  overflow-y-auto transition-all`}
          >
            <ul className="flex flex-col">
              {suggestions.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/${item._id}`}
                    className="text-gray-500 mb-1 w-fit hover:text-amber-500 cursor-pointer"
                  >
                    <div className="">{item.title}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
              onClick={() => dispatch(toggleFoodTimeline())}
            >
              <TimelineIcon height={20} width={20} stroke="#333" fill={"#f1f1f1"} />
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
              transformValue={false}
              onSelect={(val: string | number) => onFilter("postedBy", val)}
              data={authors}
            />
          </div>
        )}
      </div>
    </>
  );
};
