import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dropdown.scss";

const Navbardropdown = ({ show, setShow, Dropdown }) => {
  return (
    <>
      <Dropdown.Menu
        show={show}
        onMouseLeave={() => setShow(false)}
        className="drop-menu   position-fixed  rounded-0"
        id="de"
      >
        <div className="container-xxl  container-xl container-lg container-md  ">
          <div className="row m-1 drop-data">
            <div className="col-3 p-0  border-box mb-3">
              <ul className="list-none ms-2">
                <li>
                
                  <Link
                    to={`/traditional-ooh-media/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    {" "}
                    Traditional OOH
                  </Link>
                </li>
                <li>
                
                  <Link
                    to={`/mall-media/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    {" "}
                    Mall Media
                  </Link>
                </li>
                <li>
                
                  <Link
                    to={`/airport-media/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    {" "}
                    Airport Media
                  </Link>
                </li>
               
                <li>
                
                  <Link
                    to={`/office-branding/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    {" "}
                    Office Branding
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3 p-0 m-0 border-box mb-3">
              <ul className="list-none">
                <li>
                
                  <Link
                    to={`/digital-media/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    Digital Screen
                  </Link>
                </li>
                <li>
                
                  <Link
                    to={`/inFlight-branding/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    InFlight Branding
                  </Link>
                </li>
                <li>
                
                  <Link
                    to={`/transit-media/delhi`}
                    className="button text-dark text-nowrap is-small is-info text-decoration-none"
                  >
                    Transit Media
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3 p-0 m-0 border-box mb-3">
              <ul className="list-none">
                <li>
                
                  <a href="/about-us" className="text-decoration-none text-dark">
                    About Us
                  </a>
                </li>
                <li>
                
                  <a href="/team" className="text-decoration-none text-dark">
                    Team
                  </a>
                </li>
                <li>
                
                  <a href="/media-and-news" className="text-decoration-none text-dark">
                    News & Media
                  </a>
                </li>
              
                {/* <li>
                
                  Case Studies
                </li> */}
                <li>
                
                  <a href="/contact-us" className="text-decoration-none text-dark">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3 p-0 m-0 mb-3">
              <ul className="list-none">
              <li>
                
                <a
                  href="/testimonial"
                  className="text-decoration-none text-dark"
                >
                  Testimonials
                </a>
              </li>
                <li>
                
                  <a
                    href="https://www.gohoardings.com/blog/"
                    className="text-decoration-none text-dark"
                    target="_blank"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                
                  <a href="/faq" className="text-decoration-none text-dark">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

       
          </div>

          
        </div>
      </Dropdown.Menu>
    </>
  );
};

export default Navbardropdown;