import React from "react";
import "./medialogo.scss";
import { CityNameImage } from "@/allApi/apis";
const Medialogo = ({ category_name, city_name }) => {

  return (
    <>
      <div className="media-branding">
        {CityNameImage.map((el, i) => {
          if (category_name === el.value || category_name === el.value2 || category_name === el.city ) {
            return <img key={i} src={el.srcImgM} alt={el.srcImg} />;
          }
        })}
        <div className="centered">
          <h1>
            Hoarding Advertising Agency in{" "}
            {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`}{" "}
          </h1>
          <p className="mt-1 mt-md-4">
            We can help you to grow your business in{" "}
            {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`} with
            our affordable outdoor hoarding advertising company in 
            {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`}. Our
            team of well-experienced marketing professionals has already studied
            the market; they know where 
            to place your banner in the city so that more people will notice it.
            You just have to share your requirements & ideas; 
            our team will design a banner for you, place it, and take care of
            permission & all the other stuff. At Go Hoarding, we  are
            providing fully managed hoarding advertising services.
          </p>
        </div> 
      </div>
    </>
  );
};

export default Medialogo;