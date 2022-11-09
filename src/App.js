import "./styles.css";
import Navbar from "./Navbar";
import React  from 'react';
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Gallery";
import Landing from "./Landing";
import Login from "./Login";
import Logout from "./Logout";

import SignUp from "./SignUp";
import Profile from "./Profile";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
export default function App() {
  const isAuth = false
  return (
    <BrowserRouter>
      <AuthProvider>

      <Navbar />
      <Routes>
        <Route element={<Landing />} path="/" exact/>
        
        <Route element={<Home />} path="home" />
        
        <Route element={<Gallery />} path="gallery" />
        
        
        <Route element={<Profile />} path="profile" />
        
        
        
        <Route element={<SignUp />} path="accounts/signup" />
      {/*}  <Route element={<Logout />} path="accounts/logout" />{*/}
        <Route element={<Login />} path="accounts/login" />
      </Routes>

      <Footer />
      </AuthProvider>

    </BrowserRouter>


  );
}
  {/*}  <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavFoot />}>
          <Route index element={<Landing />} />
          <Route path="home" element={<Home />} />
          <PrivateRoute element={<NavFoot />}/>
          <Route path="gallery" element={<Gallery />} />
          <Route path="accounts/login" element={<Login />} />
          <Route path="accounts/signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  {*/}

  




















