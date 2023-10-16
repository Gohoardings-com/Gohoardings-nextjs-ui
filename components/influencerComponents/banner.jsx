import React, { useState, useEffect } from "react";
import styles from "../../styles/bannerInfluncer.module.scss";
import { TrendingCites } from "@/allApi/mediajson";
import Slider from "react-slick";
const Banner = () => {
  const [search, setSearch] = useState(TrendingCites);

  {
    var settings = {
      // dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      // cssEase: "linear",

      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0,
          },
        },
      ],
    };
  } 

  let slider = settings;
  return (
    <div className={styles.influencer_media_content}>
      <div
        className={`container-xxl  container-xl container-lg container-md mb-4  ms-xs-3`}
      >
        <div className="row mt-5 mt-md-0">
          <div className="col-md-5 ps-2 ps-md-0">
            <div className={`${styles.heading_text} mt-4`}>
              <h1>
                EMBRACING ALL LIFE STAGES
                <br /> THROUGH A MEDIA-FUELED NETWORK.
              </h1>
              <h6 className="pt-2">
                Social Media Presence Simplified Explore
                <br />
                Platforms. Check Engagement. Elevate Online.
              </h6>
            </div>
            <div className={`${styles.mnc} mt-4 ms-2 ms-md-0`}>
              <a className="text-decoration-none">
                <button
                  className={`${styles.button}`}
                  onClick={() => route.push(`/contact-us`)}
                >
                  <span>Enquire now</span>
                </button>
              </a>
            </div>
          </div>
          <div
            className="col-md-7  p-md-0 d-none d-md-block position-relative"
            style={{ marginTop: "25%" }}
          >
            <div className="ps-md-4">
              <Slider {...slider}>
                {search &&
                  search.map((pos, i) => (
                    <div className="container" key={i}>
                      <div className="row">
                        <div className="col">
                          <img
                            className="rounded-2  trending-cardd "
                            key={i}
                            alt={pos.alt}
                            src={pos.thumb}
                            onError={(e) =>
                              (e.target.src = "/images/web_pics/alter-img.png")
                            }
                          />
                          {/* <div className="bottom-left-media">
                              {pos.medianame.substring(0, 20)}...
                            </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Banner;
