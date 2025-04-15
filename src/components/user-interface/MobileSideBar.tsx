import { FoodBlogLogo, HamburgerMenu } from "../food-blog";
import { Button } from "../form-components";
import { SideMenuItems } from "./SideMenuItems";
import { WriteNewBlog } from "./WriteNewBlog";

interface MobileSidebarPropsTypes {
  isAuthenticated?: boolean;
  toggleCreatePost?: () => void;
  sideMenuOpen?: boolean;
  menuItems?: Array<{ id: number; name: string; path: string }>;
  toggleSideMenu?: () => void;
}

export const MobileSideBar: React.FC<MobileSidebarPropsTypes> = ({
  isAuthenticated = false,
  toggleCreatePost = () => {},
  sideMenuOpen = false,
  menuItems = [],
  toggleSideMenu = () => {},
}) => {
  return (
    <>
      <div className="w-full md:hidden py-2 px-4 flex items-center justify-between shadow sticky top-0 z-40 bg-white">
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <FoodBlogLogo variant="mobile" />
        </div>
        <div className="flex gap-2">
          {!isAuthenticated && (
            <>
              <Button href="/auth/signin" role="link" className="w-20 h-8">
                SignIn
              </Button>

              <Button href="/auth/signup" role="link" className="w-20 h-8">
                SignUp
              </Button>
            </>
          )}
          <WriteNewBlog isAuth={isAuthenticated} onClick={toggleCreatePost} />
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
        />
        <SideMenuItems variant="mobile" data={menuItems} />
      </div>
    </>
  );
};
