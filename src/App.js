import Navbar from "./Navbar";
import React from 'react';
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Gallery";
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Home from "./Home";
import { AuthProvider } from "./AuthContext";
import PasswordResetConfirm from "./PasswordResetConfirm";
import PasswordChange from "./PasswordChange";
import PasswordReset from "./PasswordReset";
import { ToastContainer } from 'react-toastify';
import EmailConfirmation from "./EmailConfirmation";
import VerifyEmail from "./VerifyEmail";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route element={<Landing />} path="/" exact />
          <Route element={<Home />} path="home" />
          <Route element={<Gallery />} path="gallery" />
          <Route element={<Profile />} path="profile" />
          <Route element={<PasswordChange />} path="change-password" />
          <Route element={<PasswordResetConfirm />} exact path="/reset-password-confirm/:uid/:token/" />
          <Route element={<PasswordReset />} path="reset-password" />
          <Route element={<SignUp />} path="accounts/signup" />
          <Route element={<Login />} path="accounts/login" />
          <Route element={<VerifyEmail />} path="verify-email" />
          <Route element={<EmailConfirmation />} path="account-confirm-email/:key" />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

