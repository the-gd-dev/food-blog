import { foodCategories } from "@/data/categories";
import { useStore } from "@/store";
import { FormEvent, useRef } from "react";
import { FormInput } from "../form-components/FormInput";
import { FormSelect } from "../form-components/FormSelect";
import { Button } from "../Button";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import imageCompression from "browser-image-compression";

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

export const NewFoodPost = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { foodItems, toggleCreatePost, createFoodItem } = useStore();

  const createNewFoodItem = async (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;
      const food_preference = formData.get("food_preference") as string;
      const fileInput = formData.get("image") as File;

      if (!fileInput || fileInput.size === 0) {
        console.error("No image file selected");
        return;
      }

      try {
        const compressedFile = await imageCompression(fileInput, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        });
        const uploaded = await uploadFiles("foodImageUploader", {
          files: [compressedFile],
        });

        const imageUrl = uploaded?.[0]?.url ?? "";

        // Create food item with uploaded image URL
        createFoodItem({
          id: foodItems.length + 1,
          title: title || "",
          imageUrl,
          description: description || "",
          likes: 100,
          comments: 100,
          postedBy: "John Doe",
          datePosted: new Date().toISOString(),
          foodCategory: String(category),
          food_preference: String(food_preference),
        });

        formRef.current.reset();
        setTimeout(() => {
          toggleCreatePost();
        }, 100);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
  };

  return (
    <div className="absolute h-full w-full z-30 flex justify-center items-center">
      <div className="overlay" onClick={toggleCreatePost} />
      <form
        onSubmit={createNewFoodItem}
        ref={formRef}
        className="relative z-20 flex flex-col bg-gray-400 shadow-md rounded-xl p-4 w-3/4 md:w-1/2 lg:w-1/3"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
          <div className="w-full sm:w-1/2">
            <FormInput
              required
              type="text"
              name="title"
              placeholder="Post Title"
            />
          </div>
          <div className="w-full sm:w-1/2">
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
          maxLength={300}
          name="description"
          placeholder="Post Description"
          className="focus:outline-0 resize-none h-20 p-2 bg-white rounded-md mb-5"
        ></textarea>
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <div className="w-full md:w-1/2">
            <FormInput
              required
              name="image"
              type="file"
              classNames="file:bg-gray-500 file:px-2 file:text-white w-full focus:outline-0 resize-none file:h-9 bg-white rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <FormSelect required name="category" data={foodCategories} />
          </div>
        </div>

        <div className="flex justify-end py-2 gap-2">
          <Button onClick={toggleCreatePost} variant="secondary">
            Discard
          </Button>
          <Button type="submit" variant="primary">
            New Post
          </Button>
        </div>
      </form>
    </div>
  );
};
