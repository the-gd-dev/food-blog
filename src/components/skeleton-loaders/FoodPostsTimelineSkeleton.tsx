export const FoodPostsTimelineSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-30 bg-gray-400 rounded mb-2"></div>
      {/* Skeleton for Timeline Items */}
      <ul className="mt-4">
        {Array.from({ length: 3 }).map((_, yearIndex) => (
          <li className="mt-2" key={`skeleton_year_${yearIndex}`}>
            {/* Skeleton for Year */}
            <div className="h-4 w-1/4 bg-gray-400 rounded mb-2"></div>
            <ul className="list-none flex flex-col flex-wrap">
              {Array.from({ length: 5 }).map((_, monthIndex) => (
                <li
                  key={`skeleton_month_${yearIndex}_${monthIndex}`}
                  className="mb-1"
                >
                  <div className="h-3 w-2/4 bg-gray-300 rounded"></div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
