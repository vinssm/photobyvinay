import React from "react";
import { ImageList, ImageListItem } from "@material-ui/core";

import Image1 from "../assets/img/image1.jpg";
import Image2 from "../assets/img/image2.jpg";
import Image3 from "../assets/img/image3.jpg";
import Image4 from "../assets/img/image4.jpg";
import image5 from "../assets/img/image5.jpg";
import image6 from "../assets/img/image6.jpg";
import image7 from "../assets/img/image7.jpg";
import image8 from "../assets/img/image8.jpg";
import image9 from "../assets/img/image9.jpg";
import Image10 from "../assets/img/image10.jpg";
import Image11 from "../assets/img/image11.jpg";
import image12 from "../assets/img/image12.jpg";
// import image13 from '../assets/img/image13.jpg';

const HomeGallery = () => {
  let data = [
    {
      id: 1,
      imgSrc: Image1,
      rows: 3,
      cols: 3,
      featured: true,
    },
    {
      id: 2,
      imgSrc: Image2,
    },
    {
      id: 3,
      imgSrc: Image3,
    },
    {
      id: 4,
      imgSrc: Image4,
      rows: 3,
      cols: 3,
      featured: true,
    },
    {
      id: 5,
      imgSrc: image5,
    },
    {
      id: 6,
      imgSrc: image6,
    },
    {
      id: 7,
      imgSrc: image7,
      rows: 3,
      cols: 3,
    },
    {
      id: 8,
      imgSrc: image8,
    },
    {
      id: 9,
      imgSrc: image9,
    },
    {
      id: 10,
      imgSrc: Image10,
      rows: 3,
      cols: 3,
    },
    {
      id: 11,
      imgSrc: Image11,
    },
    {
      id: 12,
      imgSrc: image12,
    },
    {},
  ];
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem
        style={{ width: "100%", height: "100%", position: "absolute" }}
        cols={3}
      >
        {data.map((item, index) => {
          return (
            <img
              key={item._id || item.imgSrc || index}
              className="img"
              src={`${item.imgSrc}`}
              srcSet={`${item.imgSrc}`}
              alt={item.title}
              loading="lazy"
            />
          );
        })}
      </ImageListItem>
    </ImageList>
  );
};

export default HomeGallery;
