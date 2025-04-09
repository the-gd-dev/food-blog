"use client";
import "./globals.css";
import { Button, FoodBlogLogo, HamburgerMenu, NewFoodPost } from "@/components";
import { useStore } from "@/store";

const WriteNewBlog = ({ onClick }: { onClick: () => void }) => (
  <Button className="cursor-pointer md:mt-2" onClick={onClick}>
    <div>Write New Blog</div>
  </Button>
);

const SideMenuItems: React.FC<{
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

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toggleCreatePost, createPost, sideMenuOpen, toggleSideMenu } =
    useStore();
  return (
    <html>
      <body>
        <div className="flex flex-col items-center">
          <div className="w-full md:hidden py-2 px-4 flex items-center justify-between shadow sticky top-0 z-40 bg-white">
            <div className="flex items-center justify-center gap-4">
              <HamburgerMenu />
              <FoodBlogLogo variant="mobile" />
            </div>

            <div>
              <WriteNewBlog onClick={toggleCreatePost} />
            </div>
          </div>
          <div
            className={`fixed md:hidden top-16 h-full left-0 z-30 transition-all ${
              !sideMenuOpen ? "-translate-x-50" : ""
            }`}
          >
            <div
              className={`overlay ${!sideMenuOpen ? "hidden" : ""}`}
              onClick={toggleSideMenu}
            ></div>
            <SideMenuItems
              variant="mobile"
              data={[
                "My Profile",
                "Settings",
                "Logout",
                "Help",
                "Terms & Conditions",
              ]}
            />
          </div>
          <div className="flex w-full px-4 xl:px-0 lg:w-4/5 justify-between md:pt-4 relative">
            <div className="hidden md:flex flex-col w-1/3 xl:w-1/5 sticky top-0 h-full">
              <div className="flex justify-center flex-col pb-4">
                <FoodBlogLogo variant="desktop" />
                <WriteNewBlog onClick={toggleCreatePost} />
              </div>
              <SideMenuItems
                data={[
                  "My Profile",
                  "Settings",
                  "Logout",
                  "Help",
                  "Terms & Conditions",
                ]}
              />
            </div>

            {children}
          </div>
          {createPost && <NewFoodPost />}
        </div>
      </body>
    </html>
  );
}
