import React, {useState} from "react";
// import Slider from "./slider.jsx";
import "./icons.scss"
import {iconFiltersData} from "../../action/adminAction";
import {useDispatch} from "react-redux";
import {MdSchool, MdOutlineRestaurantMenu } from "react-icons/md";
import {BiDrink } from "react-icons/bi";
import {SiHotelsdotcom } from "react-icons/si";
import {RiHospitalFill, RiMovie2Fill } from "react-icons/ri";
import {TbMassage } from "react-icons/tb";
import {CgGym } from "react-icons/cg";

const Iconsselection = ({slice}) => {
  const dispatch = useDispatch()
  const [distance, Setdistance] = useState(0);
  const [datas, setData] = useState([])

  let hording = [];

  function multichecked(e) {
    if (e.currentTarget.checked) {
      hording.push(e.target.value)
    } else {
      // htmlFor (let i = 0; i < hording.length; i++) {
      // if (e.target.value == hording[i]) {
      var index = hording.indexOf(e.target.value)
      if (index > -1) { // only splice array when item is found
        hording.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setData(cat => [...cat, hording])
  }

  // function HandleDistance(Dis) {
  //   Setdistance(Dis)
  // }

  let Icons = [
    {
      name: "education",
      value: <MdSchool className="icons-sizes icon-clr"/>,
      id: "cb1"
    },
    {
      name: "bar",
      value: <BiDrink className="icons-sizes icon-clr"/>,
      id: "cb2"
    },
    {
      name: "hotel",
      value: <SiHotelsdotcom className="icons-sizes icon-clr"/>,
      id: "cb3"
    },
    {
      name: "restaurant",
      value: <MdOutlineRestaurantMenu className="icons-sizes icon-clr"/>,
      id: "cb4"
    },
    {
      name: "hospital",
      value: <RiHospitalFill className="icons-sizes icon-clr"/>,
      id: "cb5"
    },
    {
      name: "spa",
      value: <TbMassage className="icons-sizes icon-clr"/>,
      id: "cb6"
    },
    {
      name: "cinema",
      value: <RiMovie2Fill className="icons-sizes icon-clr"/>,
      id: "cb7"
    },
    {
      name: "gym",
      value: <CgGym className="icons-sizes icon-clr"/>,
      id: "cb8"
    },
  ];

  const distanceofMedia = [
    {
      name: 1,
      value: 1,
    },
    {
      name: 2,
      value: 2,
    },
    {
      name: 3,
      value: 3,
    },
    {
      name: 4,
      value: 4,
    },

  ]

  let uniqueValues = new Set();

  slice.forEach(el => {
    uniqueValues.add(el.mp_lat);
  });
  // JSON.stringify(uniqueValues)

  const submitfilters = async () => {

    const value = [...slice];
    const table = value[0].category_name;
    const city = value[0].city_name;
    const latitudes = slice.map(item => item.latitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);

  let array = [...uniqueValues];
  let arrayJJson = JSON.stringify(array);
  let newString = arrayJJson.replace(/\[|\]/g, '');
  // dispatch(iconFiltersData(distance, datas, table, city, minLatitude, maxLatitude , newString))

  }

  return (
    <>
      <div className="poi-items accordion-collapse collapse" id="collapseT2" data-bs-parent="#accordionTest">
        <div className="row poi-item">
          {Icons.map((icon, i) => (
            <div className="col-4 d-inline-block text-center pb-3 shadow-sm border position-relative collapsed" key={i} data-bs-toggle="collapse" data-bs-target={`#${icon.name}`} aria-expanded="false" >
              <input type="checkbox" id={icon.id} value={icon.name} onClick={(e) => multichecked(e)} />
              <label htmlFor={icon.id}>
                {icon.value}
                </label>
                <span className="icone-name-map pb-2">{icon.name} </span>
            </div>
          ))}
        </div>
        
        {/* <div className="distance p-2 m-3">
          <p className="m-1 mb-4 pb-2">Distance</p>
          <Slider Distance={distance} onChange={HandleDistance} />
          <div className="row pt-3 ps-3 km-distance">
            {distanceofMedia.map((dis, i) => {

              <div className="col-lg-3 col-sm-2 ps-1" key={i}>{dis.name}</div>
            })}
            <div className="col-lg-3 col-sm-2 ps-2">0km</div>
            <div className="col-lg-3 col-sm-2 ps-2">1km</div>
            <div className="col-lg-3 col-sm-2 ps-3">2km</div>
            <div className="col-lg-3 col-sm-2 ps-4">3km</div>
          </div>
        </div> */}
      
       <div className="text-center map-btn-more"  >
          <button id="notWorking" className="buttonload btn-hover" >
          {/* <button id="notWorking" className="buttonload btn-hover"  onClick={() => submitfilters()}> */}
            Apply
          </button>
      </div>
      </div>
    </>
  )
}

export default Iconsselection
