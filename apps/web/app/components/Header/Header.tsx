import React from "react";
import LoginButton from "./LoginButton";
import { Logo } from "./Logo";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-6 md:px-14 md:py-14 ">
      <div className="flex items-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center">
        <LoginButton />
      </div>
    </div>
  );
};
