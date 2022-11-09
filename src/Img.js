import React from "react";

const Img = ( {name,image} ) => {
  console.log("Data is", {name});
  console.log("imgData is", {image});
  let pic = 
  <img
  src={image}
    alt=""
    style={{ width: 400, height: 400, padding: "40px" }}
  />;
  console.log(pic)

  //console.log("imgurlData is", URL.createObjectURL(image));
  return (
    <div>
      {pic}    
      <div>{name}</div>
    </div>
  );
};

export default Img;
