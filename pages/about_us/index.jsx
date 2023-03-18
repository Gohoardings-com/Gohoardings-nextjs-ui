import React, { useState } from "react";
import Fixednavbar from "../../components/navbar/fixednavbar";
import Branding from "../../components/branding/branding";
import "./about.scss";
import clientslogo from "./clients";

 
const About = () => {
  const [noOfLogo, setnoOfLogo] = useState(18);
  const [showButton, setshowButon] = useState(true);
  const slice = clientslogo.slice(0, noOfLogo);
  const loadMore = () => {
    if (noOfLogo === 18) {
      setnoOfLogo(noOfLogo + noOfLogo);
    } else if (noOfLogo === 36) {
      setnoOfLogo(noOfLogo + 12);
      setshowButon(false);
    }
  };

  const toContact = () => {
    window.location.href = "/contact-us";
  };

  return (
    <>
<div>

{/* <Helmet prioritizeSeoTags>
   <meta charset="utf-8" />
 
  <link rel="icon" href="https://www.gohoardings.com/assets/images/favicon.png" />
<title>About - Outdoor Advertising Agency in India | Gohoardings</title>
  <meta name="description" value="Gohoarding is the leading company of OOH Advertising agency in India. Gohoardings provide Hoardings across  India at best price. | Gohoardings Solution LLP"    data-rh="true" />
  <meta  name="keyword" content="Hoarding agency, Outdoor Advertising Company, Bus Advertising, Airport Advertising, OOH Media Agency, Train Advertising, Cab and Autorikshaw Advertising, Digital LED Display Ads, DOOH Advertising, Ad Agency India, Hoarding Advertising Agency Nearby, Multiplex Advertising, Gohoardings is india’s largest Outdoor Advertising Agency"       data-rh="false"/>
</Helmet> */}
</div>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      <Branding title="About Us" />
      <section className="mt-2">
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7  text-container text-center mt-3">
              <h2>Welcome to India’s largest outdoor advertising agency</h2>
              <p className="descrption">
                our advertising network is spread across 130 cities with more
                than 1.2 lakh OOH and DOOH sites Offering hassle-free branding
                experiences at an unmatched price.We are building brands since
                2016.We believe to innovate,inform and inspire,thus providing a
                range of media for the promotion of your goods, products, and
                services or ideas We have a delighted customer base for the
                advertising company domain, we are engaged in providing the
                services by a skilled and experienced team of professionals with
                utmost perfection.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="img-fluid"
                id="media-img"
                src=""
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="media-container container pb-4">
          <div className="row">
            <div className="col-lg-2 col-md-4 mt-2 col-sm-6 col-6">
              <div className="card about-cards">
                <h6>TRADITIONAL </h6>
                <p className="descrption">
                  Local directory is the smartest way to find the best services
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mt-2 col-sm-6 col-6 ">
              <div className="card about-cards">
                <h6>MALL MEDIA</h6>
                <p className="descrption">
                  Local directory is the smartest way to find the best services
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mt-2 col-sm-6 col-6">
              <div className="card about-cards">
                <h6>DIGITAL OOH MEDIA</h6>
                <p className="descrption">
                  Local directory is the smartest way to find the best services
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mt-2 col-sm-6 col-6">
              <div className="card about-cards">
                <h6>AIRPORT BRANDING</h6>
                <p className="descrption">
                  Local directory is the smartest way to find the best services
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mt-2 col-sm-6 col-6">
              <div className="card about-cards">
                <h6>OFFICE BRANDING</h6>
                <p className="descrption">
                  Local directory is the smartest way to find the best services
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mt-2 col-sm-6 col-6">
              <div className="card about-cards">
                <h6>TRANSIT MEDIA</h6>
                <p className="descrption">
                  Local directory is the smartest way to find the best services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="vision">
        <div className="container text-center">
          <div className="row ">
            <div className="col-md-7  text-container ">
              <h2>Our Vision </h2>
              <p className="descrption">
                Our vision to create a holistic system that helps a user quickly
                and efficiently plan, book and manage out of home advertising
                campaigns across the globe. We want to provide a voice to your
                brand,show you the power of marketing communication,and build a
                bridge between your brand and customer.
              </p>
              <p className="descrption">
                We do it in a different way.We've got the creative eye and the
                perfect equation of ideas.We help you grow by adding the word
                called success to your brand.Thus to conclude our vision is to
                be the master touch, you need, to be visible and heard.
              </p>
            </div>

            <div className="col-md-5">
              <img
                id="map-img"
                className="img-fluid "
                src="./images/india_map.png"
                alt="map"
              />
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="row mt-3">
            <div className="col-md-5">
              <img
                id="care-img"
                className="img-fluid care"
                src="./images/vision.png"
                alt="care"
              />
            </div>
            <div className="col-md-7 text-container">
              <h2>Our Mission</h2>

              <p className="descrption">
                We aim to become the world's best OOH and DOOH advertising
                company.Our mission is to guide you to find your brand’s voice
                and help you to tell a bigger story through our best services
                available in city."Quality never goes out of style" and we
                ensure to provide the best one.
              </p>

              <p className="descrption">
                The promotion that your company needs,for the traffic, you would
                love.Where creativity meets ads,You’ve got a business, we have
                got brilliant minds,striving each day to make this space the
                Leading Outdoor Advertising agency in India
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid px-5  m-0 p-0 text-center mt-5">
          <div>
            <div className="row mt-5 pt-3">
              <h2 className="mt-2">Meet our happy clients</h2>
            </div>
            <div className="grid-container1 mt-3">
              {slice.map((clients, index) => {
                return (
                  <div className="grid-item" key={index}>
                    <img
                      src={clients.img}
                      alt={clients.alt}
                      className="img-fluid logo-img"
                    />
                  </div>
                );
              })}
            </div>
            {showButton ? (
              <button
                className="load-button mt-3 mb-5 p-2"
                onClick={() => loadMore()}
              >
                Load more <i className="bi bi-download "></i>
              </button>
            ) : (
              <button
                className="load-button mt-3 mb-5 p-2 "
                onClick={() => toContact()}
              >
                Let's Talk <i className="bi bi-arrow-right-square"></i>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
