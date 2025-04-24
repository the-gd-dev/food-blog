"use client";
import { Button, FormControl, FormInput } from "@/components";
import { useStore } from "@/store/zustland-store";
import { FormErrors } from "@/types";
import { httpClient } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {
  const { setAuthenticationStatus } = useStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [alertMessage, setAlertMessage] = useState<string>("");
  useEffect(() => {
    document.title = "SignIn | Food Blog";
  }, []);

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await httpClient({
      apiUrl: `/login`,
      method: "POST",
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    const response = await res.json();
    if (response.code === 200) {
      const maxAge =
        new Date(response.data.expiresIn).getTime() - new Date().getTime();
      document.cookie = `token=${response.data.token}; path=/; max-age=${
        maxAge / 1000
      }`;
      setAuthenticationStatus(true);
      redirect("/");
    } else if (response.code === 404) {
      setAlertMessage(response.message);
    } else {
      setErrors(response.errors);
    }
  };

  const resetEverything = () => {
    setAlertMessage("");
    setErrors({});
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
        <form id="loginForm" className="space-y-4" onSubmit={signInHandler}>
          <FormControl
            label="Email"
            error={alertMessage || errors?.general || errors.email}
          >
            <FormInput
              onChange={() => resetEverything()}
              type="email"
              required
              name="email"
              isInvalid={!!(alertMessage || errors?.general || errors.email)}
            />
          </FormControl>
          <FormControl label="Password" error={errors.password}>
            <FormInput
              onChange={() => resetEverything()}
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
