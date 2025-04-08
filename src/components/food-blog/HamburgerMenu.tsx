"use client";

import { useStore } from "@/store";

export const HamburgerMenu = () => {
  const { sideMenuOpen, toggleSideMenu } = useStore();
  return (
    <button
      onClick={toggleSideMenu}
      className="flex flex-col justify-between w-6 h-6 relative group"
      aria-label="Toggle menu"
    >
      {/* Top Line */}
      <span
        className={`absolute h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${
          sideMenuOpen ? "rotate-45 top-3.5" : "top-1"
        }`}
      ></span>

      {/* Middle Line */}
      <span
        className={`absolute h-0.5 w-full bg-black transition-opacity duration-300 ease-in-out ${
          sideMenuOpen ? "opacity-0" : "opacity-100 top-3"
        }`}
      ></span>

      {/* Bottom Line */}
      <span
        className={`absolute h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${
          sideMenuOpen ? "-rotate-45 bottom-2" : "bottom-0.5"
        }`}
      ></span>
    </button>
  );
};
