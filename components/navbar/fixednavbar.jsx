/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getAllCity } from "@/allApi/apis";
import { DropdownButton } from "react-bootstrap";
import Link from "next/link";
import { CityNameImage } from "@/allApi/apis";
import { useDispatch, useSelector } from "react-redux";
import Userdetail from "./userdetail";
import { MdOutlineSearch, MdLocationPin } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { mediawithcity } from "../../action/adminAction";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Citylocation from "../cityLocation";
import styles from "../../styles/fixedNavbar.module.scss";
import NavbarDropdown from "./dropdown";
// import Citylocation from "../cityLocation/citylocation";
import { useRouter } from "next/navigation";

const Fixednavbar = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState([]);
  const [posts, setPosts] = useState();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [userType, setUserType] = useState("");
  const [userPath, setUserPath] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const route=useRouter();
  // function closeSearch() {
  //   useEffect(() => {
  //     const where = window.location.pathname;
  //     // Client-side-only code
  // })
  //   if (where === "/map") {
  //     setUserPath(true);
  //     // document.getElementById("mapM").style.display="none";
  //   }
  // }

  // useEffect(() => {
  //   closeSearch();
  // }, []);

  let selecType;
  CityNameImage.map((el) => {
    if (el.value == userType) {
      selecType = el.label;
    }
  });
  const onChange = async (event) => {
    setValue(event.target.value);
    const cities = event.target.value;
    const data = await getAllCity(cities);
    setCity(data);
  };
  const mavigatetoMediaPage = (userType, value) => {
    if (userPath == true && userType.length > 3 && value.length > 2) {
      dispatch(mediawithcity(userType, value));
    } else if (userType.length > 3 && value.length > 2) {
      route.push(`/${userType}/${value}`);
    }
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setFocus(false);
  };

  function handleMouseEnter() {
    setShowMenu(true);
  }

  function handleMouseLeave() {
    setShowMenu(false);
  }

  return (
    <>
      <Navbar
        expand={`lg px-md-0 p-1 m-0 border-0 ${styles.navbar_main_floating} fixed-top`}
      >
        <div className={styles.sss}></div>
 
        
       
        <Navbar.Brand
          id={styles.home}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          
        >
          <img
            alt="gohoardings"
            src="../../images/all_image/logo.png"
            className={`border-0 brand ${styles.float_brand}`}
            onClick={()=>route.push("/")}
          />
          <div className={`dropdown-menu ${showMenu ? "show" : ""} p-0 m-0`}>
         <NavbarDropdown/>
          </div>
          <style jsx>{`
            .dropdown-menu.show {
              display: block;
            }
          `}</style>
          <RiArrowDropDownLine
            className={`${styles.riArrowDropDownLine} icon-clr`}
          />
        </Navbar.Brand>
    
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id={styles.basic_navbar_nav}>
          <Nav className={`navbar-nav mx-auto  ${styles.search_inner_drop} `}>
            <InputGroup className="">
              <Citylocation InputGroup={InputGroup} setValue={setValue} />
              <Form.Control
                placeholder="Search your location"
                aria-describedby="basic-addon1"
                autoComplete="off"
                onChange={onChange}
                value={value}
                onFocus={() => setFocus(true)}
                id={styles.search_location_box}
              />
            </InputGroup>

            <div
              className={
                focus ? "dropdown-menu border-0 show  mt-5  " : "dropdown-menu "
              }
              id={styles.xyz}
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
            <div className="p-0 m-0 fnav">
              <DropdownButton
                title={userType ? selecType : "Select your media type"}
                id={styles.select_media_box}
                onSelect={(e) => setUserType(e)}
              >
                {CityNameImage.map((el, i) => (
                  <Dropdown.Item
                    eventKey={el.value}
                    className="p-2 mt-0 "
                    key={i}
                  >
                    <span className={`${styles.select_media_icon} icon-clr`}>
                      {" "}
                      {el.icon}{" "}
                    </span>
                    {el.label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>

            <Button
              className="border-0 btn "
              onClick={(a, b) => mavigatetoMediaPage(userType, value)}
              id={styles.search_button_flotnav}
            >
              <MdOutlineSearch className={`${styles.search_logo} icon-clr`} />
            </Button>
          </Nav>
          <form className="  text-center">
            {userPath ? (
              <Nav.Link
                className={`${styles.mapLink} ${styles.float_map_btn} text-light   p-0  rounded-pill`}
                id={styles.float_map_btn_id}
              >
                {/* <MdLocationPin
                  className={`${styles.float_map_logo} ps-0 p-0  ms-0 mb-1  icon-clr`}
                /> */}
                Map View
              </Nav.Link>
            ) : (
              <Nav.Link
                className={`${styles.mapLink} ${styles.float_map_btn}    p-0 rounded-pill pt-1`}
                href="/map"
              >
                {/* <MdLocationPin
                  className={`${styles.float_map_logo} ps-0 p-0  ms-0 mb-1 icon-clr   `}
                /> */}
                Map View
              </Nav.Link>
            )}
          </form>
          <form className="form-inline mt-2 me-auto">
            <Userdetail posts={posts} setPosts={setPosts} />
          </form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Fixednavbar;
