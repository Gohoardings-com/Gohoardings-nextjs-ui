import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
// import { AccountContext } from "../../apis/apicontext";
import { AccountContext } from "@/allApi/apicontext";
import { Dropdown } from "react-bootstrap";
// import "react-calendar/dist/Calendar.css";
import { Link } from "next/link";
import navigation  from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa"; 
// import "./cart.scss";
import instance from "@/allApi/axios";
import Fixednavbar from "../../components/navbar/fixednavbar";
import { toast, ToastContainer } from "react-toastify";
 import { cartitems, mediawithcity, removeItem, userDetails } from "@/redux/adminAction";
import Loader from "@/components/loader";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

const Cart = () => {
  const dispatch = useDispatch();
  const [Start, setStart] = useState(new Date());
  const { items, loading } = useSelector((state) => state.cart);
  let defaultEndDate = new Date(new Date().setDate(Start.getDate() + 4));
  const [End, setEnd] = useState(defaultEndDate);
  const { addRemove, initalState } = useContext(AccountContext);
  const [posts, setPosts] = useState([]);
  const [price, setPrice] = useState();
  const [daymsg, setDayMsg] = useState(false);
  const [inputDay, setInputDay] = useState(5);
  const [campainName, setCampains] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      key: "selection",
    },
  ]);

  useEffect(() => {
    topFunction();
    dispatch(cartitems());
  }, []);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // const setDays = async () => {
  //   const data = [...items];
  //   data.map((obj, i) => {
  //     obj["days"] = 5;
  //     obj["startDate"] = Start;
  //     obj["endDate"] = End;
  //   });

  //   setPosts(data);
  // };
  // useEffect(() => {
  //   setDays();
  // }, []);

  const SelectDate = (obj) => {
    var diff = state[0].endDate - state[0].startDate;
    let daysdifference = diff / (1000 * 60 * 60 * 24) + 1;
    if (daysdifference >= 5) {
      posts.map((product) => {
        if (product.id == obj.id) {
          setDayMsg(false);
          obj.days = daysdifference;
          setInputDay(obj.days);
          obj.startDate = state[0].startDate;
          obj.endDate = state[0].endDate;
          setPosts(posts);
        }
      });
    } else {
      setDayMsg(true);
    }
  };


  const removefroCart = async (obj) => {
    await dispatch(removeItem(obj.code));
    addRemove({ type: "DECR" });
    const pricese = obj.price * obj.days;
    const withGST = (pricese * 18) / 100;
    const heloo = pricese + withGST;
    const finalStep = parseInt(price - heloo);
    setPrice(finalStep);
    removeCart(obj);
  };

  const removeCart = async (event) => {
    let data = [...posts];
    data.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 1;
      }

      const result = data.filter((word) => word.isDelete === 0);
      setPosts(result);
    });
  };

 
