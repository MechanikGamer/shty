"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const LinkInput = () => {
  const t = useTranslations("homepage");
  const [link, setLink] = useState("");
  const [selectedOption, setSelectedOption] = useState("shortLink");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Submitted Link: ${link}`);
    console.log(`Selected Option: ${selectedOption}`);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={() => handleOptionChange("shortLink")}
          className={`px-4 py-2 rounded-md border-2 flex items-center gap-2 transition-colors duration-200 ${
            selectedOption === "shortLink"
              ? "bg-[#144ee3] text-white border-[#144ee3]"
              : "bg-transparent text-[#c9ced6] border-[#c9ced6]"
          }`}
        >
          <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
          {t("shortLink")}
        </button>
        <button
          onClick={() => handleOptionChange("qrCode")}
          className={`px-4 py-2 rounded-md border-2 flex items-center gap-2 transition-colors duration-200 ${
            selectedOption === "qrCode"
              ? "bg-[#144ee3] text-white border-[#144ee3]"
              : "bg-transparent text-[#c9ced6] border-[#c9ced6]"
          }`}
        >
          <FontAwesomeIcon icon={faQrcode} className="w-4 h-4" />
          {t("qrCode")}
        </button>
      </div>

      <div className="h-[60px] pl-[15px] pr-[4px] py-[21px] bg-[#181e29] rounded-[48px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] border-4 border-[#144ee3]/10 flex items-center justify-between w-full max-w-md">
        <div className="flex items-center gap-5 w-full">
          <div className="flex items-center justify-center w-6 h-6 text-[#c9ced6] text-xl">
            <FontAwesomeIcon icon={faLink} />
          </div>
          <h3 className="flex items-center gap-[5px] w-full">
            <input
              type="text"
              placeholder={t("enterTheLink")}
              value={link}
              onChange={handleInputChange}
              className="text-[#c9ced6] text-base font-light font-['Inter'] leading-7 bg-transparent border-none outline-none placeholder-[#c9ced6] w-full"
            />
          </h3>
        </div>
        <button
          onClick={handleSubmit}
          className="w-[60px] h-[50px] bg-[#144ee3] hover:bg-[#1a5af5] rounded-full shadow-[10px_9px_22px_0px_rgba(20,78,227,0.38)] border border-[#144ee3] flex items-center justify-center ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-white"
          >
            <path d="M13.828 12l-4.95-4.95a1 1 0 10-1.415 1.414L11.586 12l-4.121 4.121a1 1 0 001.414 1.415l4.95-4.95a1 1 0 000-1.414z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LinkInput;
