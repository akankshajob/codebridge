import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