let products = [];
const submitAllProduct = async () => {
  posts.map((el) => {
    products.push({
      code: el.code,
      city_name: el.city_name,
      medianame: el.medianame,
      category_name: el.category_name,
      address: el.address,
      start_date: addDays(el.startDate, 1),
      end_date: addDays(el.endDate, 1),
    });
  });
  const { data } = await instance.post("cart/processdCart", {
    products: products,
    campainName: campainName,
  });
  if (data.success == true) {
    addRemove({ type: "DECR" });
    dispatch(cartitems());
    setPosts([]);
    toast(data.message);
    topFunction();
    setCampains("");
    dispatch(
      mediawithcity({
        category_name: "traditional-ooh-media",
        city_name: "delhi",
        limit:0,
      })
    );
  } else {
    toast(data.message);
  }
};

  const cartItemprice = posts.reduce(
    (totalPrice, item) => totalPrice + parseInt(item.price * item.days),
    0
  );

  return (
    <>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      <div className={`container-xxl  container-xl container-lg container-md  cart-content`}>
        <div className="row mt-4 ">
          {loading ? (
            <>
              <div className=" container ">
                <div className="row  text-center my-3">
                  <Loader />
                </div>
              </div>
            </>
          ) : (
            <>
              {posts.length > 0 ? (
                <>
                  <>
                    <div className=" ">
                      <div className="row">
                        <div className="col-9 ">
                          <h5 className=" p-2 ps-3 news-headings rounded-2 ">
                            Total Items:{" "}
                            <span className=" ms-1">
                              {initalState < 10 ? (
                                <>0{initalState} </>
                              ) : (
                                initalState
                              )}
                            </span>
                          </h5>
                          {posts.map((obj, i) => (
                            <div
                              className="d-flex  maincard my-md-3 p-1"
                              key={i}
                            >
                              <div className="col-md-4 pe-0 me-0 ">
                              {/* <Link
                        to={`/services/${obj.category_name}/${obj.meta_title}`}
                        className="text-decoration-none"
                      > */}
                                <img
                                  src={
                                    obj.thumb.startsWith("https")
                                      ? obj.thumb
                                      : `https://${obj.mediaownercompanyname
                                          .trim()
                                          .split(" ")
                                          .slice(0, 2)
                                          .join("_")
                                          .toLowerCase()}.odoads.com/media/${obj.mediaownercompanyname
                                          .trim()
                                          .split(" ")
                                          .slice(0, 2)
                                          .join("_")
                                          .toLowerCase()}/media/images/new${
                                          obj.thumb
                                        }`
                                  }
                                  onError={(e) =>
                                    (e.target.src =
                                      "../../images/all_image/alter-img.png")
                                  }
                                  className="img-fluid w-100 rounded-2  m-2 cart-media-img"
                                  alt={obj.mediaownercompanyname}
                                />
                                {/* </Link> */}
                              </div>
                              <div className="col-md-8 ms-0  ">
                                <div className="card-body ps-md-4">
                     
                                  <h4 className="card-title  pt-1 ">
                                  {/* <Link
                        to={`/services/${obj.category_name}/${obj.meta_title}`}
                        className="text-decoration-none"
                      > */}
                                  <span className="text-dark">{obj.illumination} - {obj.medianame} </span>  
                                    {/* </Link> */}
                                    <span
                                      className="float-end"
                                      onClick={() => removefroCart(obj)}
                                    >
                                      <RiDeleteBinLine className="delet-icon" />
                                    </span>
                                  </h4>

                                  <div className="row mt-3">
                                    <div className="col-xl-2 col-lg-3">
                                      <h6>Monthly</h6>
                                      <h6 className="">
                                        {" "}
                                        <FaRupeeSign className="rupees-logo " />
                                        {parseInt((obj.price * 11) / 10)}
                                      </h6>
                                    </div>
                                    <div className="col-xl-2 col-lg-3">
                                      <h6>Per Day</h6>
                                      <h6 className="">
                                        <FaRupeeSign className="rupees-logo " />
                                        {parseInt(((obj.price / 30) * 11) / 10)}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="row my-2 date-select-section">
                                    <div className="col-4">
                                      <h6 className="des">Calender</h6>
                                      <h6 className="">
                                        <div
                                          type="text "
                                          className="input-1 d-flex bg-light"
                                        >
                                          <Dropdown
                                            className="p-0 border-0"
                                            onClick={() => SelectDate(obj)}
                                          >
                                            <Dropdown.Toggle
                                              variant="transparent"
                                              id="dropdown-basic"
                                              className="p-0 m-0 border-0"
                                            >
                                              <FaCalendarAlt className="calender-logo  mb-1  icon-clr" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <DateRange
                                                editableDateInputs={true}
                                                minDate={new Date()}
                                                onChange={(item) =>
                                                  setState([item.selection])
                                                }
                                                moveRangeOnFirstSelection={
                                                  false
                                                }
                                                rangeColors={["#f1e615"]}
                                                ranges={state}
                                              />
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </div>
                                      </h6>
                                    </div>

                                    <div className="col">
                                      <h6 className="des">Total Days</h6>
                                      <h6 className="">
                                        <input
                                        className="input-2"
                                          value={obj.days}
                                          // type="number"
                                          // onChange={(e) =>setInputDay(e.target.value)}
                                          disabled={true}
                                        />{" "}
                                        {daymsg ? (
                                          <span
                                            className="text-danger"
                                            id="ereday"
                                          >
                                            Total days should be minimum 5
                                          </span>
                                        ) : (
                                          <></>
                                        )}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="row mt-1">
                                    <div className="col-3">
                                      <h6 className="des">Original Price</h6>
                                      <h6 className="">
                                        <span className="text-decoration-line-through  ">
                                          {" "}
                                          <FaRupeeSign className="rupees-logo" />{" "}
                                          {parseInt(
                                            (((obj.price / 30) * 11) / 10) *
                                              obj.days
                                          )}{" "}
                                        </span>
                                        <span className=" ms-2 off-text">
                                          {" "}
                                          9% off
                                        </span>
                                      </h6>
                                    </div>
                                    <div className="col-3 ">
                                      <h6 className="des">After Discount</h6>
                                      <h6 className="">
                                        <FaRupeeSign className="rupees-logo" />{" "}
                                        {parseInt((obj.price / 30) * obj.days)}{" "}
                                      </h6>
                                    </div>
                                    <div className="col-3">
                                      <h6 className="des">GST 18%</h6>
                                      <h6 className="">
                                        <FaRupeeSign className="rupees-logo" />{" "}
                                        {parseInt(
                                          ((obj.price / 30) * obj.days * 18) /
                                            100
                                        )}
                                      </h6>
                                    </div>
                                    <div className="col-3">
                                      <h6 className="des">Total</h6>
                                      <h6 className="">
                                        <FaRupeeSign className="rupees-logo" />{" "}
                                        {parseInt(
                                          ((obj.price / 30) * obj.days * 118) /
                                            100
                                        )}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="col-3 ">
                          <h5 className=" p-2 ps-3 news-headings rounded-2 ">
                            Gross Total
                          </h5>

                          <div className="p-2">
                            {posts.map((obj, i) => (
                              <div key={i}>
                                <h5 className="my-2 tag-head">
                                  {obj.illumination} - {obj.medianame}
                                </h5>

                                <div className="row  ">
                                  <div className="my-1">
                                    <span className="">Days</span>
                                    <span className="float-end tag-headd">
                                      {obj.days}
                                    </span>
                                  </div>
                                  <div className="my-1">
                                    <span className="">Price</span>
                                    <span className="float-end tag-headd">
                                      <FaRupeeSign className="rupees-logo" />{" "}
                                      {parseInt(
                                        ((obj.price / 30) * obj.days * 118) /
                                          100
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            ))}
                            <div className="mt-1">
                              <span className="tag-head">Total Price</span>
                              <span className="float-end tag-head">
                                {" "}
                                <FaRupeeSign className="rupees-logo" />{" "}
                                {parseInt(
                                  (cartItemprice + (cartItemprice * 18) / 100) /
                                    30
                                )}
                              </span>
                            </div>
                          </div>
                          {initalState !== 0 ? (
                            <>
                              <div className="p-0">
                    
                                <span className="">
                                  <button
                                    className="rounded-1 chek-avl-btn "
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <h5 className=" mt-1">
                                      Check Availability
                                    </h5>
                                  </button>
                                  <ToastContainer />
                                </span>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body pb-0 text-center">

                        <img src="../images/all_image/celebration.png" className="celebration-logo w-50 h-50" alt="celebration"/>


                          <h5 className="mt-2 fw-bold">
                            Thank you for being a part of gohoardings family.
                            Our team will be pleased to serve you the best.
                          </h5 >

                       
                        </div>
                        <div className="p-3">
                          <div className="d-flex my-2">
                            {/* <label>Give a name of your Campaign</label> */}
                            <input
                              type="text"
                              pattern="/^[A-Za-z]+$/"
                              placeholder="Give a name of your Campaign"
                              className="form-control w-100 text-center"
                              onChange={(e) => setCampains(e.target.value)}
                            />
                          </div>
                          {campainName.length >= 2 ? (
                            <button
                              type="button"
                              className="btn continue w-100 me-1"
                         
                              onClick={submitAllProduct}
                            >
                              Done
                            </button>
                          ) : (
                            <button
                              type="button"
                              id="fgb"
                              className="btn continue w-100 me-1"
                            >
                              Done
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" container  text-center cart-container">
                    <div className="  my-3">
                      <img
                        alt="empty-cart"
                        src="../images/all_image/empty-cart.gif"
                        className="empty-cart text-center"
                      />
                      <h2 className="empty-cart-text"> Your Cart is empty</h2>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <style jsx>
        {
          `
          
.cart-content {
  margin-top: 85px;
  margin-bottom: 65px;
}

.continue{
  border: none !important;
  width: 200px  ;
  font-size: 17px !important;
  font-weight: 600 !important;
  color: rgb(48, 47, 47) !important;
  background-color: #FFF323 !important;
  text-transform: uppercase;
  padding: 5px 20px !important;
}
.cart-media-img {
  height: 230px !important;
}

.delet-icon {
  font-size: 23px;
  cursor: pointer;
  transition: 0.7s;
  color: #c8c7c7;
}

.card-title {
  font-size: 19px;
}
#fgb{
  cursor: not-allowed;
  
  
}
.card-text {
  font-size: 14px;
}
// #exampleModal{
//   .form-control{
//     box-shadow: none;
//   }
//   .form-control:focus {
//     border: 1px solid #f0e512f1;
//   }
 
// }
.maincard {
  box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 2px 0px !important;
  border: none !important ;
}
.maincard:hover{
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px !important;
  border-radius: 6px;
}

.maincard:hover .delet-icon{
  color:#808080 !important;
  transform: scale(1.1) ;
}

.chek-avl-btn {
  border: none;
  width: 100% !important ;


  color: rgb(48, 47, 47) !important;
  background-color: #FFF323;
  padding: 5px 25px;
}
  h5 {
    font-size: 17px;
    font-weight: 600;
  }


.news-headings {
  color: black;
  font-size: 1.6rem;
  font-weight: 600;
  background-color: #e1e1e1;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
#ereday{
  font-size: 12px;
}

.des {
  color: #666464;
}
.tag-headd {
  color: black;
  font-size: 1.1rem;
  font-weight: 600;
}
.tag-head {
  color: black;
  font-size: 1.1rem;
  font-weight: 600;
}

  .input-2 {
    // box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    //   rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 3px;
    width: 70px !important;
    font-size: 16px !important ;
    border: none;
    font-weight: bold;
    text-align: center;
    height: 35px;
  }
  .input-1 {
    // box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    //   rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 3px;
    width: 70px !important;
    font-size: 7px !important ;
    padding-top: 2%;
    height: 35px;
  }
  .calender-logos {
    font-size: 25px !important ;
    color: #7d7c7c;
  }

  .calender-logo {
    font-size: 25px !important ;
    margin-left: 24px;
    margin-right:24px ;
    color: #5f5f61;
  }
  // .dropdown-toggle::after {
  //   display: none;
  // }

.total-container {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border: none;
  background-color: #f7f7f7;
}
  h2 {
    color: black;
    font-size: 1.6rem;
    font-weight: 600;
  }


  .empty-cart {
    height: 200px;
    width: auto;
  }
  .empty-cart-text {
    color: #798ba1;
    font-size: 1.5rem;
  }


@media screen and (max-width: 1366px) {
 
    .empty-cart {
      height: 190px;
    }
    .empty-cart-text {
      font-size: 1.3rem;
    }
  
  .button-section {
    margin-top: 15px !important;
  }
  .card-title {
    font-size: 18px;
  }
  .card-text-price {
    font-size: 12px;
  }
  .card-text {
    font-size: 12px;
  }
  .cart-media-img {
    height: 220px !important;
  }
  .quantitey {
    margin-left: 4px;
    height: 15px;
    width: 15px;
  }

  .delet-icon {
    font-size: 17px;
  }
}
@media screen and (max-width: 1024px) {
  .news-headings {
    font-size: 1.3rem;
  }
 
    h2 {
      font-size: 1.3rem;
    }
    .tag-headd {
      font-size: 1rem;
    }
    .tag-head {
      font-size: 1rem;
    }
  

    input {
      width: 70px !important;
      font-size: 13px !important ;
      height: 30px;
    }
    .input-1 {
      width: 150px !important;

      height: 30px;
    }
    .calender-logos {
      font-size: 16px !important ;
    }

    .calender-logo {
      font-size: 16px !important ;
    }
  
 
    .empty-cart {
      height: 160px;
    }
    .empty-cart-text {
      font-size: 1.1rem;
    
  }


  .quantitey {
    font-size: medium;
  }
  .card-title {
    font-size: 17px;
  }
  .card-text {
    font-size: 12px;
  }
  .des{
    font-size: 13px;
  }
  .off-text {
    font-size: 6px !important;
  }
  
}

.rupees-logo {
  font-size: 12px;
  margin-bottom: 2px !important;
}

.off-text {
  color: #388e3c;
  font-size: small;
}

          
          `
        }
      </style>
    </>
  );
};
export default Cart;
