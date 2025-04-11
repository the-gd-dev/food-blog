"use client";
import { FoodBlogLogo } from "@/components";
import Link from "next/link";

const rightLinks = [
  { id: 1, label: "SignIn", link: "/auth/signin" },
  { id: 2, label: "SignUp", link: "/auth/signup" },
  { id: 3, label: "FAQs", link: "#" },
  { id: 4, label: "About", link: "#" },
  { id: 5, label: "Help", link: "#" },
];

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center min-h-dvh justify-between">
      <header className="py-4 flex flex-col md:flex-row px-4 gap-4  w-full xl:px-0 xl:w-2/3 justify-between items-center">
        <div id="logo">
          <FoodBlogLogo variant="desktop" />
        </div>
        <div id="links">
          <ul className="flex gap-2">
            {rightLinks.map((rl) => (
              <li key={`rl-${rl.id}`}>
                <Link
                  className="cursor-pointer h-full w-full text-xs md:text-sm rounded-3xl p-2 px-4 bg-amber-100 hover:text-white hover:bg-amber-500 transition-all"
                  href={rl.link}
                >
                  {rl.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center w-full xl:w-2/3 ">
        {children}
      </div>
      <footer className="h-25">
        <div className="flex flex-col text-center text-base gap-1  py-4">
          <p>Copyrights &copy; 2025</p>
          <div className="flex gap-2">
            <p>Developed by</p>
            <a
              target="_blank"
              className="text-amber-500 hover:underline text-center"
              href="http://github.com/the-gd-dev"
            >
              @the-gd-dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
