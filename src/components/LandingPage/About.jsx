import Button from "../Button/Button";

const About = () => {
  return (
    <section className=" w-full -z-10 min-h-screen bg-white py-10 c-space ">
      <div className="pb-28">
        <h2 className="text-green text-4xl sm:text-7xl text-center pb-8">
          About Us
        </h2>
        <p className="text-green text-lg sm:text-xl text-center pb-8">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Congue quam
          faucibus dictum ultrices mi a fermentum per? Auctor sapien elementum
        </p>

        <p className="text-green text-lg sm:text-xl text-center pb-8">
          Cras quis mollis semper parturient natoque netus mauris
          condimentum.Augue et luctus ut magna, <br /> euismod nunc. Velit
          posuere consequat odio pretium sit erat enim magna lacus. Eget integer
          cras
          <br />
          interdum metus pretium euismod. Scelerisque iaculis magna nullam hac
          senectus class.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-green text-4xl sm:text-7xl pb-8">
          Join the community
        </h2>
        <p className="text-green text-lg sm:text-xl pb-8">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Congue quam{" "}
          <br /> faucibus dictum ultrices mi a fermentum per?
        </p>

        <Button variant="filled" btnStyle="green">
          Create account
        </Button>
      </div>
    </section>
  );
};

export default About;
