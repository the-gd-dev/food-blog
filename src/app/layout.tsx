"use client";

import { useHyderation } from "@/hooks";
import "./globals.css";
import {
  FoodBlogLogo,
  MobileSideBar,
  NewFoodPost,
  SideMenuItems,
  WriteNewBlog,
} from "@/components";
import { useStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const helpRoutes = [
  { id: 30, name: "Privacy Policy", path: "/privacy" },
  { id: 41, name: "Terms & Conditions", path: "/terms" },
  { id: 52, name: "Help Center", path: "/help-center" },
  { id: 63, name: "Feedback", path: "/feedback" },
  { id: 76, name: "FAQs", path: "/faqs" },
];

const authenticatedRoutes = [
  { id: 1, name: "Blog", path: "/" },
  { id: 2, name: "Dashboard", path: "/dashboard" },
  { id: 3, name: "My Profile", path: "/profile" },
  { id: 4, name: "Settings", path: "/settings" },
  { id: 5, name: "Notifications", path: "/notifications" },
  ...helpRoutes,
];

const guestRoutes = [
  { id: 1, name: "SignIn", path: "/auth/signin" },
  { id: 2, name: "SignUp", path: "/auth/signup" },
  ...helpRoutes,
];

const getMenuItems = (isAuth: boolean) =>
  isAuth ? authenticatedRoutes : guestRoutes;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hydrated } = useHyderation();
  const pathname = usePathname();
  const isAuthPath = useMemo(
    () => (pathname ? pathname.startsWith("/auth") : false),
    [pathname]
  );

  const {
    toggleCreatePost,
    isAuthenticated,
    createPost,
    sideMenuOpen,
    toggleSideMenu,
  } = useStore();

  if (isAuthPath) {
    return (
      <html>
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html>
      <body>
        <div className="flex flex-col items-center">
          <MobileSideBar
            sideMenuOpen={sideMenuOpen}
            toggleSideMenu={toggleSideMenu}
            isAuthenticated={isAuthenticated}
            toggleCreatePost={toggleCreatePost}
            menuItems={getMenuItems(!!isAuthenticated)}
          />

          <div className="flex w-full lg:w-4/5 justify-between md:pt-4 relative">
            <aside className="hidden md:flex pl-4 xl:pl-0 flex-col w-1/3 xl:w-1/5 sticky top-5 h-full">
              <div className="flex justify-center flex-col pb-4">
                <FoodBlogLogo variant="desktop" />
                <WriteNewBlog
                  hyderated={hydrated}
                  isAuth={!!isAuthenticated}
                  onClick={toggleCreatePost}
                />
              </div>
              <SideMenuItems data={getMenuItems(!!isAuthenticated)} />
            </aside>

            {children}
          </div>

          {!!isAuthenticated && createPost && <NewFoodPost />}
        </div>
      </body>
    </html>
  );
}
