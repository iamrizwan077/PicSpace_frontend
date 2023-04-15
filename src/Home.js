import React, { useState } from "react";
import axios from "axios";
import './fileBtn.css'
import { Widget } from "@uploadcare/react-widget";
import { toast } from "react-toastify";


//Home Component
const Home = () => {
  const [file, setFile] = useState(null);
  const handleUpload = async (info) =>{
    setFile(info.cdnUrl);
    await axios({
     method: "post",
     url: "https://iamrizwan066.pythonanywhere.com/api/home/",
     headers: {
       "content-type": "application/json",
       "Authorization": `Token ${localStorage.getItem('authToken')}`
     },
     data: { image_url: info }
   })
  // .then(res => console.log(res))
   .catch((error) => {
    console.log(error);
    toast(f`{error}`)
  });
  }

  return (
    <div className="min-h-screen flex justify-center flex-col">
      <div className="flex flex-col justify-center text-center">
        <i className="fa-solid fa-cloud-arrow-up text-9xl flex justify-center"></i>
      </div>

      <h1 className="font-semibold text-center ">Press button below to upload files</h1>

    <div className="flex justify-center mt-4 hover:cursor-pointer">
        <Widget
          publicKey="d63864da0febf4f801e4"
          onChange={handleUpload}
          clearable
          previewStep='50%'
         />
    </div>
   
    </div>
  );
};

export default Home;






















































// import React from "react";
// import uploadcare from 'uploadcare-widget/uploadcare.lang.en.min.js'
// import { base } from '@uploadcare/upload-client'

// // fileData must be `Blob` or `File` or `Buffer`
// const result = await base(

//   fileData,
//   {
//     publicKey: '',
//     store: 'auto',
//     // metadata: {
//     //   subsystem: 'uploader',
//     //   pet: 'cat'
//     // }
//   }
// )


// const Home = () => {

//   <style>.uploadcare--widget__button.uploadcare--widget__button_type_open {
//     background-color: #983c23;
    
//   }</style>
  
  
//   return(

//     <div>dsa</div>
//   );
// }

// export default Home





// import React, { useState, useContext } from "react";
// import homeimg from "./images/home.png";
// import axios from "axios";
// //import LinearProgress from '@mui/material/LinearProgress';
// //import { LinearProgress } from '@mui/material';
// import LinearProgress from '@material-ui/core/LinearProgress';
// // or
// //import { LinearProgress } from '@mui/material';
// import AuthContext from "./AuthContext.js";

// const Home = () => {
//   let [file, setFile] = useState(null);
//   let [fileUploaded, setFileUploaded] = useState(false)
//   let [fileInfo, setFileInfo] = useState({})
//   const [isSuccess, setIsSuccess] = useState(false);

//   let [progress, setProgress] = useState(0)

//   let { authToken } = useContext(AuthContext)
//   console.log(file)
//   let handleChange = (event) => {
//     setFile(event.target.files[0]);
//     setFileInfo(event.target.files[0])
//     setFileUploaded(true)
//     //  console.log("FILEup", fileUploaded);
//     //console.log("FILEinf", fileInfo);

//     //  console.log("FILE", file);

//   };
//   console.log(file)

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const img = URL.createObjectURL(file);
//     //  console.log(img);
//     const url = "http://localhost:8000/api/home";
//     //   const data ={
//     //    'name': file.name,
//     //  'image': img
//     //  }
//     //  const json_data = JSON.stringify(data)
//     //  console.log(json_data)


//     const formData = new FormData();
//     if (file !== null) {
//       formData.append("name", file.name);
//       formData.append("image", file);
//       formData.append("size", file.size);
//       //    console.log(formData);
//     }
//     //  const config = {
//     //   headers: {
//     //     "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'"

//     //   }
//     //  };
//     await axios({
//       method: "post",
//       url: url,
//       data: formData,
//       headers: {
//         "content-type": "multipart/form-data",
//         "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//       },
      
//       onUploadProgress: (progressEvent) => {
//         const progress = (progressEvent.loaded / progressEvent.total) * 100;
//         setProgress(progress);
//       },
//     })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         if (error.response) {
//           // Request made and server responded
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           console.log(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log("Error", error.message);
//         }
//       });
//     await new Promise((resolve) => {
//       setTimeout(() => resolve("success"), 500);
//     });
//     setIsSuccess(true);
//     // setProgress(0);

//   };

//   const fileSize = (file) => {
//     var file_size;
//     if (file.size > 1000000) {
//       file_size = (file.size / 1000000).toFixed(1)
//     }
//     else if (file.size > 1000) {
//       file_size = (file.size / 1000).toFixed(1)
//     }
//     return file_size
//   }

//   return (
//     <div className="opacity-80 flex  ">
//     {/*}  <img className="flex justify-center  relative  items-center h-screen" src={homeimg} />
//     <div className=" absolute inset-2/4 ">{*/}  

//   <div className="  h-screen w-full flex justify-center items-center">

//         <form onSubmit={handleSubmit} method="post" className=" justify-center flex flex-col">
//           <label onChange={e => handleChange(e)} htmlFor="formId">
//             <input type="file" id="formId" hidden accept="image/*" />

//             <div className="flex flex-col justify-center text-center"><i className="fa-solid fa-cloud-arrow-up   text-9xl flex justify-center"></i>Select files to upload</div>
//           </label>
//           {fileUploaded && <div className="  ">{isSuccess || <div>
//             <div classname="my-2"><LinearProgress variant="determinate" value={progress} /></div>
//             <div className="font-bold ">Filename: <span className="font-light">{file.name}</span></div>
//             <div className="font-bold">Size: <span className="font-light">{fileSize(file)}{file.size > 1000000 ? "MB" : "KB"}</span></div>
//            </div> }<div className="flex justify-center">
//             {isSuccess ? <div className=" px-8 py-3 font-bold  flex justify-center">{file.name} Uploaded</div> : <button type="submit" className=" bg-[#e06377] px-8 py-3 font-bold  flex justify-center  rounded-md hover:bg-[#c83349]">Upload</button>}
//             </div></div>}</form>
//       </div>
//     </div>
//   );
// };

// export default Home;
