"use client";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button, FormInput, FormSelect } from "@/components";
import { foodCategories } from "@/data/categories";
import { FoodItem } from "@/data/food-blogs";
import { useStore } from "@/store/zustland-store";
import { httpClient } from "@/utils";
import { generateReactHelpers } from "@uploadthing/react";
import imageCompression from "browser-image-compression";
import { FormEvent, useState } from "react";

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

export const NewFoodPost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleCreatePost, createFoodItem } = useStore();
  const createNewFoodItem = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const form = e.currentTarget;
    if (e.currentTarget) {
      const formData = new FormData(form);

      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;
      const food_preference = formData.get("food_preference") as string;
      const fileInput = formData.get("image") as File;

      if (!fileInput || fileInput.size === 0) {
        console.error("No image file selected");
        setLoading(false);
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

        const imageUrl = uploaded?.[0]?.ufsUrl ?? "";
        if (!imageUrl) {
          console.error("Image upload failed");
          setLoading(false);
          return;
        }

        const payload: FoodItem = {
          title: title || "",
          imageUrl,
          description: description || "",
          likes: 0,
          comments: 0,
          datePosted: new Date().toISOString(),
          foodCategory: String(category),
          foodPreference: String(food_preference),
        };

        const raw = await httpClient({
          apiUrl: "/food-posts/create",
          method: "POST",
          data: payload,
          isPrivate: true,
        });

        if (raw.ok) {
          const res = await raw.json();
          createFoodItem(payload);
          form.reset();
          setTimeout(() => {
            toggleCreatePost();
          }, 100);
        } else {
          console.error("Failed to create food post");
        }
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="absolute h-full w-full z-30 flex justify-center items-center">
      <div className="overlay" onClick={toggleCreatePost} />
      <form
        onSubmit={createNewFoodItem}
        className="relative z-20 flex flex-col bg-gray-400 shadow-md rounded-xl p-4 w-90 md:w-1/2 lg:w-1/3"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
          <div className="w-full sm:w-1/2">
            <FormInput
              required
              disabled={loading}
              type="text"
              name="title"
              placeholder="Post Title"
              className="border-none"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <FormSelect
              required
              disabled={loading}
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
          disabled={loading}
          placeholder="Post Description"
          className="focus:outline-0 resize-none h-20 p-2 bg-white rounded-md mb-3"
        ></textarea>
        <div className="flex flex-col md:flex-row items-center gap-2 mb-3">
          <div className="w-full md:w-1/2">
            <FormInput
              disabled={loading}
              required
              name="image"
              type="file"
              className="file:bg-gray-500 file:h-9 py-0 file:px-2 pl-0 file:text-white w-full focus:outline-0 resize-none bg-white rounded-md border-none"
            />
          </div>
          <div className="w-full md:w-1/2 mt-1 md:mt-0">
            <FormSelect
              disabled={loading}
              required
              name="category"
              data={foodCategories}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={toggleCreatePost} variant="secondary">
            Discard
          </Button>
          <Button
            disabled={loading}
            type="submit"
            variant="primary"
            loader={loading}
          >
            New Post
          </Button>
        </div>
      </form>
    </div>
  );
};
