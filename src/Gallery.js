import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"
import fileDownload from 'js-file-download'


//Gallery component
const Gallery = () => {

  const [gallery, setGallery] = useState([])
  const [modal, setModal] = useState(false)
  const [modaldata, setModalData] = useState(null)

  const uploadcareKey = process.env.REACT_APP_UPLOADCARE_KEY

  //Retreive gallery data
  const handleGallery = async () => {
    await axios({
      method: "get",
      url: "https://iamrizwan066.pythonanywhere.com/api/gallery/",
      headers: {
        "content-type": "application/json",
        "Authorization": `Token ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => {
        setGallery(res.data)
      })
  }

  useEffect(() => {
    handleGallery()
  }, [])

  //Display image modal
  const handleModal = (e, key) => {
    setModal(true)
    imageClicked(key)
  }

  //Check if image has been clicked 
  const imageClicked = (key) => {
    setModalData(key)
  }

  //Check which image to download
  const imageToDownload = (e, key) => {
    handleDownload(`https://ucarecdn.com/${gallery[key].image_uuid}/`, gallery[key].name)
  }

  //Download image
  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  //Managing mouse hover in on image
  const handleHoverIn = (e, k) => {
    let download_icon = document.querySelector(`#icon${k}`)
    let delete_icon = document.querySelector(`#delete${k}`)
    let image = document.querySelector(`#image${k}`)
    download_icon.classList.remove('hidden')
    delete_icon.classList.remove('hidden')
    image.classList.add('opacity-50')
  }

  //Managing mouse hover out on image
  const handleHoverOut = (e, k) => {
    let download_icon = document.querySelector(`#icon${k}`)
    let delete_icon = document.querySelector(`#delete${k}`)
    let image = document.querySelector(`#image${k}`)
    download_icon.classList.add('hidden')
    delete_icon.classList.add('hidden')
    image.classList.remove('opacity-50')

  }

  //Deleting image
  const handleDelete = async (e, key) => {
    let image_id = gallery[key].id

    //Delete image from Uploadcare Account
    await axios({
      method: "delete",
      url: `https://api.uploadcare.com/files/${gallery[key].image_uuid}/`,
      headers: {
        "content-type": "application/json",
        "Authorization": `Uploadcare.Simple ${uploadcareKey}`,
      },

    })

    //Delete image URL from database
    await axios({
      method: "delete",
      url: "https://iamrizwan066.pythonanywhere.com/api/gallery/",
      headers: {
        "content-type": "application/json",
        "Authorization": `Token ${localStorage.getItem('authToken')}`
      },
      data: image_id
    })
      .then((res) => setGallery(res.data)
      )

  }


  return (
    <div className="min-h-screen mt-12">
      <div className="sm:grid-cols-3 grid gap-2 mx-4 my-4 grid-cols-2  ">

        {/* Mapping images along with their name, size and buttons */}
        {
          gallery.map((image, k) => (
            <div className="relative" onMouseOver={e => handleHoverIn(e, k)}
              onMouseOut={e => handleHoverOut(e, k)}>
              <div key={k} onClick={e => handleModal(e, k)}>
                <img id={`image${k}`} className="w-full transition-1000 transition-opacity rounded-xl sm:h-72 h-56 border-purple-800" src={`https://ucarecdn.com/${image.image_uuid}/`} />
                <div className="truncate  mx-4 my-1 ">{image.name}</div>
              </div>
              <i id={`delete${k}`} className=" fa-solid hidden delay-1000  fa-trash text-lg absolute top-3 right-3" onClick={e => handleDelete(e, k)}></i>
              <i id={`icon${k}`} className=" fa-solid  delay-1000 hidden fa-cloud-arrow-up text-lg absolute top-3 left-3" onClick={e => imageToDownload(e, k)}></i>
            </div>
          ))
        }

        {/* Display modal on image click */}
        {
          modal && <Lightbox
            imageTitle={gallery[modaldata].name}
            mainSrc={`https://ucarecdn.com/${gallery[modaldata].image_uuid}/`}
            onCloseRequest={() => setModal(false)}
          />
        }
      </div>
    </div>

  );
};

export default Gallery;
