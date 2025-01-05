import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface InputComponentProps {
  label?: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void; // Added onBlur for validation
  icon?: IconDefinition;
  error?: string;
  isError?: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  icon,
  error,
  isError = false,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full font-['Inter']">
      {/* Label */}
      {label && (
        <label className="text-lg lg:text-xl font-semibold font-['Inter'] text-[#c9ced6] mb-2 md:mt-6">
          {label}
        </label>
      )}
      {/* Input Field */}
      <div
        className={`h-[60px] px-[15px] py-[10px] rounded-[48px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] flex items-center w-full ${
          isError
            ? "border-4 border-red-500 bg-[#291a1a]"
            : "border-4 border-[#144ee3]/10 bg-[#181e29]"
        }`}
      >
        {icon && (
          <div className="flex items-center justify-center w-6 h-6 text-[#c9ced6] text-xl">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur} // Added onBlur for validation
          className="text-[#c9ced6] text-base font-light font-['Inter'] leading-7 bg-transparent border-none outline-none placeholder-[#c9ced6] w-full ml-3"
        />
      </div>
      {/* Error Message */}
      {isError && error && (
        <span className="text-red-500 text-sm md:text-base lg:text-lg mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputComponent;
