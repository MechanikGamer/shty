"use client";

import React from "react";
import LoginButton from "./LoginButton";
import { Logo } from "./Logo";
import Link from "next/link";
import RegisterButton from "./RegisterButton";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-6 py-6 md:px-14 md:py-14">
      <div className="flex items-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        {pathname !== "/login" && <LoginButton />}
        {pathname !== "/register" && (
          <div className="hidden sm:block">
            <RegisterButton />
          </div>
        )}
      </div>
    </div>
  );
};
