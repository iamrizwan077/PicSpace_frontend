import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "./AuthContext";

const Login = () => {
  let {loginUser, error} = useContext(AuthContext)
  return (
    <div className="flex py-8">
      <div className=" flex flex-col my-8 bg-white  shadow-2xl rounded-3xl  border px-12 justify-center mx-auto">
        <div className="font-semibold text-3xl py-6 ">Sign In</div>
        {error && <div className="text-sm bg-red-300 text-red-700 px-2 py-1 mb-2">{error.detail}</div>}
        <form onSubmit={loginUser} className="flex flex-col">
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
          <Link to="/" className="mb-3 text-sm">
            Forgot password?
          </Link>

          <button
            className="bg-red-400 text-center w-fit px-6 py-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="or text-base my-4">or</div>
        <a className="mb-2 px-2  py-2 border rounded-full justify-center border-gray-400 flex items-center">
          <i className="fa-brands fa-google text-xl mr-4"></i>
          <span>Sign In with Google</span>
        </a>

        <a className="px-2  mb-4 py-2 border rounded-full justify-center border-gray-400 flex items-center">
          <i className="fa-brands fa-facebook-f text-xl mr-4"></i>
          <span>Sign In with Facebook</span>
        </a>

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
