import { DefaultProfilePic } from "@/assets/icons";
import Image from "next/image";
import React from "react";

interface UserDetailsType {
  profile: {
    profile_pic?: string;
    username?: string;
  };
  classes?: string;
  textClasses?: string;
}

export const UserDetails: React.FC<UserDetailsType> = ({
  profile,
  classes,
  textClasses = "text-gray-800 font-bold",
}) => {
  return (
    <div className="flex items-center gap-2">
      {!profile.profile_pic && (
        <DefaultProfilePic className={`${classes} rounded-full object-cover inline`} />
      )}
      {profile.profile_pic && (
        <Image
          height={100}
          width={100}
          src={profile.profile_pic ?? ""}
          alt={profile.username ?? ""}
          className={`${classes} rounded-full object-cover`}
        />
      )}
      <div className={`${textClasses}`}>{profile.username}</div>
    </div>
  );
};
