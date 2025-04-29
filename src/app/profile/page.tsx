"use client";

import { CameraIcon, PencilIcon } from "@/assets/icons";
import { FormControl, FormInput, FormTextArea } from "@/components";
import { useStore } from "@/store/zustland-store";
import Image from "next/image";

export default function Profile() {
  const { user } = useStore();
  //
  return (
    <div className="relative h-full md:pr-4 w-full md:rounded-2xl xl:w-4/5 md:ml-5 bg-white text-gray-800  overflow-hidden md:mb-5">
      <div className="border-1 border-gray-200 md:rounded-2xl overflow-hidden relative">
        <div className="absolute w-full h-52">
          <Image
            priority
            fill
            src={
              "https://img.freepik.com/free-photo/colorful-collage-fruits-texture-close-up_23-2149870264.jpg"
            }
            alt={"cover"}
            className="object-cover"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-4 right-2 bg-white hover:bg-gray-100 p-2 rounded-full cursor-pointer z-30"
          >
            <CameraIcon
              height={20}
              width={20}
              className="fill-amber-500 stroke-amber-500"
            />
            <FormInput
              type="file"
              name="profilePic"
              id="profilePic"
              className="hidden"
            />
          </label>
        </div>
        <form className="flex flex-col items-center w-full relative z-10 px-6  pt-40 pb-10">
          <h1 className="text-xl font-bold text-amber-500 bg-white absolute top-4 left-4 py-1 px-3 rounded-2xl">
            My Profile
          </h1>
          {/* Profile Picture */}
          <div className="relative w-[120px] h-[120px] mb-5">
            {user?.profilePicture && (
              <Image
                priority
                fill
                src={user.profilePicture}
                alt={user.username ?? "User Profile"}
                className="rounded-full object-cover border-2 border-gray-300"
              />
            )}

            <label
              htmlFor="profilePic"
              className="absolute bottom-0 right-0 bg-white hover:bg-gray-100 p-2 rounded-full shadow cursor-pointer"
            >
              <CameraIcon
                height={20}
                width={20}
                className="fill-amber-500 stroke-amber-500"
              />
              <FormInput
                type="file"
                name="profilePic"
                id="profilePic"
                className="hidden"
              />
            </label>
          </div>

          {/* Fields */}
          <div className="w-full space-y-4">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <FormControl label="Username / Handle">
                  <FormInput
                    type="text"
                    name="username"
                    placeholder="e.g. @johndoe123"
                    defaultValue={user?.username}
                  />
                </FormControl>
              </div>
              <div className="w-full md:w-1/2">
                <FormControl label="Email">
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="e.g. you@example.com"
                    defaultValue={user?.email}
                  />
                </FormControl>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <FormControl label="Bio / About Me">
                  <FormTextArea
                    rows={4}
                    placeholder="Tell your food story..."
                    value={user?.bio}
                  />
                </FormControl>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <FormControl label="Location">
                  <FormInput
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    defaultValue={user?.location}
                  />
                </FormControl>
              </div>
              <div className="w-full md:w-1/2">
                <FormControl label="Instagram">
                  <FormInput
                    type="url"
                    name="instagram"
                    placeholder="https://instagram.com/yourhandle"
                    defaultValue={user?.social?.instagram}
                  />
                </FormControl>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <FormControl label="YouTube">
                  <FormInput
                    type="url"
                    name="youtube"
                    placeholder="https://youtube.com/yourchannel"
                    defaultValue={user?.social?.youtube}
                  />
                </FormControl>
              </div>
              <div className="w-full md:w-1/2">
                <FormControl label="Twitter">
                  <FormInput
                    type="url"
                    name="twitter"
                    placeholder="https://twitter.com/yourhandle"
                    defaultValue={user?.social?.twitter}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
