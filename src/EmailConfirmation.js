import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


//Email verification after link is clicked sent in email
const EmailConfirmation = () => {

  const { key } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    handleConfirm()
  }, [])

  const handleConfirm = async () => {
    await axios({
      method: 'POST',
      url: 'https://iamrizwan066.pythonanywhere.com/dj-rest-auth/registration/verify-email/',
      headers: {
        "content-type": "application/json",
      },
      data: {
        'key': key
      }
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          toast("Email address has been verified.")
          navigate('/')
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
  
  return null;
}

export default EmailConfirmation;
