"use client";

import { AppDispatch, RootState } from "@/store";
import { toggleSidebar } from "@/store/common/reducer";
import { useDispatch, useSelector } from "react-redux";

export const HamburgerMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarVisible } = useSelector((state: RootState) => state.common);
  return (
    <button
      onClick={() => dispatch(toggleSidebar())}
      className="flex flex-col justify-between w-6 h-6 relative group"
      aria-label="Toggle menu"
    >
      {/* Top Line */}
      <span
        className={`absolute h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${
          sidebarVisible ? "rotate-45 top-3.5" : "top-1"
        }`}
      ></span>

      {/* Middle Line */}
      <span
        className={`absolute h-0.5 w-full bg-black transition-opacity duration-300 ease-in-out ${
          sidebarVisible ? "opacity-0" : "opacity-100 top-3"
        }`}
      ></span>

      {/* Bottom Line */}
      <span
        className={`absolute h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${
          sidebarVisible ? "-rotate-45 bottom-2" : "bottom-0.5"
        }`}
      ></span>
    </button>
  );
};
