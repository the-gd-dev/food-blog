export const FoodPostsHeaderSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-9 bg-gray-300 rounded w-full mb-2"></div>
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
