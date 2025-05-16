"use client";
import { Button, FormControl, FormInput } from "@/components";
import Link from "next/link";

import { AppDispatch } from "@/store";
import { setAuth } from "@/store/common/reducer";
import { FormErrors } from "@/types";
import { httpClient } from "@/utils";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<FormErrors>({});
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    document.title = "SignIn | Food Blog";
  }, []);

  const onSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response: Record<string, any> = await httpClient({
      apiUrl: `/register`,
      method: "POST",
      data: {
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
      },
    });
    if (response.ok) {
      // const maxAge = new Date(response.data.expiresIn).getTime() - new Date().getTime();
      // document.cookie = `token=${response.data.token}; path=/; max-age=${maxAge / 1000}`;
      // dispatch(setAuth({ payload: true }));
      // redirect("/");
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
        <form id="signupForm" onSubmit={onSignup}>
          <FormControl label="Name">
            <FormInput
              onChange={() => resetEverything()}
              isInvalid={!!(alertMessage || errors?.general || errors.name)}
              errMessage={alertMessage || errors?.general || errors.name}
              type="text"
              required
              name="name"
            />
          </FormControl>
          <FormControl label="Username">
            <FormInput
              onChange={() => resetEverything()}
              isInvalid={!!(alertMessage || errors?.general || errors.username)}
              errMessage={alertMessage || errors?.general || errors.username}
              type="text"
              required
              name="username"
            />
          </FormControl>
          <FormControl label="Email Address">
            <FormInput
              onChange={() => resetEverything()}
              isInvalid={!!(alertMessage || errors?.general || errors.email)}
              errMessage={alertMessage || errors?.general || errors.email}
              type="email"
              required
              name="email"
            />
          </FormControl>
          <FormControl label="Password">
            <FormInput
              onChange={() => resetEverything()}
              isInvalid={!!(alertMessage || errors?.general || errors.password)}
              errMessage={alertMessage || errors?.general || errors.password}
              type="password"
              required
              name="password"
            />
          </FormControl>
          <FormControl label="Confirm Password">
            <FormInput
              onChange={() => resetEverything()}
              isInvalid={!!(alertMessage || errors?.general || errors.confirm_password)}
              errMessage={alertMessage || errors?.general || errors.confirm_password}
              type="password"
              required
              name="confirm_password"
            />
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
