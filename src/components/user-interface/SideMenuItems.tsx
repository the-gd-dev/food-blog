export const SideMenuItems: React.FC<{
  variant?: "desktop" | "mobile";
  data?: string[];
  onClickMenuItem?: () => void;
}> = ({ data = [], onClickMenuItem = () => {}, variant = "desktop" }) => {
  const containerClass = {
    mobile: `h-full w-50 p-4 bg-white shadow border-1 border-gray-200 z-20 relative flex flex-col justify-between`,
    desktop: `h-100 rounded-xl p-4 border-1 border-gray-200 flex flex-col justify-between`,
  };
  return (
    <div className={containerClass[variant]}>
      <ul className="list-none">
        {data.map((item, key) => (
          <li
            onClick={onClickMenuItem}
            key={key}
            className="text-md font-semibold text-gray-800 hover:text-amber-400 w-fit cursor-pointer mb-2"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="text-justify text-sm mt-4 font-semibold">
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
