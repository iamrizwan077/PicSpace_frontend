import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";

//Navbar Component
const Navbar = () => {

  let handleMenu = () => {
    let menu = document.querySelector("#menu")
    menu.classList.toggle('hidden')
  }

  let { auth, logoutUser } = useContext(AuthContext)

  return (
    <>
      <nav className="md:flex absolute top-0 left-0 right-0 z-10 bg-[#e06377] items-center justify-between lg:py-1 lg:pl-4">

        <div className=" font-semibold flex justify-between  py-2.5 px-4 rounded-md text-2xl bg-[#c83349] md:bg-[#e06377] ">
          <Link to="/">
            PicSpace
          </Link>
          <i className="fa-solid fa-bars flex md:hidden items-center" onClick={handleMenu}></i></div>
        <ul className="flex flex-col transition-1000 rounded-md hidden md:block transition-all" id="menu" >
          <li className="flex font-bold flex-col md:flex-row divide-y divide-gray-600 md:divide-y-0 rounded-md">
            {auth && <>
              <Link to="/home" onClick={handleMenu}>
                <div className="px-6  rounded-md  py-3  hover:bg-[#c83349] ">
                  Home
                </div>
              </Link>
              <Link to="/gallery" onClick={handleMenu}>
                <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                  Gallery
                </div>
              </Link>

              <Link to="/profile" onClick={handleMenu}>
                <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                  Profile
                </div>
              </Link>
            </>
            }
            {auth ?
              <Link to="/" onClick={logoutUser} >
                <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                  Logout
                </div>
              </Link>
              :
              <Link to="/accounts/login" onClick={handleMenu}>
                <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                  Login
                </div>
              </Link>}
          </li>
        </ul>
      </nav>
      <Outlet />

    </>
  );
};

export default Navbar;
