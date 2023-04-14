import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import AuthContext from "./AuthContext";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from "react-toastify";

//Login Component
const Login = () => {

  let { loginUser, responseGoogle, responseFacebook } = useContext(AuthContext)

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

  return (
    <div className="flex py-8 min-h-screen">
      <div className=" flex flex-col bg-white h-fit my-auto shadow-2xl rounded-3xl  border px-2 md:px-12 justify-center mx-auto">
        <div className="font-semibold text-3xl px-2 py-6 ">Sign In</div>
        {/* {error && <div className="text-sm bg-red-300 text-red-700 px-2 py-1 mb-2">{error.detail}</div>} */}

        {/* Input form */}
        <form onSubmit={loginUser} className="flex flex-col mx-auto">
          <input
            className="px-2 py-2 mb-1 border border-gray-400 rounded"
            type="email"
            placeholder="Enter email"
            name="email"
          />
          <input
            className="px-2 mb-1 py-2 border border-gray-400 rounded"
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <Link to="/reset-password" className="mb-3 text-xs text-blue-700 underline ">
            Forgot password?
          </Link>
          {/* Login button */}
          <button
            className="bg-red-400 text-center w-fit px-6 py-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="or text-base my-4">or</div>

        {/* Google Sign In button */}
        <GoogleOAuthProvider clientId={`${googleClientId}`}>
          <GoogleLogin className="mb-2 font-semibold mt-3 px-2  py-12 border rounded-full justify-center border-gray-400 flex items-center"
            onSuccess={(credentialResponse) => {
              responseGoogle(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed');
              toast("Login failed!")
            }}
            theme="outline"
            size="large"
            shape="pill"
            width="280"
            logo_alignment="center"
            type="standard"
            text="signin_with"
          />
        </GoogleOAuthProvider>

        {/* Facebook Sign In button */}
        <FacebookLogin
          appId={`${facebookAppId}`}
          autoLoad
          callback={res => responseFacebook(res)}
          cssClass="mb-2 w-full text-gray-800 text-sm mt-3 px-2 py-2 border rounded-full justify-center border-gray-300 flex items-center"
          icon={<i className="fa-brands fa-facebook-f text-blue-600 text-xl mr-4"></i>}
          textButton="Sign In with Facebook"
        />


        <div className="text-xs flex justify-center pb-6">
          <span>Not already registered?</span>
          <Link className="text-blue-700 pl-2" to="/accounts/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
