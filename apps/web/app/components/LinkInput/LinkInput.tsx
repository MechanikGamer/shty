"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons"; // Import required icons

const LinkInput = () => {
  const [link, setLink] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted Link:", link);
  };

  return (
    <div className="h-[60px] pl-[15px] pr-[4px] py-[21px] bg-[#181e29] rounded-[48px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] border-4 border-[#144ee3]/10 flex items-center justify-between">
      <div className="flex items-center gap-5 w-full">
        <div className="text-[#c9ced6] text-xl flex items-center justify-center">
          <FontAwesomeIcon icon={faLink} />
        </div>
        <div className="flex items-center gap-[5px] w-full">
          <input
            type="text"
            placeholder="Enter the link here"
            value={link}
            onChange={handleInputChange}
            className="text-[#c9ced6] text-base font-light font-['Inter'] leading-7 bg-transparent border-none outline-none placeholder-[#c9ced6] w-full"
          />
          <div className="justify-center items-center flex"></div>
        </div>
      </div>
      {/* Submit Button with Arrow Icon */}
      <button
        onClick={handleSubmit}
        className="w-[60px] h-[50px] bg-[#144ee3] rounded-full shadow-[10px_9px_22px_0px_rgba(20,78,227,0.38)] border border-[#144ee3] flex items-center justify-center ml-2"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-white text-base" />
      </button>
    </div>
  );
};

export default LinkInput;
