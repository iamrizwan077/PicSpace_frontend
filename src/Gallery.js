import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"
import { Link } from "react-router-dom";
import fileDownload from 'js-file-download'
import AuthContext from "./AuthContext.js";
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import Img from "./Img.js";

const Gallery = () => {
  const [gallery, setGallery] = useState([])
  const [images, setImages] = useState([])
  
  const [modal, setModal] = useState(false)
  const [modaldata, setModalData] = useState(null)
  const [iconDisplay, setIconDisplay] = useState(false) 
  let {authToken} = useContext(AuthContext)

  const storage = () => {
    for (let i in gallery){
      console.log()
    }     
  }
  



  const reader = new FileReader()
{/*}
  const handleGallery = () => {
    axios.get("http://127.0.0.1:8000/api/gallery/")
    .then(res =>  setGallery(res.data) 
    )
    .catch(err =>
      console.log(err)
    )

  }
{*/}
  const handleGallery = async () =>{
     await axios({
      method: "get",
      url: "https://iamrizwan.pythonanywhere.com/api/gallery/",
      headers: {
        "content-type": "application/json",
        'Authorization': "JWT "+ String(authToken.access),
      }
    })
  
     // .then((res) => setImages(res.data)
      .then ((res) => setGallery(res.data)
    )
  //  let images = JSON.parse(response.data)
  //  setGallery(images)
//  
      
  }
 // let user_images =  JSON.stringify(images)
  //setGallery(user_images)
  




  useEffect(() => {
    handleGallery()
  }, [gallery])

  const handleModal = (e, key) => {
    console.log(modal)
    setModal(true)
    console.log(modal)
    imageClicked(key)
  }

  const imageClicked = (key) => {
    setModalData(key)
  }











  //const [data, setData] = useState(null);
  {/*}let gallery=[];
  const getData = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/gallery/")
      .then((res) => {
        console.log("res", res)
        gallery.push(res.data)
        console.log("GAllery" ,gallery)
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, [null]);
  let das = document.getElementById("das")
  const display=(gallery)=>{
    for (let i in gallery){
      console.log(i.name, i.image, " .. ")
      das.innerHTML=gallery
    }
  }
//  display(data)



{*/}

  const imageToDownload = (e, key) => {
    console.log(e.target)
    console.log(gallery[key].image)
    console.log(`https://iamrizwan.pythonanywhere.com${gallery[key].image}`,gallery[key].name)
    handleDownload(`https://iamrizwan.pythonanywhere.com${gallery[key].image}`,gallery[key].name)
    console.log(key)
  }


  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
}

  const handleHoverIn = (e, k) => {
    let download_icon = document.querySelector(`#icon${k}`)
    let delete_icon = document.querySelector(`#delete${k}`)
    let image = document.querySelector(`#image${k}`)
  //  console.log(icon.classList)
    download_icon.classList.remove('hidden')
    delete_icon.classList.remove('hidden')
    image.classList.add('opacity-50')
    
    
    //setIconDisplay(true)
  }
 
  const handleHoverOut = (e, k) => {
    //setIconDisplay(false)
    let download_icon = document.querySelector(`#icon${k}`)
    let delete_icon = document.querySelector(`#delete${k}`)
    let image = document.querySelector(`#image${k}`)
   // console.log(icon.classList)
    download_icon.classList.add('hidden')
    delete_icon.classList.add('hidden')
    image.classList.remove('opacity-50')

  }

 
  
  const handleDelete = async (e, key) =>{
    console.log(e.target)
    let image_id = gallery[key].id
    console.log(gallery[key].image)
  
    console.log(image_id)


    await axios({
     method: "delete",
     url: "https://iamrizwan.pythonanywhere.com/api/gallery/",
     headers: {
       "content-type": "application/json",
       'Authorization': "JWT "+ String(authToken.access),
     },
     data: image_id
   })
 
    // .then((res) => setImages(res.data)
     .then ((res) => setGallery(res.data)
   )
 //  let images = JSON.parse(response.data)
 //  setGallery(images)
//  
     
 }
  
  
  return (
  <div className="h-screen">
    <div className="sm:grid-cols-3 grid gap-2 mx-4 my-4 grid-cols-2  ">
      {
        gallery.map((image,k) => (
          <div className="relative   " onMouseOver={e => handleHoverIn(e,k)}
          onMouseOut = {e => handleHoverOut(e,k)}> 
          <div key={k} className="  " onClick={e=>handleModal(e,k)}>
    
            <img id={`image${k}`} className="w-full transition-1000 transition-opacity rounded-xl sm:h-72 h-56 border-purple-800 " src={`https://iamrizwan.pythonanywhere.com${image.image}`} /> 
            <div className="truncate  mx-4 my-1 ">{image.name}</div>
            </div>
            <i id={`delete${k}`} className=" fa-solid hidden delay-1000  fa-trash text-lg absolute top-3 right-3   " onClick={e=>handleDelete(e,k)}></i>
    
    <i id={`icon${k}`} className=" fa-solid  delay-1000 hidden fa-cloud-arrow-up text-lg absolute top-3 left-3   " onClick={e=> imageToDownload(e,k)}></i>
          {/*}  <HiOutlineDocumentDownload classname = "" onClick={e=> imageToDownload(e,k) } ></HiOutlineDocumentDownload>
          {*/}
          </div>
        ))
            
      }
            
      {modal && <Lightbox
        imageTitle={gallery[modaldata].name}
        mainSrc={`http://localhost:8000${gallery[modaldata].image}`}
        onCloseRequest={() => setModal(false)}
      />
      }
      {/*}
      {modal && <Lightbox
        imageTitle={gallery[1].name}
        mainSrc={`http://localhost:8000${.image}`}
        onCloseRequest={() => setModal(false)}
      />}
  {*/}
      {/*}
      <div>
        {
          gallery.map(image =>(
            <div key={image.id}>{image.name} ....... http://localhost:8000{image.image} <img src={`http://localhost:8000${image.image}`} /> </div>
            
          ))
        }
      
        <img src="http://localhost:8000/media/images/logo1.png"/>
        <img src="https://th.bing.com/th/id/R.86867a04219a6756478094d5d0fea230?rik=LsrQ6BdXbW76Ug&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1572119459401-944f182281b3%3fixlib%3drb-1.2.1%26q%3d80%26fm%3djpg%26crop%3dentropy%26cs%3dtinysrgb%26w%3d1080%26fit%3dmax&ehk=DCfiR7CMMByG%2fwRbXSOM%2fVlyxbf22QcBkzmIX6nAWCA%3d&risl=&pid=ImgRaw&r=0"/>
      </div>
{*/}





      {/*}    <Img val="https://images.unsplash.com/photo-1657281277237-e1104ff6f18b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      <Img val="https://images.unsplash.com/photo-1657296950265-e17c3db4e85a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" />
      <Img val="https://images.unsplash.com/photo-1657281277237-e1104ff6f18b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      <Img val="https://images.unsplash.com/photo-1657296950265-e17c3db4e85a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" />
      <Img val="https://images.unsplash.com/photo-1657281277237-e1104ff6f18b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      <Img val="https://images.unsplash.com/photo-1657296950265-e17c3db4e85a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" />
      <Img val="https://images.unsplash.com/photo-1657281277237-e1104ff6f18b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
    {*/}
    </div>
    </div>
      
  );
};

export default Gallery;
