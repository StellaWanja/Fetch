import { FaRegCirclePlay } from "react-icons/fa6";

const Logo = () => {
  return (
    <a
      href="/"
      aria-label="Logo"
      className="flex items-center gap-[1ch] text-lightgreen hover:text-white transition-colors ease-in delay-150"
    >
      <FaRegCirclePlay />
      <span className="font-semibold">Fetch</span>
    </a>
  );
};

export default Logo;
