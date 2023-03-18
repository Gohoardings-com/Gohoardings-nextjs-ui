/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "@/allApi/apis";
import Userdetail from "./userdetail";
import Drop_Down_Image from "./navbarDropdown";
import { MdOutlineSearch,MdLocationPin } from "react-icons/md"; 
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Mediadropdown from "../mediaDropdown";
import { mediawithcity } from "@/redux/adminAction";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Citylocation from "../cityLocation";

const Flotinggnavbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [city, setCity] = useState([]);
  const [posts, setPosts] = useState();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [userType, setUserType] = useState("");
  const [userPath,setUserPath] = useState(false)
  
  const where=window.location.pathname;

  function closeSearch() {
    if(where==='/map'){
     setUserPath(true)
      // document.getElementById("mapM").style.display="none";
    }
  }

  useEffect(() => {
    closeSearch();
  },[])


  const onChange = async (event) => {
    setValue(event.target.value)
    const cities = event.target.value;
    const data = await getAllCity(cities);
    setCity(data);
  };
  const mavigatetoMediaPage = (userType,value) => {
    if(userPath==true && userType.length > 3 && value.length > 2){
      dispatch(mediawithcity(userType,value));
    }
  else if(userType.length > 3 && value.length > 2){
    navigate(`/${userType}/${value}`)
  }
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  setFocus(false)
  };


  return (
    <>
      <Navbar expand="lg px-md-0 p-1 m-0 border-0 navbar-main-floating fixed-top ">
        <div className="sss"  onMouseOver={() => setShow(false)}></div>
        <Navbar.Brand
          href="/"
          id="home"
          onMouseOver={() => setShow(true)}
        >
          <img
          alt="gohoardings"
            src="../../images/logo.png"
            className="border-0 brand float-brand "
          />
          <RiArrowDropDownLine className="riArrowDropDownLine icon-clr" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3"   />
        <Navbar.Collapse id="basic-navbar-nav" onMouseOver={() => setShow(false)}>
          <Nav className="navbar-nav mx-auto  search-inner-drop" >
            <InputGroup className="" >
              <Citylocation InputGroup={InputGroup} setValue={setValue} />
              <Form.Control
                placeholder="Search your location"
                aria-describedby="basic-addon1"
                autoComplete="off"
                onChange={onChange}
                value={value}
                onFocus={() => setFocus(true)}
            
                id="search-location-box"
                className=" "
              />
            </InputGroup>

            <div
              className={
                focus
                  ? "dropdown-menu border-0 show  mt-5  ps-5 "
                  : "dropdown-menu "
              }
              id="xyz"
            >
              {city.map((item, i) => (
                <div
                  className="border-1 rounded-3"
                  key={i}
                  onClick={() => onSearch(item.name)}
                
                >
                  <option value={item.name} className=" text-dark mt-1 ps-3 ">
                    {item.name}
                  </option>
                </div>
              ))}
            </div>
            <MediaDropDown userType={userType} setUserType={setUserType} />
         
              <Button
                className="border-0 btn "
              onClick={(a,b) =>  mavigatetoMediaPage(userType,value)}
                id="search-button-flotnav"
              >
                <MdOutlineSearch className="search-logo icon-clr" />
              </Button>
          
          </Nav>
          <form className="  text-center" >
            {userPath?   <Nav.Link
              className="mapLink float-map-btn text-light   p-0 rounded-pill "
             id="float-map-btn-id"
            >
   
              <MdLocationPin
                className=" float-map-logo ps-0 p-0  ms-0 mb-1 icon-clr"
              />
              Map View
            </Nav.Link>:
               <Nav.Link
               className="mapLink float-map-btn    p-0 rounded-pill "
               href="/map"
             >
    
               <MdLocationPin
                 className=" float-map-logo ps-0 p-0  ms-0 mb-1 icon-clr"
               />
               Map View
             </Nav.Link>}
          
          </form>
          <form className="form-inline mt-2 me-auto">
            <Userdetail posts={posts} setPosts={setPosts} />
          </form>
        </Navbar.Collapse>
      </Navbar>
      <Drop_Down_Image
        show={show}
        setShow={setShow}
        Dropdown={Dropdown}
       
      />
    </>
  );
};

export default Flotinggnavbar;