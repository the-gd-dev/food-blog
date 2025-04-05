export const FoodItemSkeleton: React.FC = () => {
  return (
    <div className="w-65 border border-gray-200 rounded-2xl overflow-hidden shadow-md animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-300"></div>

      {/* Content Placeholder */}
      <div className="p-4 bg-white">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

        {/* Description Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>

        {/* Footer Placeholder */}
        <div className="flex justify-between items-center">
          {/* Likes and Comments */}
          <div className="flex gap-4">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          {/* Date */}
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};
