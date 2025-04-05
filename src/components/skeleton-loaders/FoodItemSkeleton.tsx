export const FoodItemSkeleton: React.FC = () => {
  return (
    <div
      className={`w-full border-1 border-gray-200 mb-4 rounded-2xl overflow-hidden`}
    >
      <div className="flex animate-pulse">
        {/* Left Section */}
        <div className="w-1/2 p-3 flex flex-col justify-between">
          {/* Title and Food Preference */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Description */}
          <div className="w-full text-md bg-gray-300 h-20 my-4 rounded-lg"></div>

          <div>
            <div className="flex items-center gap-1 text-gray-500 mb-2">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            </div>
            <ul className="flex gap-2">
              <li className="w-12 h-4 bg-gray-300 rounded"></li>
              <li className="w-16 h-4 bg-gray-300 rounded"></li>
            </ul>
          </div>
        </div>

        {/* Right Section (Image Placeholder) */}
        <div className="w-1/2 h-50 bg-gray-300"></div>
      </div>
    </div>
  );
};
