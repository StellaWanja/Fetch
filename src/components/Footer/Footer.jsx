import Logo from "../Navbar/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      id="contact"
      className="w-full bg-green py-10 c-space flex flex-col sm:flex-row gap-4 justify-around"
    >
      <div className="text-lightgreen flex flex-col justify-between">
        <Logo />
        <p>Fetch, {new Date().getFullYear()}. All rights reserved.</p>
      </div>
      <div className="text-lightgreen flex flex-col gap-2">
        <h3 className="font-semibold">Fetch</h3>
        <Link to={""}>About</Link>
        <Link to={""}>Blog</Link>
        <Link to={""}>Help Center</Link>
        <Link to={""}>Careers</Link>
      </div>
      <div className="text-lightgreen flex flex-col gap-2">
        <h3 className="font-semibold">Policies</h3>
        <Link to={""}>Terms of Service</Link>
        <Link to={""}>Privacy Policy</Link>
        <Link to={""}>Cookies</Link>
      </div>
    </div>
  );
};

export default Footer;
