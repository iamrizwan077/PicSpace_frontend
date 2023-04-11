import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//Profile Component
const Profile = () => {

  let [storage, setStorage] = useState(0)
  let [user, setUser] = useState({})
  let [verifiedEmail, setVerifiedEmail] = useState()
  let [socialProvider, setSocialProvider] = useState()

  const handleStorage = async () => {
    await axios({
      method: "get",
      url: "http://localhost:8000/api/profile/",
      headers: {
        "content-type": "application/json",
        "Authorization": `Token ${localStorage.getItem('authToken')}`
      }
    }).then((res) => {
      setStorage(res.data.storage);
      setSocialProvider(res.data.social_provider)
      setVerifiedEmail(res.data.verified_email)
    })
  }

  const handleProfile = async () => {
    await axios({
      method: "get",
      url: "http://localhost:8000/dj-rest-auth/user/",
      headers: {
        "content-type": "application/json",
        "Authorization": `Token ${localStorage.getItem('authToken')}`
      }
    }).then((res) => {
      setUser(res.data)
    })
  }

  useEffect(() => {
    handleStorage()
    handleProfile()
  }, [])


  return (
    <div className='min-h-screen p-4'>
      <p className='text-5xl  pb-8 font-semibold underline'>Profile</p>
      <div className='font-semibold flex flex-col gap-y-1.5 text-2xl'>
        <div>Username: <em>{user.username}</em></div>
        <div>Email: <em>{user.email}</em></div>
        {user.first_name && <div>First name: <em>{user.first_name}</em></div>}
        {verifiedEmail || <Link to='/verify-email' className='text-blue-900 underline'><em>Verify Email</em></Link>}
        {user.last_name && <div>Last name: <em>{user.last_name}</em></div>}
        <div>Storage: <em>{storage}</em></div>
        {socialProvider || <Link to='/change-password' className='text-blue-900 underline'><em>Change password</em></Link>}
      </div>
    </div>
  )
}

export default Profile

