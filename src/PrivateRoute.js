import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import AuthContext from "./AuthContext"; 
import Login from "./Login";
import SignUp from "./SignUp";
import Landing from "./Landing";

const PrivateRoute = () => {
    const { auth } = useContext(AuthContext);
    
    return (
        <Routes>
            {auth ? (
                <Route element={<Landing />} path="accounts/signup" />
            ) : (
                <Route element={<SignUp />} path="accounts/signup" />
            )}
            {auth ? (
                <Route element={<Landing />} path="accounts/login" />
            ) : (
                <Route element={<Login />} path="accounts/login" />
            )}
        </Routes>
    );
};

export default PrivateRoute;