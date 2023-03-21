import React from "react";
import { TfiEye } from "react-icons/tfi";
// import VariantsExample from "../../components/loading/loading";
import { Link } from "next/link";
import {
  MdLocalOffer,
} from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";


const Multicard = ({
  slice,
  loading,
  addonCart,
  removefroCart,
}) => {
  return (

    <>
      {loading ? (
        <>
          <div className=" container ">
            <div className="row  text-center ">
              {/* <VariantsExample /> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {slice.length == 0 ? (
            <div className="container">
              <div className="no-data row  text-center my-3">
                <img src="../../clientslogo/no-data.png" alt="No Data" className="" />
              
              </div>
            </div>
          ) : (
            <>
              {slice.map((item, i) => (
                <div className="project   mt-4" key={i}>
                  <div className="img-responsive  figure">
                  <Link
                      to={`/services/${item.category_name}/${item.meta_title}`}
                      className="text-decoration-none"
                    >
                    <img
                      className="img-responsive-media rounded-top"
                      alt={item.mediaownercompanyname}
                      src={
                        item.thumb.startsWith("https")
                          ? item.thumb
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
                              .toLowerCase()}/media/images/new${item.thumb}`
                      }
                      onError={(e) =>
                        (e.target.src = "../../images/all_Image/alter-img.png")
                      }
                    />
                       </Link>
                  
               
                    <figcaption className="rounded-top">
                      <Link
                        to={`/services/${item.category_name}/${item.meta_title}`}
                        className="text-decoration-none"
                      >
                        <span className="project-details">
                        {item.subcategory} at{" "}
                          {item.medianame.substring(0,12).split(",") }
                          
                        </span>
                      </Link>
                      <span className="project-creator mt-2 ms-0 ">
                        <HiOutlineCurrencyRupee className="rupees-logo icon-clr" />{" "}
                        Price {""}
                        <span className="text-muted text-decoration-line-through">
                          {" "}
                          {parseInt(((item.price * 11) / 10)/30)}{" "}
                        </span>
                        <span className=" ms-2 off-text"> 9% off</span>
                      </span>
                      <span className="project-creator mt-2 ms-0">
                        <MdLocalOffer className="offer-logo icon-clr" /> Offer{" "}
                        {""}
                        {parseInt((item.price)/30)}
                      </span>

                      <span className="project-price">
                        {item.isDelete === 0 ? (
                          <img
                          alt="check"
                            src="../../clientslogo/A-chek.png"
                            onClick={() => removefroCart(item)}
                            className="addonCart icon-clr  "
                          />
                        ) : (
                          <img
                          alt="cart-icon"
                            src="../../clientslogo/A-cart.png"
                            onClick={() => addonCart(item)}
                            className="addonCart icon-clr "
                          />
                        )}
                      </span>
                    </figcaption>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
   
   
    </>
  );
};

export default Multicard;
