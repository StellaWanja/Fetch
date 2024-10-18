import React from "react";
import { navLinks } from "../../constants";

const NavbarLinks = () => {
  return (
    <ul className="flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20">
      {navLinks.map(({ id, title, href }) => (
        <li
          key={id}
          className="text-lightgreen hover:text-white font-generalsans max-sm:w-full py-2 max-sm:px-5 transition-colors ease-in delay-150"
        >
          <a href={href} className="text-lg sm:text-base ">
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
