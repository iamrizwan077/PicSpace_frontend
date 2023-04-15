import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";


//Verufy Email component
const VerifyEmail = () => {

  const [mail, setMail] = useState('')

  const handleChange = (e) => {
    setMail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: 'https://iamrizwan066.pythonanywhere.com/dj-rest-auth/registration/resend-email/',
      headers: {
        "content-type": "application/json",
      },
      data: {
        'email': mail
      }
    })
      .then(res => {
        if (res.status === 200) {
          toast("Verification email has been sent. Check your inbox, or spam folder.")
        }
      })
      .catch(function (err) {
        if (err.response) {
          // Request made and server responded
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
      })
  }

  return (
    <div className="flex py-14 min-h-screen justify-center items-center">
      <div className=" flex flex-col my-12 bg-white shadow-2xl rounded-3xl h-fit border px-12  mx-auto">
        <div className="font-semibold text-3xl pb-8 pt-12 ">Email Verification</div>
        <form onSubmit={handleSubmit} className="flex  flex-col gap-y-2">
          <input className="p-2 mb-2 border border-gray-400 rounded"
            type="email"
            onChange={(e) => handleChange(e)}
            placeholder='Enter email'
          />
          <button className="bg-red-400  text-center w-fit px-6 py-2 mb-16 rounded " type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
