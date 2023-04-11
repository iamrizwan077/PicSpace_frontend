import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import { FacebookProvider, LoginButton } from "react-facebook";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from "react-toastify";

//Sign Up component
const SignUp = () => {

  let { signupUser } = useContext(AuthContext)

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

  return (
    <div className="flex py-8">
      <div className=" flex flex-col bg-white  shadow-2xl rounded-3xl  border px-2 md:px-12 justify-center mx-auto">
        <div className="font-semibold text-3xl px-2 py-6 ">Sign Up</div>

        {/* Input form */}
        <form onSubmit={signupUser} className="flex flex-col mx-auto">
          <input
            className="px-2 mb-1 py-2 border border-gray-400 rounded"
            type="email"
            placeholder="Enter email"
            name="email"
          />
          <input
            className="px-2 mb-1 py-2 border border-gray-400 rounded"
            type="password"
            placeholder="Enter password"
            name="password1"
          />
          <input
            className="px-2 mb-1 py-2 border border-gray-400 rounded"
            type="password"
            placeholder="Retype password"
            name="password2"
          />
          <div>
            <input type="checkbox" className="" name="tc" value="tc" />
            <label className="text-sm pl-2" for="tc">
              I accept the terms and conditions
            </label>
          </div>
          <div className="flex">
            <button
              className="bg-red-400 mt-1 text-center w-fit px-6 py-2 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="or text-base my-4">or</div>

        {/* Google Sign In button */}
        <GoogleOAuthProvider clientId={`${googleClientId}`}>
          <GoogleLogin className="mb-2 font-semibold mt-3 px-2  py-12 border rounded-full justify-center border-gray-400 flex items-center"
            onSuccess={(credentialResponse) => {
              responseGoogle(credentialResponse)
            }}
            onError={() => {
              toast("Login failed!")
            }}
            theme="outline"
            size="large"
            shape="pill"
            width="280"
            logo_alignment="center"
            type="standard"
            text="signup_with"
          />
        </GoogleOAuthProvider>

        {/* Facebook Sign In button */}
        <FacebookProvider appId={`${facebookAppId}`}>

          <LoginButton
            className="mb-2 text-gray-800 text-sm mt-3 px-2  py-1.5 border rounded-full justify-center border-gray-300 flex items-center"
            scope="email"
            onSuccess={(credentialResponse) => {
              responseFacebook(credentialResponse)
            }}
            onError={() => {
              toast("Login failed!")
            }}
          ><i className="fa-brands fa-facebook-f text-blue-600 text-xl mr-4"></i>
            Sign Up with Facebook
          </LoginButton>
        </FacebookProvider>

        <div className="text-xs flex justify-center pb-6">
          <span>Already registered?</span>
          <Link className="text-blue-700 pl-2" to="/accounts/login">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
