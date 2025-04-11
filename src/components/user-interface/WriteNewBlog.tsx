import { Button } from "../form-components";

export const WriteNewBlog = ({
  onClick,
  isAuth,
}: {
  onClick: () => void;
  isAuth: boolean;
}) =>
  isAuth ? (
    <Button className="cursor-pointer md:mt-2" onClick={onClick}>
      <div>Write New Blog</div>
    </Button>
  ) : null;
