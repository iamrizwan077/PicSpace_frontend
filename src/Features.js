import React from "react";
import featureimg from "./images/featureimg.jpg";

const Features = () => {
  return (
    <div className=" bg-[#e06377]  pb-16" id="features">
      <div className="text-black text-6xl  py-8 font-semibold flex justify-center">
        Features
      </div>
      <div className="mx-8  inline-block px-4 flex flex-col md:flex-row justify-between">
        <div className=" md:w-1/2 justify-center w-full">
          <div className="wrapper inline-flex md:pt-16  text-white text-5xl font-semibold  ">
            <div className=" ">It's</div>
            <ul className="dynamic-txts text-black pl-4 ">
              <li className="">
                <span className="">Simple</span>
              </li>
              <li className="">
                <span className="">Cheap</span>
              </li>
              <li className="">
                <span className="">Secure</span>
              </li>
            </ul>
          </div>

          <div className=" break-words  text-sm font-semibold flex">
            An easy-to-use and secure service that prioritizes best customer
            experience. Store your images and get the cloud storage at the
            cheapest prices, without negotiating on security
          </div>
        </div>

        <div className="md:pl-8  md:w-1/2 h-full w-full pt-4">
          <img
            className="  rounded-3xl border border-transparent"
            src={featureimg}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
