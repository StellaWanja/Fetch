import React from "react";

const Button = ({ btnStyle, children }) => {
  const buttonClass = btnStyle === "outline" ? "btn-outline" : "btn-filled";

  return <button className={buttonClass}>{children}</button>;
};

export default Button;
