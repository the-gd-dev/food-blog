import bcrypt from "bcryptjs";
import crypto from "crypto";

export const generateHashedToken = async () => {
  const rawToken = crypto.randomBytes(32).toString("hex"); // 64-char token
  const saltRounds = 10;
  const hashedToken = await bcrypt.hash(rawToken, saltRounds);

  return { rawToken, hashedToken };
};

export const getRandomProfilePicture = (gender = "any") => {
  const id = Math.floor(Math.random() * 100);
  const selectedGender =
    gender === "male" || gender === "female"
      ? gender
      : Math.random() < 0.5
      ? "men"
      : "women";

  return `https://randomuser.me/api/portraits/${selectedGender}/${id}.jpg`;
};
