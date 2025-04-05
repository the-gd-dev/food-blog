import { foodCategories } from "@/data/categories";
import { useStore } from "@/store";
import { FormEvent, useRef } from "react";
import { FormInput } from "../form-components/FormInput";
import { FormSelect } from "../form-components/FormSelect";
import { Button } from "../Button";

export const NewFoodPost = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { foodItems, toggleCreatePost, createFoodItem } = useStore();

  const createNewFoodItem = (e: FormEvent) => {
    e.preventDefault();
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
        onSubmit={createNewFoodItem}
        ref={formRef}
        className="flex flex-col bg-gray-400 shadow-md rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1/2">
            <FormInput
              required
              type="text"
              name="title"
              placeholder="Post Title"
            />
          </div>
          <div className="w-1/2">
            <FormSelect
              required
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
          required
          name="description"
          placeholder="Post Description"
          className="focus:outline-0 resize-none h-20 p-2 bg-white rounded-md mb-5"
        ></textarea>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1/2">
            <FormInput
              required
              name="fileUpload"
              type="file"
              classNames="file:bg-gray-500 file:px-2 file:text-white w-full focus:outline-0 resize-none file:h-9 bg-white rounded-md"
            />
          </div>
          <div className="w-1/2">
            <FormSelect required name="category" data={foodCategories} />
          </div>
        </div>

        <div className="flex justify-end py-2 gap-2">
          <Button
            onClick={toggleCreatePost}
            type="button"
            variant="secondary"
            text="Discard"
          />
          <Button type="submit" variant="primary" text="Create" />
        </div>
      </form>
    </div>
  );
};
