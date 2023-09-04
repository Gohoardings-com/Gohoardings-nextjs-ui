import React from "react";

const Medialogo = ({ category_name, city_name, Media_content }) => {
  return (
    <>
      <div className="media-branding-n">
        <div className="media-branding">
          {Media_content.map((el, i) => {
            if (category_name === el.value ) {
              return (
                <div key={i}>
                  {" "}
                  <img src={el.srcImgM} alt="media_img" />
                  <div className="centered">
                    <h1>{el.banner_heading}</h1>
                    <p className="mt-1 mt-md-2">{el.banner_content}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <style jsx>
        {`
          .media-branding-n {
            margin-top: 2%;
          }
          .media-branding {
            text-align: center;
            color: white;
            position: relative;
            z-index: 0;
            transition: transform 0.6s;
          }
          img {
            height: 36.5vh;
            width: 100%;
            border-radius: 6px;
          }

          .centered {
            width: 76vw;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            line-height: 37.92px;
            color: #ffffff;
          }
          p {
            font-size: 0.8rem;
            color: #ffffff;
            font-weight: 300;
          }

          @media screen and (max-width: 1024px) {
            img {
              height: 45vh;
              width: 100%;
            }

            h1 {
              font-size: 2.8rem;
            }
            p {
              font-size: 1rem;
            }
          }
          @media screen and (max-width: 540px) {
            img {
              height: 24vh;
              width: 100%;
            }

            .centered {
              width: 95vw;
            }
            h1 {
              font-size: 1.2rem;
            }
            p {
              font-size: 0.6rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Medialogo;
