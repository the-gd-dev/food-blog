import { Button } from "@/components";
import { AppDispatch, RootState } from "@/store";
import { toggleFoodForm } from "@/store/common/reducer";
import { useDispatch, useSelector } from "react-redux";

export const NoFoodPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.common);
  return (
    <div className="rounded-xl h-50 lg:h-90 mt-3 w-full flex flex-col items-center justify-center bg-gray-100 shadow-md p-4">
      <h1 className="text-xl font-medium text-gray-800">No New Posts Found</h1>
      <p className="text-sm  font-light mt-2 text-gray-600 text-center mb-3">
        It looks like there are no posts yet. Why not create one?
      </p>
      {isAuthenticated && (
        <Button onClick={() => dispatch(toggleFoodForm())}>
          Create A New Post
        </Button>
      )}
    </div>
  );
};
