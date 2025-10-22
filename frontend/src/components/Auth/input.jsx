import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ id, label, placeholder, type = "text", icon, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className="block mb-2 text-md font-medium text-black"
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <div className="relative flex items-center">
        {/* Left Icon */}
        <span className="absolute left-0 inline-flex items-center px-3 text-sm text-black bg-gray-200 border rounded-s-md border-gray-300 h-full">
          {icon}
        </span>

        {/* Input Field */}
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-md block w-full ps-12 pr-12 p-2.5 
                     focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
          {...rest}
        />

        {/* Password Toggle Button */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-md 
                       text-gray-500 hover:text-teal-500 
                       focus:ring-2 focus:ring-teal-300 transition-all cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>

      {/* Password Requirement Note */}
      {isPasswordField && (
        <p className="mt-2 text-xs text-gray-500">
          Password must be 6 characters and contain at least 2 numbers.
        </p>
      )}
    </div>
  );
};

export default Input;
