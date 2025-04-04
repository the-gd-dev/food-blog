import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("fileUpload") as File;
  if (!file) {
    return NextResponse.json(
      {
        message: "No File Received!",
      },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${uuidv4()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public", "upload");

  await writeFile(`${uploadDir}/${fileName}`, buffer);
  return NextResponse.json({
    message: "File uploaded.",
    fileName,
  });
}
