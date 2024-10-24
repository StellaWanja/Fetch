import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const About = () => {
  return (
    <section id="about" className=" w-full -z-10 min-h-screen bg-white py-10 c-space ">
      <div className="pb-28">
        <h2 className="text-green text-4xl sm:text-7xl text-center pb-8">
          About Us
        </h2>
        <p className="text-green text-lg sm:text-xl pb-8  mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Cras quis mollis semper parturient
          natoque netus mauris condimentum.Augue et luctus ut magna, euismod
          nunc. Velit posuere consequat odio pretium sit erat enim magna lacus.
          Eget integer cras interdum metus pretium euismod. Scelerisque iaculis
          magna nullam hac senectus class.
        </p>
        <p className="text-green text-lg sm:text-xl pb-8  mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Cras quis mollis semper parturient
          natoque netus mauris condimentum.Augue et luctus ut magna, euismod
          nunc. Velit posuere consequat odio pretium sit erat enim magna lacus.
          Eget integer cras interdum metus pretium euismod. Scelerisque iaculis
          magna nullam hac senectus class.
        </p>

        <div className="w-full md:w-1/4 h-1/3 border-2 border-dashed border-green px-5 py-8 rounded-3xl mx-auto">
          <strong className="text-green text-2xl">80%</strong>
          <p className="text-green text-lg sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-green text-4xl sm:text-7xl pb-8">
          Join the community
        </h2>
        <p className="text-green text-lg sm:text-xl pb-8 w-full lg:w-1/3 mx-auto">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Congue quam
          faucibus dictum ultrices mi a fermentum per?
        </p>

        <Link to="/auth/login">
          <Button variant="filled" btnStyle="green">
            Get started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default About;
