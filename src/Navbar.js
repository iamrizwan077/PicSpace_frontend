import React, { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "./AuthContext";

const Navbar = () => {

  let handleMenu = () => {
    let menu = document.querySelector("#menu")
    menu.classList.toggle('hidden')
    console.log(menu.classList)
  } 


  let {auth, logoutUser} = useContext(AuthContext)
  return (
    <>
      <nav className="md:flex  bg-[#e06377] items-center justify-between lg:py-1 lg:pl-4">
        
        <div className="text-2xl font-semibold flex justify-between  py-2.5 px-4 rounded-md text-2xl bg-[#c83349] md:bg-[#e06377] "><Link to="/">
          MEMOS
        </Link>
        <i className="fa-solid fa-bars flex md:hidden items-center" onClick={handleMenu}></i></div>
        
        <ul className="flex flex-col transition-1000 rounded-md hidden md:block transition-all" id = "menu" >
          <li className="flex font-bold flex-col md:flex-row divide-y divide-gray-600 md:divide-y-0 rounded-md">
          {auth &&  <>
            <Link to="/home" className="">
              <div className="px-6  rounded-md  py-3  hover:bg-[#c83349] ">
                Home
              </div>
            </Link>
            <Link to="/gallery">
              <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                Gallery
              </div>
            </Link>

            <Link to="/profile">
              <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                Profile
              </div>
            </Link>
            </>
            }
            {auth ?
            <Link to="/" onClick={logoutUser}>
              <div className="px-6 py-3  rounded-md hover:bg-[#c83349]">
                Logout
              </div>
            </Link>
            :
            <Link to="/accounts/login">
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
{
  /*}
const NavLink = styled(Link)`
  padding: 20px;
  color: black;
  text-decoration: none;
  &:hover {
    color: blue;
  }
`;
*/
}

export default Navbar;
