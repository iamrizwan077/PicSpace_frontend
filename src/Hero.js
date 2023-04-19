import React, { useContext, useState } from "react";
import HeroImages from "./HeroImages";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";


//Hero Carousel Component
const Hero = ({ slides }) => {

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current < 1 ? length - 1 : current - 1);
  };

  let { auth } = useContext(AuthContext)
  return (
    <>
      <div className="w-full ">
        {HeroImages.map((slide, index) => {
          return (
            <div
              className={
                index === current
                  ? "opacity-100 transition duration-1000"
                  : "opacity-0 transition duration-1000 ease-in-out"
              }
              key={index}
            >
              {index === current && (
                <div className="flex justify-center items-center mt-12">
                  <img className="h-screen w-full opacity-70" alt="" src={slide.image} />
                  <span onClick={prevSlide} className="absolute inset-y-1/2 cursor-pointer items-center px-3 flex left-1 justify-start py-5 m-2 hover:bg-[#e06377] bg-transparent text-xl rounded-full font-bold text-black ">
                    &lt;
                  </span>
                  <div className="absolute sm:top-1/3 text-5xl flex text-center mx-40 sm:text-6xl font-semibold sm:font-bold">
                    {slide.title}
                  </div>
                  <div className="absolute  md:top-2/4 mx-28 lg:pt-8 md:pt-16 flex text-center hidden md:block text-lg font-semibold">
                    {slide.desc}
                  </div>
                  <span onClick={nextSlide}
                    className="absolute flex cursor-pointer inset-y-1/2 py-5 right-1 items-center justify-end   text-xl font-bold text-black  rounded-full px-3 m-2 hover:bg-[#e06377] bg-transparent">
                    &gt;
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <div className="absolute  top-2/3 flex left-1/3 right-1/3  sm:pt-12 md:pt-26 pt-32  text-center justify-center  text-base font-semibold">
          {auth || <Link to="/accounts/signup">
            <button className=" animate-bounce sm:px-6 px-4  mx-1   rounded-md  py-3  hover:bg-[#c83349] bg-[#e06377]">
              Sign Up
            </button>
          </Link>}
        </div>
      </div>

    </>
  );
};

export default Hero;
