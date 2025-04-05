import { CategoryFilterSkeleton } from "./skeleton-loaders";

export const CategoryFilter: React.FC<{
  data: string[];
  heading: string;
  currentSelection: string;
  onChangeCategory: (fc: string) => void;
}> = ({ data, heading, currentSelection, onChangeCategory }) => {
  if (!data || data.length === 0) {
    return <CategoryFilterSkeleton />;
  }
  return (
    <div className="mt-4 border-1 border-gray-200 rounded-xl pb-2 relative bg-gray-50 overflow-hidden">
      <h1 className="font-bold px-4 mb-1 sticky top-0 py-2 bg-gray-50">
        {heading}
      </h1>
      <div className="h-100 px-4 overflow-y-scroll">
        <ul className="list-none">
          {data.sort().map((fl, _index) => (
            <li key={`category_${_index}`} className="mb-1">
              <div
                className={`hover:text-amber-500 cursor-pointer w-fit ${
                  currentSelection === fl ? "text-amber-500" : ""
                }`}
                onClick={() => onChangeCategory(fl)}
              >
                {fl}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
