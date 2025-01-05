import React from "react";
import LinkInput from "./components/LinkInput/LinkInput";
import { useTranslations } from "next-intl";

export default function Web() {
  const t = useTranslations("homepage");

  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <h1
        className="text-transparent bg-clip-text text-[35px] font-extrabold font-['Inter'] leading-[41.48px] md:text-5xl lg:text-6xl"
        style={{
          backgroundImage: "linear-gradient(to right, #EB568E, #144EE3)",
        }}
      >
        {t("headline")}
      </h1>
      <h2 className="w-full mt-8 text-[#c9ced6] text-xl font-light font-['Inter'] leading-normal">
        {t("subheadline")}
      </h2>
      <div className="mt-8 px-0 w-full md:w-[600px] lg:w-[700px]">
        <LinkInput />
      </div>
    </div>
  );
}
