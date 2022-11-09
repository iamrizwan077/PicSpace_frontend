import React, { useState } from "react";
import Hero from "./Hero";
import Img from "./Img";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import HeroImages from "./HeroImages";
import Features from "./Features";
const Landing = () => {
  return (
    <div>
      <Hero className="w-full h-1/2" slides={HeroImages}></Hero>
      <Features />
    </div>
  );
};

export default Landing;
