import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

//Context API for Authentication and Authorization
const AuthContext = createContext()
export default AuthContext


export const AuthProvider = ({ children }) => {

  let [auth, setAuth] = useState(() => localStorage.getItem("authToken") ? true : false)
  const navigate = useNavigate()
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

  //Request for user login
  const loginUser = async (e) => {
    e.preventDefault()
    await axios({
      method: "post",
      url: "http://localhost:8000/dj-rest-auth/login/",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      data: JSON.stringify(({
        'email': e.target.email.value,
        'password': e.target.password.value
      }))
    }).then(response => {
      setAuth(true)
      localStorage.setItem("authToken", response.data.key)
      const fb_token = localStorage.getItem(`fbist_${facebookAppId}`)
      if (fb_token !== null){
        localStorage.removeItem(`fbist_${facebookAppId}`)
      }

      return navigate("/")
    })
      .catch(function (err) {
        if (err.response) {
          // Request made and server responded
          toast(`${err.response.data.non_field_errors}`);
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
        return navigate("/accounts/login")

      });
  }

  //API for logging out user
  const logoutUser = async (e) => {
    e.preventDefault()
    await axios({
      method: "post",
      url: "http://localhost:8000/dj-rest-auth/logout/",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    }).then(response => {
      toast(`${response.data.detail}`)
      setAuth(false)
      localStorage.removeItem("authToken")

      return navigate("/")
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

        return navigate("/accounts/login")
      });
  }


  //API for retrieving Django Token based on credentials returned from Google
  const responseToken = async (info) => {
    // Send the response (code or token) to your Django backend to authenticate the user
    await axios('http://localhost:8000/api/get_token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        'email': info.email
      })
    })
      .then((res) => {
        setAuth(true)
        localStorage.setItem("authToken", res.data.key)
      })
      .catch((err) => {
        // Handle errors
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
      });
  };

  //Sending access token to dj-rest-auth for Google SignIn
  const responseGoogle = (response) => {
    // Send the response (code or token) to your Django backend to authenticate the user
    axios('http://localhost:8000/dj-rest-auth/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        access_token: response.credential,  // for Implicit Grant
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          navigate('/')
        }
        //Sending credential(Access token) part to django for token
        responseToken(jwt_decode(response.credential));
      })
      .catch((err) => {
        // Handle errors
        if (err.response) {
          // Request made and server responded
          console.log(err.response.data);
          toast(`${err.response.data.non_field_errors}`)
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
      });
  };

  //Sending access token to dj-rest-auth for Facebook SignIn
  const responseFacebook = (response) => {
    // Send the response (code or token) to your Django backend to authenticate the user
    axios('http://localhost:8000/dj-rest-auth/facebook/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      data: JSON.stringify({
        access_token: response.accessToken,  // for Implicit Grant
      }),
    })
      .then((res) => {
        localStorage.setItem('authToken', res.data.key)
        localStorage.removeItem(`fbist_${facebookAppId}`)
        if (res.status === 200) {
          navigate('/')
        }
        setAuth(true)
      })
      .catch((err) => {
        // Handle errors
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
      });
  };

  //Function to automatically log the user in after signup
  const autoLogin = async (e, email, password) => {
    e.preventDefault()
    await axios({
      method: "post",
      url: "http://localhost:8000/dj-rest-auth/login/",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      data: JSON.stringify(({
        'email': email, 'password': password
      }))
    }).then(response => {
      setAuth(true)
      localStorage.setItem("authToken", response.data.key)

      return navigate("/")
    }).catch(function (err) {
      if (err.response) {
        // Request made and server responded
        console.log(err.response.data);
        toast(`${err.response.data.non_field_errors}`)
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
      }
      return navigate("/accounts/login")
    });
  }


  //API for user Sign Up
  const signupUser = async (e) => {
    e.preventDefault()
    console.log("sing FOrm")
    await axios({
      method: "post",
      url: "http://localhost:8000/dj-rest-auth/registration/",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      data: JSON.stringify(({
        'username': e.target.email.value.substring(0, e.target.email.value.indexOf("@")),
        'email': e.target.email.value,
        'password1': e.target.password1.value,
        'password2': e.target.password2.value
      }))
    }).then(response => {
      console.log(response)
      if (response.status === 204) {
        autoLogin(e, e.target.email.value, e.target.password1.value)
      }
    })
      .catch(function (err) {
        if (err.response) {
          // Request made and server responded
          console.log(err.response.data);
          if (err.response.data.non_field_errors) { toast(`${err.response.data.non_field_errors}`) }
          if (err.response.data.email) { toast(`${err.response.data.email}`) }
          if (err.response.data.password1) { toast(`${err.response.data.password1}`) }
          if (err.response.data.password2) { toast(`${err.response.data.password2}`) }

          console.log(err.response.status);
          console.log(err.response.headers);

        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
        return navigate("/accounts/signup")
      });
  }


  //Data to be shared among other components
  let contextData = {
    auth, auth,
    signupUser: signupUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    responseGoogle: responseGoogle,
    responseFacebook: responseFacebook
  }


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

