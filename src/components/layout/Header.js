"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const session = useSession();
  const { status } = session;
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(true);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
      <Link
        href={"/"}
        className="text-primary font-semibold text-2xl dark:text-white"
      >
        LOGO
      </Link>
      <nav className="hidden md:flex gap-4 items-center text-gray-500 font-semibold dark:text-gray-300">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/donation"}>Donor</Link>
        <Link href={"/contact"}>Contact us</Link>
        <div className="flex space-x-4 items-center text-black dark:text-white">
          <ModeToggle />
        </div>
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <Link href={"/profile"} className="rounded-full dark:text-white">
                Hi! <br />
                {userName}
              </Link>
              <Button
                onClick={() => signOut()}
                className="bg-primary rounded-full px-8 py-2 font-semibold"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className="px-8 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold dark:border-gray-600 dark:text-gray-300"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="bg-primary text-white dark:text-gray-700  rounded-full px-8 py-2 font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="md:hidden">
        {isSmallScreen && (
          <Sheet>
            <SheetTrigger>
              <button className="text-primary">☰</button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <div className="flex justify-between items-center mt-4">
                  <SheetTitle className="font-bold my-6 italic">
                    LOGO
                  </SheetTitle>
                  <div>
                    <ModeToggle />
                  </div>
                </div>
                <SheetDescription>
                  <div className="flex items-center gap-4">
                    {status === "authenticated" ? (
                      <>
                        <Link
                          href={"/profile"}
                          className="rounded-full dark:text-white"
                        >
                          Hi! <br />
                          {userName}
                        </Link>
                        <Button
                          onClick={() => signOut()}
                          className="bg-primary rounded-full px-8 py-2 font-semibold"
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={"/login"}
                          className="px-8 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold dark:border-gray-600 dark:text-gray-300"
                        >
                          Login
                        </Link>
                        <Link
                          href={"/register"}
                          className="bg-primary text-white dark:text-gray-700  rounded-full px-8 py-2 font-semibold"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 mt-4 items-start text-gray-500 font-semibold dark:text-gray-300">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"/donation"}>Donor</Link>
                    <Link href={"/contact"}>Contact us</Link>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
