"use client";
import { Button, FormControl, FormInput } from "@/components";
import Link from "next/link";
import bcrypt from "bcryptjs";

import { FormEvent, useEffect, useRef } from "react";
import { useStore } from "@/store/zustland-store";
import { redirect } from "next/navigation";
import { getRandomProfilePicture } from "@/utils";

export default function Signup() {
  const formRef = useRef(null);
  const { setAuthenticationStatus, setAuthUser } = useStore();
  useEffect(() => {
    document.title = "SignUp | Food Blog";
  }, []);

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const hashPass = await bcrypt.hash(
        String(formData.get("password") ?? ""),
        10
      );
      setAuthUser({
        username: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: hashPass,
        profilePicture: getRandomProfilePicture(),
      });
      setAuthenticationStatus(true);
      redirect("/");
    }
  };

  return (
    <div className="flex flex-col lg:min-h-screen/2 w-full md:w-3/5 justify-center items-center">
      <div className="bg-white md:border-2 md:border-gray-100  px-4 py-6 md:p-5 rounded-2xl w-full sm:w-2/3 md:w-full max-w-md">
        <div className="w-full pb-4">
          <h1 className="text-xl font-semibold text-gray-800">Sign Up</h1>
          <p className="text-base text-gray-600">
            Already have an account?{" "}
            <Link className="text-amber-500" href={"/auth/signin"}>
              Sign In
            </Link>{" "}
            Here.
          </p>
        </div>
        <form id="signupForm" onSubmit={onSignup} ref={formRef}>
          <FormControl label="Name">
            <FormInput type="text" required name="name" />
          </FormControl>
          <FormControl label="Email Address">
            <FormInput type="email" required name="email" />
          </FormControl>
          <FormControl label="Password">
            <FormInput type="password" required name="password" />
          </FormControl>
          <div className="mt-8">
            <Button className="w-full" type="submit">
              Signup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
