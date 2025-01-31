import React from "react";

const AuthLayout = ({ children, title, text }) => {
  return (
    <div className="h-screen w-screen center">
      <div className="card max-w-lg w-full">
        <h2 className="h2">{title}</h2>
        <p className="mt-2">{text}</p>
        <div className="mt-10"> {children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
