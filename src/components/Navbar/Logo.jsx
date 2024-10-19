import { FaRegCirclePlay } from "react-icons/fa6";

// navbar logo
const Logo = ({ variant }) => {
  // logo colors based on page
  const baseStyles =
    "flex items-center gap-[1ch] transition-colors ease-in delay-150";
  const lightgreenStyles = "text-lightgreen hover:text-white";
  const greenStyles = "text-green hover:text-green";

  return (
    <a
      href="/"
      aria-label="Logo"
      className={
        variant === "lightgreen"
          ? `${baseStyles} ${lightgreenStyles}`
          : `${baseStyles} ${greenStyles}`
      }
    >
      <FaRegCirclePlay />
      <span className="font-semibold">Fetch</span>
    </a>
  );
};

export default Logo;
