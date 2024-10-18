import React from "react";
// file imports
import Button from "../Button/Button";
import HeroImg from "../../assets/hero-img.jpg";

// hero section
const Hero = () => {
  return (
    <section className="min-h-screen bg-green w-full flex flex-col sm:flex-row justify-center items-center gap-5 -z-10 c-space">
      <div className="w-full mx-auto flex flex-col items-start px-5 gap-4">
        <h2 className="text-lightgreen text-4xl sm:text-7xl">
          Take your music everywhere
        </h2>
        <p className="text-lightgreen text-lg sm:text-xl">
          Discover your entire music library, select albums with ease, dive into
          full album details instantly.
        </p>
        <Button btnStyle="filled">Get Started</Button>
      </div>

      <div className="w-full mx-auto overflow-hidden flex justify-center relative">
        <span className="absolute top-10 right-0 lg:top-1/3 lg:right-40 bg-pink rounded-full px-5 py-2">
          <strong>100+</strong> albums available.
        </span>
        <img
          src={HeroImg}
          alt="Hero Image"
          className="hidden w-1/2 md:block object-cover rounded-t-full"
        />
        <span className="absolute bottom-10 right-0 lg:bottom-10 lg:right-40 bg-pink rounded-full px-5 py-2">
         Fetch is simply the best. <strong>- Anonymous</strong>
        </span>
      </div>
    </section>
  );
};

export default Hero;
