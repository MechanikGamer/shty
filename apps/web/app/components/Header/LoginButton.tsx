"use client";
import React from "react";
import Link from "next/link";
import colors from "../../lib/colors";
import { useTranslations } from "next-intl";

const LoginButton = () => {
  const t = useTranslations("homepage");

  const handleLoginClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "login_button_click", {
        event_category: "engagement",
        event_label: "Login Button",
        value: 1,
      });
    }
  };

  return (
    <Link
      href="/login"
      className="hover:bg-[#368F9A] rounded-full"
      aria-label={t("login")}
    >
      <button
        onClick={handleLoginClick}
        style={{
          borderColor: colors.buttonBorder,
          borderWidth: 1,
        }}
        className="flex items-center justify-center rounded-full px-2 sm:px-8 py-3 lg:px-12 lg:py-4 border border-solid text-white text-[18px] font-semibold font-['Inter'] leading-[18px] transition-transform duration-300 transform hover:scale-105 hover:bg-[#368F9A]"
        aria-label={t("login")}
      >
        {t("login")}
      </button>
    </Link>
  );
};

export default LoginButton;
