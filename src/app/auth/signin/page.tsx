"use client";
import { Button, FormControl, FormInput } from "@/components";
import { useStore } from "@/store";
import { generateHashedToken } from "@/utils";
import bcrypt from "bcryptjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export default function Login() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const { user, setAuthenticationStatus } = useStore();

  useEffect(() => {
    document.title = "SignIn | Food Blog";
  }, []);

  const signInHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get("email");
      const password = formData.get("password");
      const isPasswordValid = await bcrypt.compare(
        String(password ?? ""),
        user?.password ?? ""
      );

      if (email != user?.email || !isPasswordValid) {
        setErrors({
          general: "The user details you entered is not matched!",
        });
        return false;
      }
      const hashedToken = (await generateHashedToken()).hashedToken;
      document.cookie = `token=${hashedToken}; path=/; max-age=86400`;
      setAuthenticationStatus(true);
      redirect("/");
    }
  };

  return (
    <div className="flex w-full justify-center items-center md:items-start">
      <div className="bg-white sm:border-2 sm:border-gray-100 p-4 py-6 md:p-5 rounded-2xl w-full sm:w-2/3 md:w-full max-w-md">
        <div className="w-full pb-4">
          <h1 className="text-xl font-semibold text-gray-800">Sign In</h1>
          <p className="text-base text-gray-600">
            Want to Join Us?{" "}
            <Link className="text-amber-500" href={"/auth/signup"}>
              Signup
            </Link>
          </p>
        </div>
        <form
          ref={formRef}
          id="loginForm"
          className="space-y-4"
          onSubmit={signInHandler}
        >
          <FormControl label="Email" error={errors?.general || errors.email}>
            <FormInput
              type="email"
              required
              name="email"
              isInvalid={!!(errors?.general || errors.email)}
            />
          </FormControl>
          <FormControl label="Password" error={errors.password}>
            <FormInput
              type="password"
              required
              name="password"
              isInvalid={!!errors.password}
            />
          </FormControl>
          <div className="mt-8">
            <Button className="w-full" type="submit">
              SignIn
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
