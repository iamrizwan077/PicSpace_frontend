import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Password Change Componenet
const PasswordChange = () => {

    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [oldPassword, setOldPassword] = useState('')

    const handleNewPass1 = (e) => {
        setNewPassword1(e.target.value)
    }

    const handleNewPass2 = (e) => {
        setNewPassword2(e.target.value)
    }

    const handleOldPass = (e) => {
        setOldPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("MAIL", mail)
        await axios({
            method: 'POST',
            url: 'http://localhost:8000/dj-rest-auth/password/change/',
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${localStorage.getItem('authToken')}`
            },
            data: JSON.stringify({
                'old_password': oldPassword,
                'new_password1': newPassword1, 
                'new_password2': newPassword2
            })
        })
            .then(res => {
                if (res.status === 200) {
                    toast(`${res.data.detail}`)
                }
            })
            .catch(function (err) {
                if (err.response) {
                    // Request made and server responded
                    console.log(err.response.data);
                    if (err.response.data.new_password2) { toast(`${err.response.data.new_password2}`) }
                    if (err.response.data.new_password1) { toast(`${err.response.data.new_password1}`) }
                    if (err.response.data.old_password) { toast(`${err.response.data.old_password}`) }

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
        <div className="flex  min-h-screen">
            <div className=" flex flex-col my-auto bg-white  shadow-2xl rounded-3xl h-fit border md:px-12 px-2  mx-auto">
                <div className="font-semibold text-3xl py-6 ">Change Password</div>
                <form onSubmit={handleSubmit} className="flex  flex-col gap-y-2 mx-auto">
                    <input
                        className="p-2 mb-1 border border-gray-400 rounded"
                        type="password"
                        onChange={(e) => handleNewPass1(e)}

                        placeholder='Enter new password'
                    />
                    <input className="p-2 mb-1 border border-gray-400 rounded"
                        type="password"
                        onChange={(e) => handleNewPass2(e)}

                        placeholder='Confirm new password'
                    />
                    <input className="p-2 mb-1 border border-gray-400 rounded"
                        type="password"
                        onChange={(e) => handleOldPass(e)}

                        placeholder='Enter old password'
                    />
                    <button className="bg-red-400 text-center w-fit px-6 py-2 mb-12 rounded" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordChange;



