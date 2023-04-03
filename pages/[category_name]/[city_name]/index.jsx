import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "@/allApi/apicontext";
import {
  mediaFilters,
  mediawithcity,
  mediawithlocation,
} from "@/redux/adminAction";
import { useDispatch, useSelector } from "react-redux";
import OverView from "./overView";
import { useRouter } from "next/router";
import styles from "../../../styles/media.module.scss";
import { MdLocationPin } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { CityNameImage, Less, mediaDataApi, More } from "../../../allApi/apis";
import { addItem, removeItem, singlemnedia } from "@/redux/adminAction";
import Fixednavbar from "@/components/navbar/fixednavbar";
import Medialogo from "@/components/mediaBranding";
import Singlecard from "./single";
import Multicard from "./multicard";

import { MdOutlineShoppingCart } from "react-icons/md";

const Media = () => {
  const dispatch = useDispatch();

  const { search, loading } = useSelector((state) => state.search);
  const router = useRouter();
  const { handleClose,handleShow} = useContext(AccountContext);
  const { category_name, city_name } = router.query;
  const { addRemove } = useContext(AccountContext);
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState(true);
  const [overview, setOverview] = useState(false);
  const [multicard, setMulticard] = useState(true);
  const [noOfLogo, setnoOfLogo] = useState(9);
  const [posts, setPosts] = useState([]);
  const [mediaData, setMediadata] = useState([]);
  const [singlemedia, setsingleMedia] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [locationData, setlocationData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [locationCkheckbox, setLocationCkheckbox] = useState([]);

  let slice;
  if (!loading) {
    slice = search.slice(0, noOfLogo);
  }

  const view = () => {
    setMulticard(!multicard);
  };

  const addonCart = async (e) => {
    // if (!localStorage.getItem(true)) {
    //   window.localStorage.setItem("locate", `/${category_name}/${city_name}`);
    //  handleShow()
    // } else {
      addRemove({ type: "INCR" });
      dispatch(addItem(e.code, e.category_name));
      addRemove({ type: "INCR" });
      add(e);
    // }
  };

  const locatetologin = async () => {
    window.localStorage.setItem("locate", `/${category_name}/${city_name}`);
    router.push("/login");
  };
  const removefroCart = async (obj) => {
    dispatch(removeItem(obj.code));
    addRemove({ type: "DECR" });
    remove(obj);
  };

  const add = (event) => {
    let data = [...search];
    data.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 0;
      }
      setPosts(data);
    });
  };

  const remove = (event) => {
    let data = [...search];
    data.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 1;
      }
      setPosts(data);
    });
  };

  const toggle = () => {
    setListings(!listings);
    setOverview(!overview);
  };
  const getCardData = async () => {
    dispatch(mediawithcity(category_name, city_name, noOfLogo));
  };

  useEffect(() => {
    getCardData();
    apiforfillters();
  }, [category_name, city_name]);

  const apiforfillters = async () => {
    const data = await mediaDataApi(category_name, city_name);

    data.map((obj, i) => {
      obj["select"] = false;
    });


    let uniqueData = data.filter((obj, index, self) => {
      return index === self.findIndex((t) => t.location === obj.location);
    });

    setMediadata(uniqueData);
    setlocationData(uniqueData);
    setcategoryData(uniqueData);
  };

  let category;
  const allSubcategory = categoryData.map((category) => category.subcategory);
  category = [...new Set(allSubcategory)];

  let filtered = mediaData.filter(function (el) {
    if (el.illumination != "") {
      return el.illumination;
    }
  });

  let ILLUMINATION;
  const allIllumations = filtered.map((illumation) => illumation.illumination);
  ILLUMINATION = [...new Set(allIllumations)];

  function categoryFilter(cate) {
    category.forEach((el) => {
      if (el === cate && categoryArray.indexOf(el) > -1) {
        categoryArray.splice(categoryArray.indexOf(el), 1);
        setCategoryArray(categoryArray);
      } else if (el === cate && !categoryArray.indexOf(el) > -1) {
        categoryArray.push(cate);
        setCategoryArray(categoryArray);
      }
    });
    dispatch(
      mediaFilters(
        category_name,
        singlemedia,
        categoryArray,
        city_name,
        locationCkheckbox
      )
    );
  }

  const locationFilter = (loca) => {
    locationData.map((data, i) => {
      if (data.id == loca.id) {
        data.select = true;
        setlocationData(locationData);
      }
      if (data.id !== loca.id) {
        data.select = false;
        setlocationData(locationData);
      }
    });

    dispatch(
      mediawithlocation(category_name, city_name, loca.location, noOfLogo)
    );
  };
   
  function mediaTypeFilter(cate) {
    ILLUMINATION.forEach((el) => {
      if (el === cate && singlemedia.indexOf(el) > -1) {
        singlemedia.splice(singlemedia.indexOf(el), 1);
        setsingleMedia(singlemedia);
      } else if (el === cate && !singlemedia.indexOf(el) > -1) {
        singlemedia.push(cate);
        setsingleMedia(singlemedia);
      }
    });
    dispatch(
      mediaFilters(
        category_name,
        singlemedia,
        categoryArray,
        city_name,
        locationCkheckbox
      )
    );
  }

  return (
    <>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      <Medialogo category_name={category_name} city_name={city_name} />
      <div className=" container-xxl  container-xl container-lg container-md  mt-4 mb-5 p-0 media-con rounded">
        <div className={`mt-md-5 pt-md-3  list ${styles.media_choice} d-flex`}>
          <h2 aria-expanded={listings} onClick={toggle}>
            Listings
          </h2>
          <h2 aria-expanded={overview} onClick={toggle}>
            Overview
          </h2>
        </div>

        {overview ? (
          <OverView category_name={category_name} city_name={city_name} />
        ) : (
          <div className="row my-2 my-md-5 pt-md-3 medias">
            <div className="col-md-2  " id={styles.hide_fltr}>
              <div className={`${styles.filter_container}rounded`}>
                <div className={`col ${styles.sub_category_search} ms-3 pt-4`}>
                  <h6>
                    Location <span>({locationData.length})</span>
                  </h6>

                  <div className="pe-4 mb-2 pt-1">
                    <input
                      type="search"
                      placeholder="Search Hoarding Type"
                      // id="ddd"
                      className="form-control border-none rounded-2"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <div className={`${styles.rowCheck} row`}>
                    <ul>
                      {locationData
                        .filter((obj) => {
                          if (query == "") {
                            return obj.location;
                          } else if (
                            obj.location
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          ) {
                            return obj.location;
                          }
                        })
                        .map((loca, i) => (
                          <div
                            className={`m-0  ${styles.loc_select}`}
                            aria-expanded={loca.select}
                            id={i}
                            key={i}
                          >
                            <span
                              htmlFor={loca.location}
                              onClick={(e) => locationFilter(loca)}
                            >
                              {loca.location.substring(0, 16)}
                            </span>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className={`col ${styles.sub_category_search} ms-3  my-3`}>
                  <h6>
                    Sub Category<span>({category.length})</span>
                  </h6>

                  <div className={`${styles.rowCheck} row`}>
                    <ul>
                      {category.map((cate, i) => (
                        <div className="m-0 p-0" key={i}>
                          <input
                            type="checkbox"
                            id={cate}
                            name={cate}
                            className="me-1"
                            value={cate}
                            onChange={(e) => categoryFilter(cate)}
                          />

                          <label
                            className={
                              styles.media_filter_text_card_detail_filt
                            }
                            htmlFor={cate}
                          >
                            {cate.substring(0, 13)}
                          </label>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`col ${styles.sub_category_search} ms-3  my-1`}>
                  <h6>
                    Media Type <span>({ILLUMINATION.length})</span>
                  </h6>

                  <div className={`${styles.rowCheck} row`}>
                    <ul className="text-decoration-none">
                      {ILLUMINATION.map((item, i) => (
                        <li className=" " id={styles.marker} key={i}>
                          <input
                            className="me-1"
                            type="checkbox"
                            id={item}
                            name={item}
                            value={item}
                            onChange={(e) => mediaTypeFilter(item)}
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseT2"
                            aria-expanded="false"
                            aria-controls="collapseT2"
                          />

                          <label
                            className={
                              styles.media_filter_text_card_detail_filt
                            }
                            htmlFor={item}
                          >
                            {" "}
                            {item}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-md-10 ">
              <div className={`${styles.multi_card_contaier} row`}>
                {CityNameImage.map((el, i) => {
                  if (category_name === el.value) {
                    return (
                      <div
                        key={i}
                        className={` p-3 ${styles.header_btn}  ms-3 `}
                      >
                        {`${el.label} in ${
                          city_name.charAt(0).toUpperCase() + city_name.slice(1)
                        }`}

                        <span className="float-end ">
                          {multicard ? (
                            <CiGrid2H
                              className={`${styles.media_location_logo_map} icon-clr`}
                              onClick={view}
                            />
                          ) : (
                            <BsGrid
                              className={`${styles.media_location_logo_map} icon-clr`}
                              onClick={view}
                            />
                          )}
                        </span>

                        <span className="float-end me-2">
                          <MdLocationPin
                            className={`${styles.media_location_logo_map} icon-clr`}
                          />
                        </span>
                      </div>
                    );
                  }
                })}

                {multicard ? (
                  <Multicard
                    MdOutlineShoppingCart={MdOutlineShoppingCart}
                    slice={slice}
                    search={search}
                    More={More}
                    Less={Less}
                    addonCart={addonCart}
                    loading={loading}
                    removefroCart={removefroCart}
                    add={add}
                    remove={remove}
                   
                  />
                ) : (
                  <Singlecard
                    MdOutlineShoppingCart={MdOutlineShoppingCart}
                    slice={slice}
                    loading={loading}
                    addonCart={addonCart}
                    removefroCart={removefroCart}
                  />
                )}
              </div>

              {loading ? (
                <> </>
              ) : (
                <>
                  {slice.length < 8 ? (
                    <></>
                  ) : (
                    <>
                      <div className="position-relative my-5 ">
                        <div className=" position-absolute  top-0 start-50 translate-middle ms-4">
                          {slice.length == search.length ? (
                            <> </>
                          ) : (
                            <button
                              className={`${styles.load_button} `}
                              onClick={(a, b, c) =>
                                More(setnoOfLogo, noOfLogo, search)
                              }
                            >
                              View More <MdOutlineArrowDownward className="" />
                            </button>
                          )}
                          {slice.length <= 9 ? (
                            <> </>
                          ) : (
                            <button
                              className={`${styles.load_button}  ms-5`}
                              onClick={(a, b) => Less(setnoOfLogo, noOfLogo)}
                            >
                              View Less <MdArrowUpward className="" />
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Media;
