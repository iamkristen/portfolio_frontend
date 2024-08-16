// IconButton.js
import React from "react";

const IconButton = ({ Icon, label, isActive, onClick }) => (
  <span
    onClick={onClick}
    className={`${
      isActive
        ? "text-designColor"
        : "w-full h-6 text-textColor text-xl flex items-center justify-center hover:text-designColor duration-300 cursor-pointer relative group"
    }`}
  >
    <Icon />
    <span className="text-black font-medium text-xs uppercase bg-designColor px-4 py-[1px] rounded-xl absolute left-0 translate-x-8 group-hover:translate-x-12 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
      {label}
    </span>
  </span>
);

export default IconButton;
