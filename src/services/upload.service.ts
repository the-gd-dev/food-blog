import { httpClient } from "@/utils";

export const imageUploadService = async (formFile: FormData) => {
  try {
    const uploadResponse = await httpClient({
      apiUrl: "/food-posts/image/upload",
      method: "POST",
      data: formFile,
      isPrivate: true,
    });
    const imageUrl = uploadResponse?.data?.url;
    if (!imageUrl) throw new Error("File upload failed.");
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
