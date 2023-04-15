import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";


//Password Reset Confirm component
const PasswordResetConfirm = () => {

  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
//  const [errors, setErrors] = useState({});

  const navigate = useNavigate()
  const { uid, token } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `https://iamrizwan066.pythonanywhere.com/dj-rest-auth/password/reset/confirm/${uid}/${token}/`,
      data: {
        'new_password1': newPassword1,
        'new_password2': newPassword2,
        'uid': uid,
        'token': token
      }
    }).then((res) => {
      if (res.data.detail) {
        toast(`${res.data.detail}`)
        navigate('/accounts/login/')
      }
      // Redirect to login page or wherever you want
    })
      .catch((err) => {
        if (err.response.data.token) {
          toast(`Your confirmation link has been expired. Please go back and submit your email again.`)
        }
      });
  };

  return (
    <div className="flex py-14 min-h-screen justify-center items-center">
      <div className=" flex flex-col bg-white  shadow-2xl rounded-3xl  border px-2 md:px-12 justify-center mx-auto">
        <div className="font-semibold text-3xl pb-8 pt-12 px-2 py-6 ">Reset Password</div>
        <form onSubmit={handleSubmit} className="flex  flex-col gap-y-2">
          <input
            className="p-2 mb-2 border border-gray-400 rounded"
            type="password"
            onChange={(e) => setNewPassword1(e.target.value)}
            placeholder="New Password"
          />
          {/* {errors.new_password1 && (
            <div className="error">{errors.new_password1[0]}</div>
          )} */}

          <input
            className="p-2 mb-2 border border-gray-400 rounded"
            type="password"
            onChange={(e) => setNewPassword2(e.target.value)}
            placeholder="Confirm New Password"
          />
          {/* {errors.new_password2 && (
            <div className="error">{errors.new_password2[0]}</div>
          )} */}

          <button className="bg-red-400  text-center w-fit px-6 py-2 mb-16 rounded " type="submit">Reset Password</button>

        </form>

      </div>
    </div>

  );
};

export default PasswordResetConfirm;
