import React from "react";

const Button = ({ variant, children, btnStyle, onClick, disabled }) => {
  // styles for the buttons
  const baseStyles =
    "font-semibold rounded-full px-6 py-2 transition-colors ease-in delay-150";
  const lightgreenOutlineStyles =
    "bg-transparent text-lightgreen border-lightgreen border-2 hover:bg-lightgreen hover:text-green";
  const lightgreenFilledStyles =
    "bg-lightgreen text-green border-lightgreen border-2 hover:text-lightgreen hover:border-lightgreen  hover:bg-transparent";
  const greenOutlineStyles =
    "bg-transparent text-green border-green border-2 hover:bg-green hover:text-white";
  const greenFilledStyles =
    "bg-green text-white border-green border-2 hover:text-green hover:border-green hover:bg-transparent";

  const lightgreenClass =
    variant === "outline"
      ? `${baseStyles} ${lightgreenOutlineStyles}`
      : `${baseStyles} ${lightgreenFilledStyles}`;
  const greenClass =
    variant === "outline"
      ? `${baseStyles} ${greenOutlineStyles}`
      : `${baseStyles} ${greenFilledStyles}`;

  return (
    <button
      className={btnStyle === "lightgreen" ? lightgreenClass : greenClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
