"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Header() {
  const session = useSession();
  // console.log('session', session);
  
  const { status } = session;
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <Link href={"/"} className="text-primary font-semibold text-2xl">
        LOGO
      </Link>
      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/donation"}>Donor</Link>
        <Link href={"/contact"}>Contact us</Link>
      </nav>
      <div className="flex items-center gap-4">
        {status === "authenticated" ? (
          <>
            <Link
              href={"/profile"}
              className=" rounded-full"
            >
              Hi! <br/>
              {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary text-white rounded-full px-8 py-2 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="px-8 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-primary text-white rounded-full px-8 py-2 font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
