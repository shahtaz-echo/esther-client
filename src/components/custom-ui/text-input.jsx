import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const TextInput = ({
  type = "text",
  placeholder,
  icon: Icon,
  register,
  errors,
  name,
  patternValue,
  lengthValue,
  requiredMessage,
  errorMessage,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={inputType}
        {...register(name, {
          required: requiredMessage || name + " is required",
          pattern: {
            value: patternValue,
            message: errorMessage || "Invalid " + name + " format",
          },
          minLength: {
            value: lengthValue,
            message: errorMessage,
          },
        })}
        className={`py-2 pr-10 rounded-full bg-white/5 w-full outline-none ${
          errors[name] ? "border border-red-500" : ""
        } ${Icon ? "pl-10" : "pl-4"}`}
      />
      {Icon && <Icon className="absolute h-4 w-4 top-[13px] left-4" />}
      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-[10px] h-5 w-5 flex items-center justify-center text-white/75"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      )}
      {errors[name] && (
        <p className="text-xs text-red-500 mt-2 ml-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextInput;
