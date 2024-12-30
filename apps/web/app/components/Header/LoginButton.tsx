import React from "react";
import colors from "../../lib/colors";

const LoginButton = () => {
  return (
    <div
      style={{
        background: colors.primaryButtonBackground,
        borderColor: colors.buttonBorder,
        borderWidth: 1,
      }}
      className="flex items-center justify-center rounded-full px-8 py-3 lg:px-12 lg:py-4 border border-solid"
    >
      <div className="text-white text-[18px] font-semibold font-['Inter'] leading-[18px]">
        Login
      </div>
    </div>
  );
};

export default LoginButton;
