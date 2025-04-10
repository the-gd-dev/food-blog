"use client";
import "./globals.css";
import {
  Button,
  FoodBlogLogo,
  HamburgerMenu,
  NewFoodPost,
  SideMenuItems,
} from "@/components";
import { useStore } from "@/store";

const WriteNewBlog = ({ onClick }: { onClick: () => void }) => (
  <Button className="cursor-pointer md:mt-2" onClick={onClick}>
    <div>Write New Blog</div>
  </Button>
);

const sideMenuItems = [
  "Dashboard",
  "My Profile",
  "Settings",
  "Notifications",
  "Help Center",
  "FAQs",
  "Terms & Conditions",
  "Privacy Policy",
  "Contact Support",
  "About",
  "Feedback",
  "Logout",
];

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
            className={`fixed md:hidden top-12 h-full left-0 z-30 transition-all ${
              !sideMenuOpen ? "-translate-x-50" : ""
            }`}
          >
            <div
              className={`overlay ${!sideMenuOpen ? "hidden" : ""}`}
              onClick={toggleSideMenu}
            ></div>
            <SideMenuItems variant="mobile" data={sideMenuItems} />
          </div>
          <div className="flex w-full px-4 xl:px-0 lg:w-4/5 justify-between md:pt-4 relative">
            <div className="hidden md:flex flex-col w-1/3 xl:w-1/5 sticky top-0 h-full">
              <div className="flex justify-center flex-col pb-4">
                <FoodBlogLogo variant="desktop" />
                <WriteNewBlog onClick={toggleCreatePost} />
              </div>
              <SideMenuItems data={sideMenuItems} />
            </div>

            {children}
          </div>
          {createPost && <NewFoodPost />}
        </div>
      </body>
    </html>
  );
}
