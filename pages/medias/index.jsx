import React, { useContext, useEffect, useState } from "react";
import {
  addItem,
  mediaFilters,
  mediawithcity,
  mediawithlocation,
  removeItem,
  singlemnedia,  
} from "@/redux/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "@/allApi/apicontext";
import { Link } from "next/link";
import navigate  from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
import Multicard from "./multicard";
import Medialogo from "@/components/mediaBranding";
import { CityNameImage, Less, More, mediaDataApi } from "@/allApi/apis";
import { MdLocationPin } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import Singlecard from "./singlecard";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import OverView from "./overView";
import { useRouter } from 'next/router'

const Media = () => {
  const dispatch = useDispatch();
  const { search, loading } = useSelector((state) => state.search);
  const router = useRouter()

 const { category_name, city_name } = router.query;
  
  // const { addRemove } = useContext(AccountContext);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
 
  const [listings, setListings] = useState(true);
  const [overview, setOverview] = useState(false);
  const [noOfLogo, setnoOfLogo] = useState(9);
  const [mediaData, setMediadata] = useState([]);
  const [locationData, setlocationData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [singlemedia, setsingleMedia] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [locationCkheckbox, setLocationCkheckbox] = useState([]);

  let slice;
  if (!loading) {
    slice = search.slice(0, noOfLogo);
  }

  // const getCardData = async () => {
  //   await dispatch(mediawithcity(category_name, city_name, noOfLogo));
  // };

  const addonCart = async (e) => {
    if (!localStorage.getItem(true)) {
      window.localStorage.setItem("locate", `/${category_name}/${city_name}`);
      navigate("/login");
    } else {
      addRemove({ type: "INCR" });
      dispatch(addItem(e.code, e.category_name));
      addRemove({ type: "INCR" });
      add(e);
    }
  };

  const locatetologin = async () => {
    window.localStorage.setItem("locate", `/${category_name}/${city_name}`);
    navigate("/login");
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

  useEffect(() => {
    topFunction()
  },[])
  // useEffect(() => {
  //   getCardData();

  //   apiforfillters();
  // }, [category_name, city_name, noOfLogo]);

  const apiforfillters = async () => {
    const data = await mediaDataApi(category_name, city_name);

    data.map((obj, i) => {
      obj["select"] = false; 
    });

    let uniqueData =  data.filter((obj, index, self) => {
      return index === self.findIndex((t) => (
        t.location === obj.location
      ));
    });
  
    setMediadata(uniqueData);
    setlocationData(uniqueData);
    setcategoryData(uniqueData);
  };


  let category;
  const allSubcategory = categoryData.map((category) => category.subcategory);
  category = [...new Set(allSubcategory)];

  let ILLUMINATION;

  let filtered = mediaData.filter(function (el) {
    if (el.illumination != "") {
      return el.illumination;
    }
  });
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

  const  locationFilter = (loca) => {

locationData.map((data,i)=>{
  if(data.id==loca.id){
    data.select=true;
    setlocationData(locationData);
    
  }
  if(data.id!==loca.id){
    data.select=false;
    setlocationData(locationData);
    
  }

})

    dispatch(
      mediawithlocation(
        category_name,
        city_name,
        loca.location,
        noOfLogo
      )
    );
  }

  function topFunction() {
    document.body.scrollTop = 0; // htmlFor Safari
    document.documentElement.scrollTop = 0; // htmlFor Chrome, Firefox, IE and Opera
  }
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

  // const mapData = async (meta_title, category_name) => {
  //   dispatch(singlemnedia(meta_title, category_name)).then(() => {
  //     navigate("/map");
  //   });
  // };
  const [multicard, setMulticard] = useState(true);

  const view = () => {
    setMulticard(!multicard);
  };

  const togle = () => {
    setListings(!listings);
    setOverview(!overview);
  };

  return (
    <>
  

      <div className="d-hide drop-nd"></div>
      <Medialogo
        category_name={category_name}
        search={search}
        loading={loading}
        city_name={city_name}
      />
      <div className=" container-xxl  container-xl container-lg container-md  mt-4 mb-5 p-0 media-con rounded">
        <div className="mt-md-5 pt-md-3  list media-choice d-flex">
          <h2 aria-expanded={listings} onClick={togle}>
            Listings
          </h2>
          <h2 aria-expanded={overview} onClick={togle}>
            Overview
          </h2>
        </div>

        {overview ? (
          <OverView category_name={category_name} city_name={city_name} />
        ) : (
          <div className="row my-2 my-md-5 pt-md-3">
            <div className="col-md-2  " id="hide-fltr">
              <div className="filter-container rounded">
                <div className="col sub-category-search ms-3 pt-4 ">
                  <h6>
                    Location <span>({locationData.length})</span>
                  </h6>

                  <div className="pe-4 mb-2 pt-1">
                    <input
                      type="search"
                      placeholder="Search Hoarding Type"
                      id="ddd"
                      className="form-control border-none rounded-2"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <div className="rowCheck  row">
                    <ul>
                      {locationData
                        .filter((obj) => {
                          if (query == "") {
                            return obj.location;
                          } else if (
                            obj.location.toLowerCase().includes(query.toLowerCase())
                          ) {
                            return obj.location;
                          }
                        })
                        .map((loca, i) => (
                          <div className="m-0  loc-select" 
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

                <div className="col sub-category-search ms-3  my-3">
                  <h6>
                    Sub Category<span>({category.length})</span>
                  </h6>

                  <div className="rowCheck  row">
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
                            className="media-filter-text-card-detail-filt"
                            htmlFor={cate}
                          >
                            {cate.substring(0, 13)}
                          </label>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col sub-category-search ms-3  my-1">
                  <h6>
                    Media Type <span>({ILLUMINATION.length})</span>
                  </h6>

                  <div className="row rowCheck">
                    <ul className="text-decoration-none">
                      {ILLUMINATION.map((item, i) => (
                        <li className=" " id="marker" key={i}>
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
                            className="media-filter-text-card-detail-filt "
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
              <div className=" multi-card-contaier row    ">
                {CityNameImage.map((el, i) => {
                  if (category_name === el.value ) {
                    return (
                      <div key={i} className=" p-3  header-btn  ms-3 ">
                        {`${el.label} in ${
                          city_name.charAt(0).toUpperCase() + city_name.slice(1)
                        }`}

                        <span className="float-end ">
                        {multicard ? (
                          <CiGrid2H className="media-location-logo-map icon-clr" onClick={view}/>
                          ) : (
                            <BsGrid className="media-location-logo-map icon-clr" onClick={view}/>
                        )}
                      </span>
                        <Link to="/map">
                          <span className="float-end me-2" >
                            <MdLocationPin className="media-location-logo-map  icon-clr" />
                          </span>
                        </Link>
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
                    locatetologin={locatetologin}
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
{/* 
              {loading ? (
                <> </>
              ) : (
                <>
                  {" "}
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
                              className=" buttonload btn-hover"
                              onClick={(a,b,c) => More(setnoOfLogo, noOfLogo,search)}
                            >
                              View More{" "}
                              <MdOutlineArrowDownward className="icon-clr" />
                            </button>
                          )}
                          {slice.length <= 9 ? (
                            <> </>
                          ) : (
                            <button
                              className=" ms-5 buttonload btn-hover"
                              onClick={(a,b) => Less(setnoOfLogo, noOfLogo)}
                            >
                              View Less <MdArrowUpward className="icon-clr" />
                            </button>
                          )}
                        </div>
                      </div>{" "}
                    </>
                  )}
                </>
              )} */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Media;
