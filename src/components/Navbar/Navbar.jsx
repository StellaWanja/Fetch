import { useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
//  file imports
import NavbarLinks from "./NavbarLinks";
import Button from "../Button/Button";
import Logo from "./Logo";

const Navbar = () => {
  // state to handle when menu is open or not
  const [isOpen, setIsOpen] = useState(false);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      {/* navbar for larger screen sizes */}
      {!isOpen && (
        <nav className="bg-green flex justify-between items-center py-8 sm:py-4 px-10">
          <Logo />
          <div className="sm:flex hidden gap-12">
            <NavbarLinks />
          </div>
          <div className="sm:flex hidden gap-4">
            <Button btnStyle="outline">Login</Button>
            <Button btnStyle="filled">Sign up</Button>
          </div>
          {/* button to toggle menu on small screens */}
          <button
            onClick={toggleMenu}
            className="text-xl transition ease-in-out delay-150 focus:outline-none sm:hidden flex text-lightgreen hover:text-white"
            aria-label="Toggle Menu"
          >
            <HiOutlineMenu />
          </button>
        </nav>
      )}

      {/* sidebar/ menu for smaller screen sizes */}
      {isOpen && (
        <nav className="bg-green fixed left-0 top-0 w-full h-screen bg- p-10 z-50">
          <div className="flex h-full flex-col">
            <div className="flex justify-between">
              <Logo />
              {/* button to toggle menu on small screens */}
              <button
                className="text-xl transition ease-in-out delay-150 focus:outline-none text-lightgreen hover:text-white"
                onClick={toggleMenu}
              >
                <FaRegCircleXmark />
              </button>
            </div>

            <div className="flex flex-col h-full justify-center  items-center gap-4">
              <div className="overflow-hidden">
                <NavbarLinks />
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
