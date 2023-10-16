import React from "react";
import Image from "next/image";
const WhyUs = () => {
  const logo = [
    {
      id: 1,
      img: "/images/web_pics/facebook2.png",
      alt: "Facebook",
    },
    {
      id: 2,
      img: "/images/web_pics/Instagram.png",
      alt: "instagram",
    },
    {
      id: 3,
      img: "/images/web_pics/Linkedin.png",
      alt: "youtube",
    },
    {
      id: 4,
      img: "/images/web_pics/Twitch.png",
      alt: "youtube",
    },
    {
      id: 5,
      img: "/images/web_pics/Snapchat.png",
      alt: "youtube",
    },
    {
      id: 6,
      img: "/images/web_pics/youtube2.png",
      alt: "youtube",
    },
  ];
  return (
    <>
      <div className={`container-xxl  container-xl container-lg container-md my-md-5`}>
        <div className="row">
            <h2>Influencer’s Platforms</h2>
          <div className="influencer-platform my-md-5">
            {logo.map((e, i) => (
              <p key={i} className="my-0 logo-img">
                <Image
                  width={120}
                  height={120}
                  src={e.img}
                  alt={e.alt}
                  className="img-fluid "
                />
              </p>
            ))}
          </div>
        </div>
        <div className="row my-md-5">    
        <h2>Why choose Gohoardings.com</h2>  
         <div className="col-md-4">
       <div className="card why-card my-md-5">

       </div>
       <div className="card why-card my-md-5">

       </div>
         </div>
         <div className="col-md-4">
         <Image
                  width={500}
                  height={500}
                  src={"/images/web_pics/whyus.png"}
                  alt="whyus"
                  className="img-fluid "
                />
         </div>
         <div className="col-md-4">
         <div className="card why-card my-md-5">

</div>
<div className="card why-card my-md-5">

</div>
         </div>
        </div>
      </div>
      <style jsx>
        {`
          h2 {
            font-size: 2.2rem;
            font-weight: 700;
            color: #373435;
            text-align: center;
          }
          .influencer-platform {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo-img{
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          }
          .why-card{
            height:110px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            
          }

        `}
      </style>
    </>
  );
};

export default WhyUs;
