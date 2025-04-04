import { foodCategories } from "@/data/categories";
import { useStore } from "@/store";
import { useRef } from "react";
import { FormInput } from "./form-components/FormInput";
import { FormSelect } from "./form-components/FormSelect";

export const NewFoodPost = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { foodItems, toggleCreatePost, createFoodItem } = useStore();

  const createNewFoodItem = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;
      const food_preference = formData.get("food_preference") as String;

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          createFoodItem({
            id: foodItems.length + 1,
            title: title || "",
            imageUrl: data.fileName || "",
            description: description || "",
            likes: 100,
            comments: 100,
            postedBy: "John Doe",
            datePosted: new Date().toISOString(),
            foodCategory: String(category),
            food_preference: String(food_preference),
          });
          formRef?.current?.reset();
          toggleCreatePost();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div id="new-post" className="sticky top-0 z-30">
      <form
        ref={formRef}
        className="flex flex-col my-4 bg-amber-500 relative rounded-xl p-3"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1/2">
            <FormInput type="text" name="title" placeholder="Post Title" />
          </div>
          <div className="w-1/2">
            <FormSelect
              name="food_preference"
              data={[
                { id: 1, label: "Vegetarian", value: "veg" },
                { id: 2, label: "Non-Vegetarian", value: "non-veg" },
                { id: 3, label: "No Preference", value: "no-preference" },
              ]}
            />
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Write a new blog post..."
          className="focus:outline-0 resize-none h-25 py-2 px-4 bg-white rounded-md mb-2"
        ></textarea>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1/2">
            <FormInput
              name="fileUpload"
              type="file"
              classNames="file:bg-amber-200 file:px-2 w-full focus:outline-0 resize-none file:h-8 bg-white rounded-md"
            />
          </div>
          <div className="w-1/2">
            <FormSelect name="category" data={foodCategories} />
          </div>
        </div>

        <div className="flex justify-end py-2">
          <button
            onClick={toggleCreatePost}
            type="button"
            className="bg-white text-gray-600 text-sm px-4 py-1 rounded-md cursor-pointer mr-3"
          >
            Discard
          </button>
          <button
            onClick={createNewFoodItem}
            type="button"
            className="bg-amber-400 hover:bg-amber-600 text-white text-sm px-4 py-1 rounded-md cursor-pointer "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
