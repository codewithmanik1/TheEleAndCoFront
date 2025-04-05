import React from "react";

const CommonHoverButton = ({ label, onClick, className, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden border border-black bg-black text-white shadow-2xl transition-all
      before:absolute before:left-0 before:top-0 before:h-0 before:w-full before:bg-white before:duration-500
      after:absolute after:bottom-0 after:right-0 after:h-0 after:w-full after:bg-white after:duration-500
      hover:text-black hover:before:h-full hover:after:h-full ${className}`}
    >
      <span className="relative z-10 whitespace-nowrap">{label}</span>
    </button>
  );
};

export default CommonHoverButton;