import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loader from "../components/loader";
import Image from "next/image";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { goh_testimonialsApi } from "@/allApi/apis";
const OurClients = () => {
  const [posts, setPosts] = useState([]);
  const clients = async () => {
    const data = await goh_testimonialsApi();
    setPosts(data);
  };

  useEffect(() => {
    clients();
  }, []);

  {
    var settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      speed: 3500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }

  let slider = settings;
  return (
    <>
      <div className="container-xxl  container-xl container-lg container-md  mt-5 mt-md-2 mb-md-4  py-5 mb-5 clients ">
        <section>
          <h2 className="text-center text-nowrap ">
            What Our Clients Say About Us!
          </h2>
          <h6 className=" text-center">
            Our clients praise our advertising agency for exceptional
            creativity,
            <br /> results-driven campaigns and unmatched dedication to their
            success.
          </h6>
        </section>

        {!posts? (
            <div className=" container ">
              <div className="row  text-center my-3">
                <Loader />
              </div>
            </div>
          ) : (
        <>
          <Slider {...slider}>
            {posts &&
              posts.map((el, i) => (
                <div className="card m-3" key={i}>
                  <div className="card-body">
                    <Image
                      width={50}
                      height={50}
                      src={
                        `images/web_pics/user-profile.png`
                      }
                      alt="..."
                    />
                    <h3>{el.name}</h3>
                    {/* <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                    </div> */}
                    <p dangerouslySetInnerHTML={{ __html: el.testimony }} />
                  </div>
                </div>
        
              ))}
          </Slider>
        </>
       )} 
      </div>
      <style jsx>
        {`
          h2 {
            font-size: 2.2rem;
            font-weight: 700;
            color: #373435;
          }
          h6 {
            font-size: 1.1rem;
            font-weight: 400;
            color: #373435;
          }
          h3{
            font-size: 1rem;
            font-weight: 600;
            color: #373435;
            margin-top:6px;
          }
          p{
            font-size: small;
            color: #373435;
           
          }
          .card {
            border-bottom: 8px #FFF212 solid !important;
            transition: 0.5s;
            border:none;
            margin: 40px !important;
            height:245px;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px!important;
             width:300px !important;
          }
       

          @media screen and (max-width:540px) {
            .clients {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default OurClients;
