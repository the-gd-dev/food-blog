import { Button } from "../form-components";

export const WriteNewBlogSkeleton: React.FC = () => (
  <div className="h-10 bg-gray-300 rounded-md animate-pulse md:mt-2"></div>
);

export const WriteNewBlog = ({
  onClick,
  hyderated,
  isAuth,
}: {
  onClick: () => void;
  isAuth: boolean;
  hyderated?: boolean;
}) => {
  if (!hyderated) return <WriteNewBlogSkeleton />;
  return isAuth ? (
    <Button className="cursor-pointer md:mt-2" onClick={onClick}>
      <div>Write New Blog</div>
    </Button>
  ) : null;
};
