import React from "react";
import Hero from "./Hero";
import HeroImages from "./HeroImages";
import Features from "./Features";

//Landing component
const Landing = () => {
  return (
    <div>
      <Hero className="w-full h-1/2" slides={HeroImages}></Hero>
      <Features />
    </div>
  );
};

export default Landing;
