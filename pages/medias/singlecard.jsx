import React from "react";
import "./media.scss";
import VariantsExample from "../../components/loading/loading";
import { MdLocationPin } from "react-icons/md";
import { Link } from "next/link";

const Singlecard = ({
  slice,
  loading,
  addonCart,
  removefroCart,
  locatetologin,
  mapData,
}) => {
  return (
    <>
      {loading ? (
        <>
          <div className=" container ">
            <div className="row  text-center ">
              <VariantsExample />
            </div>
          </div>
        </>
      ) : (
        <>
          {slice.length == 0 ? (
            <div className="container">
              <div className="no-data row  text-center my-3">
                <img src="../../clientslogo/no-data.png" className="" alt="no-data" />
              </div>
            </div>
          ) : (
            <>
              {slice.map((item, i) => (
                <div className="row mt-3 ms-3 me-3 detail-mg p-3 rounded-3 single-card-container ">
                  <div className="col-md-4 p-0">
                    {item.thumb.split(",").map((i) => (
                      <div key={i}>
                        <Link
                          to={`/services/${item.category_name}/${item.meta_title}`}
                          className="text-decoration-none"
                        >
                          <img
                          alt={item.mediaownercompanyname}
                            className="img-responsive-media rounded"
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
                                    .toLowerCase()}/media/images/new${
                                    item.thumb
                                  }`
                            }
                            onError={(e) =>
                              (e.target.src = "../../clientslogo/alter-img.png")
                            }
                          />
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="col-md-8   ps-4   rounded-3 text-dark">
                    <Link
                      to={`/services/${item.category_name}/${item.meta_title}`}
                      className="text-decoration-none"
                    >
                      <h2>
                        {item.subcategory}-{item.medianame}
                      </h2>
                    </Link>
                    <p>Code : {item.code}</p>
                    <div className="row my-2">
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
                    <div className="row my-1">
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
                        {" "}
                        <div
                          className="location p-2 text-center rounded"
                          onClick={(e,i) => mapData(item.meta_title,item.category_name)}
                        >
                        <MdLocationPin
                            className="icon-clr"
                            id="detail-map-location"
                        
                          />
                        </div>
                      </div>
                      <div className="col-4" id="detail-Map">
                        {item.isDelete === 0 ? (
                          <div
                            className="cart-btn text-center p-2 rounded me-2"
                            onClick={(e) => removefroCart(item)}
                          >
                            <h6 className=" mt-2 fw-bold "> Remove</h6>
                          </div>
                        ) : (
                          <div
                            className="cart-btn text-center p-2 rounded me-2"
                            onClick={(e) => addonCart(item)}
                          >
                            <h6 className="fw-bold mt-2">Add to Cart</h6>
                          </div>
                        )}
                      </div>
                    </div>
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

export default Singlecard;
