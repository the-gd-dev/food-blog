export const SideMenuItems: React.FC<{
  variant?: "desktop" | "mobile";
  data?: string[];
  onClickMenuItem?: () => void;
}> = ({ data = [], onClickMenuItem = () => {}, variant = "desktop" }) => {
  const baseClass = ` h-full p-4 border-1 border-gray-200 flex flex-col justify-between`;
  const containerClass = {
    mobile: `${baseClass} w-50 bg-white shadow z-20 relative`,
    desktop: `${baseClass} rounded-xl`,
  };
  return (
    <div className={containerClass[variant]}>
      <ul className="list-none">
        {data.map((item, key) => (
          <li
            onClick={onClickMenuItem}
            key={key}
            className="text-xs sm:text-base font-semibold text-gray-800 hover:text-amber-400 w-fit cursor-pointer mb-2"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex text-justify text-xs gap-1 mt-4 font-semibold">
        <p>Developed by</p>
        <a
          target="_blank"
          className="text-blue-400 hover:underline"
          href="http://github.com/the-gd-dev"
        >
          @the-gd-dev
        </a>
      </div>
    </div>
  );
};
