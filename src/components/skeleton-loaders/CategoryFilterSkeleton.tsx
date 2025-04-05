export const CategoryFilterSkeleton: React.FC = () => {
  return (
    <div className="mt-4 border-1 border-gray-200 rounded-xl px-4 bg-gray-50 relative animate-pulse">
      <div className="font-bold mb-1 sticky top-0 bg-white py-2">
        <div className="w-full h-5 bg-gray-300 rounded"></div>
      </div>
      <div className="h-100 py-2 overflow-y-scroll">
        <ul className="list-none">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={`skeleton_category_${index}`} className="mb-2">
              <div className="w-full h-3 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
