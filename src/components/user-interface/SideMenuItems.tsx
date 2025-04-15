"use client";
import { useHyderation } from "@/hooks";
import { useStore } from "@/store";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { SideMenuItemsSkeleton } from "../skeleton-loaders";

export const SideMenuItems: React.FC<{
  variant?: "desktop" | "mobile";
  data?: { id: number; name: string; path: string }[];
  onClickMenuItem?: () => void;
}> = ({ data = [], onClickMenuItem = () => {}, variant = "desktop" }) => {
  const pathname = usePathname();
  const { hydrated } = useHyderation();
  const { logoutUser, isAuthenticated } = useStore();
  const baseClass = ` h-full p-4 border-1 border-gray-200 flex flex-col justify-between`;

  const containerClass = {
    mobile: `${baseClass} w-50 bg-white shadow z-20 relative`,
    desktop: `${baseClass} rounded-xl`,
  };

  const logoutHandler = () => {
    if (confirm("Are you sure you want to logout?")) {
      document.cookie = `token=; path=/; expires=${new Date().toLocaleDateString()}`;
      logoutUser();
      redirect("/auth/signin");
    }
  };

  if (!hydrated) {
    return <SideMenuItemsSkeleton />;
  }

  return (
    <div className={containerClass[variant]}>
      <ul className="list-none flex flex-col gap-y-2">
        {data.map((item) => (
          <li onClick={onClickMenuItem} key={`${variant}-link-${item.id}`}>
            <Link
              href={item.path}
              className={`text-xs xs:text-base font-semibold ${
                pathname === item.path ? "text-amber-400" : "text-gray-800"
              } hover:text-amber-400 w-fit cursor-pointer mb-2`}
            >
              {item.name}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <li onClick={logoutHandler}>
            <div className="text-xs xs:text-base font-semibold text-gray-800 hover:text-amber-400 w-fit cursor-pointer mb-2">
              Logout
            </div>
          </li>
        )}
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
