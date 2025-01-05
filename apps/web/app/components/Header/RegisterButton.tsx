"use client";
import React from "react";
import Link from "next/link";
import colors from "../../lib/colors";
import { useTranslations } from "next-intl";

const RegisterButton = () => {
  const t = useTranslations("homepage");

  const handleRegisterClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "register_button_click", {
        event_category: "engagement",
        event_label: "Register Button",
        value: 1,
      });
    }
  };

  return (
    <Link
      href="/register"
      aria-label={t("createAccount")}
      className="hover:bg-[#1A73E8] rounded-full"
    >
      <button
        onClick={handleRegisterClick}
        style={{
          background: colors.primaryButtonBackground,
          borderColor: colors.buttonBorder,
          borderWidth: 1,
        }}
        className="flex items-center justify-center rounded-full px-8 py-3 lg:px-12 lg:py-4 border border-solid text-white text-[18px] font-semibold font-['Inter'] leading-[18px] transition-transform duration-300 transform hover:scale-105 hover:bg-[#1A73E8]"
      >
        {t("createAccount")}
      </button>
    </Link>
  );
};

export default RegisterButton;
