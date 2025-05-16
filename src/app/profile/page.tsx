"use client";

import { CameraIcon } from "@/assets/icons";
import { FormControl, FormInput, FormTextArea, UserDetails } from "@/components";
import { imageUploadService } from "@/services/upload.service";
import { AppDispatch, RootState } from "@/store";
import { updateUserData } from "@/store/auth/reducer";
import { httpClient } from "@/utils";
import Image from "next/image";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    document.title = `My Profile ${user?.name ? "- " + user?.name : ""}`;
  }, [user]);

  const updateProfileData = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const elem = e.currentTarget;
      const name = elem.name;
      let payload: any = {};
      if (name === "profilePicture" || name === "cover") {
        const input = e.target as HTMLInputElement;
        const fileInput = input.files && input.files[0];
        if (!fileInput || fileInput.size === 0) {
          console.error("No image file selected");
          return;
        }
        const formFile = new FormData();
        formFile.append("file", fileInput, fileInput.name);
        const imageUrl = await imageUploadService(formFile);
        payload[name] = imageUrl;
      }
      const res = await httpClient({
        apiUrl: "/users/update",
        method: "PUT",
        data: payload,
        isPrivate: true,
      });
      dispatch(updateUserData({ ...res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-full md:pr-4 w-full md:rounded-2xl xl:w-4/5 md:ml-5 bg-white text-gray-800  overflow-hidden md:mb-5">
      <div className="border-1 border-gray-200 md:rounded-2xl overflow-hidden relative">
        <div className="absolute w-full h-55">
          {user?.cover && (
            <Image priority fill src={user?.cover} alt={"cover"} className="object-cover" />
          )}
          <label
            htmlFor="cover"
            className="absolute bottom-4 right-2 bg-white hover:bg-gray-100 p-2 rounded-full cursor-pointer z-30"
          >
            <CameraIcon height={20} width={20} className="fill-amber-500 stroke-amber-500" />
            <FormInput
              type="file"
              name="cover"
              id="cover"
              className="hidden"
              onChange={updateProfileData as any}
            />
          </label>
        </div>
        <form className="flex flex-col items-center w-full relative z-10 px-6  pt-40 pb-10">
          {/* Profile Picture */}
          <div className="relative w-[120px] h-[120px] mb-5">
            <UserDetails
              classes="h-28 w-30"
              profile={{
                profile_pic: user?.profilePicture,
              }}
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-2 right-2 bg-white hover:bg-gray-100 p-2 rounded-full shadow cursor-pointer"
            >
              <CameraIcon height={20} width={20} className="fill-amber-500 stroke-amber-500" />
              <FormInput
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="hidden"
                onChange={updateProfileData as any}
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
                    disabled
                    placeholder="e.g. you@example.com"
                    defaultValue={user?.email}
                  />
                </FormControl>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <FormControl label="Bio / About Me">
                  <FormTextArea rows={4} placeholder="Tell your food story..." value={user?.bio} />
                </FormControl>
              </div>
              <div className="w-full md:w-1/2">
                <FormControl label="Location">
                  <FormInput
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    defaultValue={user?.location}
                  />
                </FormControl>
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
