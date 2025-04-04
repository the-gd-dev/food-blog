export const CategoryFilter: React.FC<{
  data: string[];
  heading: string;
  currentSelection: string;
  onChangeCategory: (fc: string) => void;
}> = ({ data, heading, currentSelection, onChangeCategory }) => {
  return (
    <div className="mt-4 border-1 border-gray-200 rounded-xl px-4 h-100 pb-2 overflow-y-scroll relative">
      <h1 className="font-bold mb-1 sticky top-0 bg-white py-2">{heading}</h1>
      <ul className="list-none">
        {data &&
          data.length > 0 &&
          data.sort().map((fl, _index) => (
            <li key={`category_${_index}`} className="mb-1 ">
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
  );
};
