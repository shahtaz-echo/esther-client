import React from "react";

const Checkbox = ({ label, className, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="hidden peer" {...props} />
      <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all">
        {props.checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      {label && <span className="opacity-80 select-none">{label}</span>}
    </label>
  );
};

export default Checkbox;
