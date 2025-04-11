export const SideMenuItemsSkeleton: React.FC<{
  variant?: "desktop" | "mobile";
}> = ({ variant = "desktop" }) => {
  const baseClass = `h-full p-4 border-1 border-gray-200 flex flex-col justify-between animate-pulse`;
  const containerClass = {
    mobile: `${baseClass} w-50 bg-gray-100 shadow z-20 relative`,
    desktop: `${baseClass} rounded-xl`,
  };

  return (
    <div className={containerClass[variant]}>
      <ul className="list-none flex flex-col gap-y-2">
        {Array.from({ length: 13 }).map((_, index) => (
          <li key={`skeleton-menu-item-${index}`}>
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
          </li>
        ))}
      </ul>
      <div className="flex text-justify text-xs gap-2 mt-4 font-semibold">
        <div className="h-2 bg-gray-300 rounded w-1/3"></div>
        <div className="h-2 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};
