import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
//  file imports
import NavbarLinks from "./NavbarLinks";
import Button from "../Button/Button";
import Logo from "./Logo";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  // state to handle when menu is open or not
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // toggle menu
  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const logOutHandler = async () => {
    await logout();
  };

  return (
    <>
      {/* navbar for larger screen sizes */}
      {!isOpen && (
        <nav className="bg-green flex justify-between items-center py-8 sm:py-4 c-space">
          <Logo variant="lightgreen" />
          <div className="sm:flex hidden gap-12">
            <NavbarLinks />
          </div>
          <div className="sm:flex hidden gap-4">
            {/* set buttons based on login status */}
            {!user && (
              <Link to={"/auth/login"}>
                <Button variant="outline" btnStyle="lightgreen">
                  Sign in
                </Button>
              </Link>
            )}
            {user && (
              <Link to={"/auth/login"}>
                <Button
                  variant="outline"
                  btnStyle="lightgreen"
                  onClick={logOutHandler}
                >
                  Sign Out
                </Button>
              </Link>
            )}
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
