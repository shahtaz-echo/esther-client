import React from "react";

const SubmitButton = ({
  children,
  type = "button",
  isLoading,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-white/80 rounded-full text-sm text-black/80 font-medium py-2 center ${className} ${
        !disabled ? "hover:bg-white tr cursor-pointer" : ""
      }`}
      {...props}
    >
      {isLoading ? <span className="spinner"></span> : children}
    </button>
  );
};

export default SubmitButton;
