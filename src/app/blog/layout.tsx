"use client";
import { Button, FoodBlogLogo, HamburgerMenu, NewFoodPost } from "@/components";
import { useStore } from "@/store";

const WriteNewBlog = ({ onClick }: { onClick: () => void }) => (
  <Button className="cursor-pointer md:mt-2" onClick={onClick}>
    Write New Blog
  </Button>
);

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toggleCreatePost, createPost, sideMenuOpen, toggleSideMenu } =
    useStore();
  return (
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
        <div className="h-full w-50 p-4 bg-gray-100 shadow border-1 border-gray-200 z-20 relative">
          <ul className="list-none">
            {[
              "My Profile",
              "Settings",
              "Logout",
              "Help",
              "Terms & Conditions",
            ].map((item, key) => (
              <li
                key={key}
                className="text-md hover:text-amber-400 w-fit cursor-pointer mb-2"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="text-justify text-md mt-4 font-semibold">
            Developed by
            <br />
            <a
              target="_blank"
              className="text-blue-400 hover:underline"
              href="http://github.com/the-gd-dev"
            >
              the-gd-dev
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 xl:px-0 lg:w-4/5 justify-between md:pt-2 relative">
        <div className="hidden md:flex flex-col w-1/3 xl:w-1/5 sticky top-0 h-full">
          <div className="flex justify-center flex-col py-4">
            <FoodBlogLogo variant="desktop" />
            <WriteNewBlog onClick={toggleCreatePost} />
          </div>
          <div className="rounded-xl p-4 bg-gray-100 shadow border-1 border-gray-200">
            <ul className="list-none">
              {[
                "My Profile",
                "Settings",
                "Logout",
                "Help",
                "Terms & Conditions",
              ].map((item, key) => (
                <li
                  key={key}
                  className="text-md hover:text-amber-400 w-fit cursor-pointer mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-justify text-md mt-4 font-semibold">
              Developed by
              <br />
              <a
                target="_blank"
                className="text-blue-400 hover:underline"
                href="http://github.com/the-gd-dev"
              >
                the-gd-dev
              </a>
            </div>
          </div>
        </div>

        {children}
      </div>
      {createPost && <NewFoodPost />}
    </div>
  );
}
