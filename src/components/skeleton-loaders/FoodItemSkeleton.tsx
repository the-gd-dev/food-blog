export const FoodItemSkeleton: React.FC = () => {
  return (
    <div className="w-full h-60 lg:h-75 border border-gray-200 rounded-2xl overflow-hidden shadow-md animate-pulse">
      {/* Image Placeholder */}
      <div className="h-1/2 bg-gray-300"></div>

      {/* Content Placeholder */}
      <div className="h-1/2 p-3 md:p-4 bg-white flex flex-col justify-between">
        {/* Title and Food Preference Placeholder */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Description Placeholder */}
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>

        {/* Footer Placeholder */}
        <div className="flex justify-between items-center gap-2">
          {/* Likes and Comments */}
          <div className="flex gap-4">
            <div className="h-2 bg-gray-300 rounded w-16"></div>
            <div className="h-2 bg-gray-300 rounded w-20"></div>
          </div>
          {/* Date */}
          <div className="h-2 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};
