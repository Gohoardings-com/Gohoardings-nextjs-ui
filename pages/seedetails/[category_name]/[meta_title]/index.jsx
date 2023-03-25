import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "@/allApi/apicontext";
import { Link } from "next/link";
import { enquiryApi, emailformate } from "@/allApi/apis";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import "./details.scss";
import { toast, ToastContainer } from "react-toastify";
import instance from "@/allApi/axios";
import Fixednavbar from "../../../../components/navbar/fixednavbar";

import { Carousel } from "react-responsive-carousel";
import Loader from "@/components/loader";
import { addItem, removeItem, singlemnedia } from "@/redux/adminAction";
import { useRouter } from "next/router";

const Details = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category_name, meta_title } = router.query;

  const { addRemove } = useContext(AccountContext);
  const [markers, setPosts] = useState([]);

  const [name, setName] = useState("");
  const [phone, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setEror] = useState(false);

  let count = 0;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      setEror(true);
      count = +1;
    } else if (phone.length !== 10) {
      count = +1;
      setEror(true);
    } else if (!emailformate.test(email)) {
      count = +1;
      setEror(true);
    } else if (message === "") {
      count = +1;
      setEror(true);
    } else if (count === 0) {
      const data = await enquiryApi(name, email, phone, message);

      if (data.success == true) {
        setName("");
        setNumber("");
        setEmail("");
        setMessage("");
        setEror(false);
        toast("Our team will contact you soon");
      }
    }
  };
  const mapData = async () => {
    dispatch(singlemnedia(meta_title, category_name)).then(() => {
      router.push("/map");
    });
  };

  // useEffect(() => {
  //   mapData()
  // }, []);

  const getMedia = async () => {
    if (category_name && meta_title) {
      const { data } = await instance.post("seedetails", {
        meta_title: meta_title,
        category_name: category_name,
      });

      setPosts(data);
    }
  };

  const locatetologin = async () => {
    localStorage.setItem("locate", `/services/${category_name}/${meta_title}`);
    router.push("/login");
  };
  const addonCart = async (e) => {
    if (!localStorage.getItem(true)) {
      localStorage.setItem("locate", `/${meta_title}/${category_name}`);
      router.push("/login");
    } else {
      addRemove({ type: "INCR" });
      dispatch(addItem(e.code, e.category_name));
      addRemove({ type: "INCR" });

      add(e);
    }
  };
  const removefroCart = async (obj) => {
    await dispatch(removeItem(obj.code));
    addRemove({ type: "DECR" });
    remove(obj);
  };

  const add = (event) => {
    let data = [...markers];
    data.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 0;
      }
      setPosts(data);
    });
  };

  const remove = (event) => {
    let data = [...markers];
    data.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 1;
      }
      setPosts(data);
    });
  };
  useEffect(() => {
    getMedia();
  }, [category_name, meta_title]);

  return (
    <>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      {markers == 0 ? (
        <>
          <div className=" container-xxl  container-xl container-lg container-md">
            <div className="row  text-center my-5">
              <Loader />
            </div>
          </div>
        </>
      ) : (
        <>
          {markers.map((item, i) => (
            <div
              className="container-xxl  container-xl container-lg container-md detail-container"
              key={i}
            >
              <div className="row mt-5 ms-3 me-3 detail-mg p-3 rounded-3">
                <div className="col-md-6 p-0">
                  <Carousel showThumbs={false} infiniteLoop={true}>
                    {item.thumbnail.split(",").map((element, i) => (
                      <div key={i}>
                        <img
                          alt={item.mediaownercompanyname}
                          src={
                            element.startsWith("https")
                              ? element
                              : `https://${item.mediaownercompanyname
                                  .trim()
                                  .split(" ")
                                  .slice(0, 2)
                                  .join("_")
                                  .toLowerCase()}.odoads.com/media/${item.mediaownercompanyname
                                  .trim()
                                  .split(" ")
                                  .slice(0, 2)
                                  .join("_")
                                  .toLowerCase()}/media/images/new${element}`
                          }
                          onError={(e) =>
                            (e.target.src = "../../clientslogo/alter-img.png")
                          }
                          className="rounded-3 detail-img"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className="col-md-6 p-3  ps-4 rounded-3 text-dark">
                  <h5 className=" text-uppercase"> {item.subcategory}</h5>
                  <h2>{item.medianame}</h2>
                  <p>Code : {item.code}</p>
                  <div className="row my-3">
                    <div className="col-4">
                      <h6>Media</h6>
                      <h6 className="fw-bold">{item.subcategory}/Hoarding</h6>
                    </div>
                    <div className="col-4 ">
                      <h6>Size</h6>
                      <h6 className="fw-bold">
                        {item.height}x{item.width} {item.widthunit}
                      </h6>
                    </div>
                    <div className="col-4">
                      <h6>Illumination</h6>
                      <h6 className="fw-bold">
                        {item.illumination ? (
                          item.illumination
                        ) : (
                          <span className="text-muted">No Data</span>
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-8">
                      <h6>FTF</h6>
                      <h6 className="fw-bold">{item.location}</h6>
                    </div>
                    <div className="col-4">
                      <h6>Total Area</h6>
                      <h6 className="fw-bold">
                        {item.height * item.width} Sq. Ft.{" "}
                      </h6>
                    </div>
                  </div>
                  <p>
                    The hoarding is placed in prime loaction. It is visible from
                    all the <br />
                    crossing roads covering maximum views.
                  </p>
                  <div className="row p-0">
                    <div className=" col-6 position-relative">
                      {!localStorage.getItem("true") ? (
                        <span
                          className="bottom-0 position-absolute text-decoration-underline view"
                          onClick={locatetologin}
                        >
                          View Price
                        </span>
                      ) : (
                        <span className="bottom-0 position-absolute view">
                          Price: {parseInt(item.price / 30)}{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-2">
                      <div
                        className="location p-2 text-center rounded"
                        onClick={mapData}
                      >
                        <MdLocationPin
                          className="icon-clr"
                          id="detail-map-location"
                        />
                      </div>
                    </div>
                    <div className="col-4" id="detail-Map">
                      {item.isDelete === 0 ? (
                        <div className="cart-btn text-center p-2 rounded me-2">
                          <h6
                            className=" mt-2 fw-bold "
                            onClick={() => removefroCart(item)}
                          >
                            {" "}
                            Remove
                          </h6>
                        </div>
                      ) : (
                        <div className="cart-btn text-center p-2 rounded me-2">
                          <h6
                            className="fw-bold mt-2"
                            onClick={() => addonCart(item)}
                          >
                            Add to Cart
                          </h6>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* map section */}
              <div className="py-5 ">
                <h3 className="ms-3 fw-bold">
                  Media Location:{" "}
                  <span className="text-muted fw-normal">{item.location} </span>
                </h3>
                <div className="detail-map  p-3 rounded-3 ms-3 me-3">
                  <iframe
                    src={
                      "https://maps.google.com/maps?q=" +
                      item.latitude +
                      "," +
                      item.longitude +
                      "&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    }
                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.203386323958!2d77.31864131492027!3d28.59367469258985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f0a89ce605%3A0xfd09bf1f744de96f!2sGohoardings!5e0!3m2!1sen!2sin!4v1667808584343!5m2!1sen!2sin"
                    className="map_sectionD rounded"
                    allowFullScreen={true}
                    loading="lazy"
                    title="google-map"
                  ></iframe>
                </div>
              </div>

              {/* form section */}
              <div className="detail-form p-3 rounded-3 my-5 ">
                <>
                  <h1 className="txt-clr-tlk fw-bold">
                    Get a Free Consultation!
                  </h1>
                  <h5 className="txt-clr">*Please fill all the details.</h5>
                  <form className='mt-4 "position-relative' onSubmit={onSubmit}>
                    <div className="form-group py-3 ">
                      <label htmlFor="formGroupExampleInput">Name*</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control ps-0 rounded-0"
                        id="formGroupExampleInput"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      {error == true && name === "" ? (
                        <small className="p-0 text-danger text-small ">
                          Please enter your name
                        </small>
                      ) : (
                        <> </>
                      )}
                    </div>
                    <div className="row py-3">
                      <div className="col">
                        <label htmlFor="Last-name">Email*</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control ps-0 rounded-0"
                          placeholder="Your Mail ID"
                          id="first-name"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <p className="error-msg">
                          {" "}
                          {error == true && !emailformate.test(email) ? (
                            <small className="p-0 p-0 text-danger text-small  ">
                              Type your email corectly
                            </small>
                          ) : (
                            <> </>
                          )}{" "}
                        </p>
                      </div>
                      <div className="col">
                        <label htmlFor="Last-name">Phone phone*</label>
                        <input
                          autoComplete="off"
                          type="phone"
                          className="form-control ps-0 rounded-0"
                          placeholder="+1 012 3456 789"
                          id="+1 012 3456 789"
                          value={phone}
                          onChange={(e) => setNumber(e.target.value)}
                        />
                        {error == true && phone.length !== 10 ? (
                          <small className="p-0 text-danger text-small  ">
                            Type your 10 digit phone corectly
                          </small>
                        ) : (
                          <> </>
                        )}
                      </div>
                    </div>
                    <div className="form-group py-3">
                      <label htmlFor="formGroupExampleInput2">Message*</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control ps-0 rounded-0"
                        id="formGroupExampleInput2"
                        placeholder="Write your message.."
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      />
                      {error == true && message === "" ? (
                        <small className="p-0 text-danger text-small  p-0 ">
                          Please enter your message for our team
                        </small>
                      ) : (
                        <> </>
                      )}
                    </div>
                    <div className=" p-0 m-0  pb-5">
                      <button
                        type="submit"
                        className="btn btn-lg  message-btn  float-end"
                        role="button"
                      >
                        Send Message
                      </button>
                      <ToastContainer />
                    </div>
                  </form>
                </>
              </div>
            </div>
          ))}
        </>
      )}
      <style jsx>
        {`
    .detail-container {
      margin-top: 6%;
    }   
      h2 {
        font-size: 2.1rem;
      }
      h3 {
        color: #4f4a4c;
        font-size: 1.7rem;
      }
      h5 {
        font-size: 1.1rem;
        color: #4f4a4c;
      }
      h6 {
        color: #373435;
        font-size: 1rem;
      }
      p,
      span {
        color: #373435;
      }
     
    
      .detail-mg {
        background-color: #fdfdfd;
        box-shadow: rgba(98, 98, 105, 0.2) 0px 7px 29px 0px;
      }
   
    
      .detail-img {
        height: 390px;
        width: 605px !important;
      }
    
      .view {
        cursor: pointer;
        font-weight: bold;
      }
      .view:hover {
        color: black;
      }
      .location {
        background-color: #e8e8e8;
        cursor: pointer;}

        #detail-map-location {
          height: 36px;
          width: 36px;
        }
      
      .cart-btn {
        background-color: #fff212;
        cursor: pointer;
        color: #3d3933;
      }
      .detail-map {
        background-color: #fdfdfd;

        box-shadow: rgba(98, 98, 105, 0.2) 0px 7px 29px 0px;
      }
        .map_sectionD {
          height: 60vh;
          width: 100%;
        }
      
    
      .detail-form {
        background-color: #fdfdfd;
        box-shadow: rgba(98, 98, 105, 0.2) 0px 7px 29px 0px;
      }
        .txt-clr-tlk {
          color: #373435;
          font-size: 2.2rem;
        }
        .txt-clr {
          color: #373435;
        }
        .form-control {
          border: none !important;
          border-bottom: 1px solid #b5b4b4 !important;
        }
        label {
          color: #6c757d !important;
          font-size: 0.9rem;
        }
      
        .message-btn {
          background-color: #373435;
          color: rgb(237, 237, 237);
          font-size: 1rem;
          border-radius: 4px !important;
        }
        .message-btn:hover {
          background-color: #4a494a;
          color: rgb(237, 237, 237);
        }
      
      @media screen and (max-width: 1366px) {
        h2 {
          font-size: 1.9rem;
        }
        h3 {
          color: #4f4a4c;
          font-size: 1.5rem;
        }
        h5 {
          font-size: 1rem;
          color: #4f4a4c;
        }
        h6 {
          color: #373435;
          font-size: 0.9rem;
        }
    
        .detail-img {
          height: 370px;
          width: 585px !important;
        }
        .map_sectionD {
          height: 55vh;
        }
      }
    
      @media screen and (max-width: 1024px) {
        h2 {
          font-size: 1.7rem;
        }
        h3 {
          color: #4f4a4c;
          font-size: 1.3rem;
        }
        h5 {
          font-size: 0.9rem;
          color: #4f4a4c;
        }
        h6 {
          color: #373435;
          font-size: 0.8rem;
        }
    
        .detail-img {
          height: 375px;
          width: 550px !important;
        }
        .map_sectionD {
          height: 45vh;
        }
    `}
      </style>
    </>
  );
};

export default Details;
