"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = `Food App`;
  }, []);
  return (
    <div className="flex justify-center items-center h-dvh flex-col bg-center bg-cover bg-[url(https://cdn.wallpapersafari.com/22/18/riY3Ba.jpg)]">
      <header className="rounded-b-2xl p-4 ">
        <p className="text-gray-800 text-xl">Write . Publish . Share</p>
        <h3 className="text-amber-500 text-6xl font-semibold  ">Food Blog</h3>
      </header>
      <div>
        <ul className="flex gap-3">
          <li>
            <Link
              className="bg-white p-2 rounded-sm hover:bg-zinc-100 transition-all"
              href={"/blog"}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className="bg-white p-2 rounded-sm hover:bg-zinc-100 transition-all"
              href={"/"}
            >
              Terms Of Use
            </Link>
          </li>
          <li>
            <Link
              className="bg-white p-2 rounded-sm hover:bg-zinc-100 transition-all"
              href={"/"}
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
