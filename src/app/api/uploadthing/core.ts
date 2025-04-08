import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  foodImageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("File uploaded:", file.url);
      // You can store file.url in DB here
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
