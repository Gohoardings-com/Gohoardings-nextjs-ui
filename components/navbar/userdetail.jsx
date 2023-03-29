import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { useRouter } from "next/navigation";
import { GoogleLogout } from "react-google-login";
// import {
//   clientId,
//   googleLogin,
//   logoutUser,
//   refreshToken,
// } from "../../apis/apis";
// import { AccountContext } from "../../apis/apicontext";
// import { cartitems, userDetails } from "../../action/adminAction";
import Dropdown from "react-bootstrap/Dropdown";
// import { useAuth0 } from "@auth0/auth0-react";
import styles from "../../styles/navbarHome.module.scss";
import { MdDashboard } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
// import { FaUserCircle
// } from "react-icons/im";

import LoginN from "@/pages/login/loginParent";

const Userdetail = () => {


  // const dispatch = useDispatch();
  // const { addRemove } = useContext(AccountContext);
  // const { initalState } = useContext(AccountContext);
  // const { user, loading } = useSelector((state) => state.user);
  // const { logout } = useAuth0();

  // const oneTap = async (response) => {
  //   const data = await googleLogin(response);
  //   if (data.success === true) {
  //     localStorage.setItem(true, "long");
  //     addRemove({ type: "DECR" });
  //     getUser();
  //   }
  // };

  // let firstRender = true;

  // const handelLogout = async () => {
  //   await logoutUser();
  //   logout();
  //   localStorage.removeItem("true");
  //   navigate("/");
  // };

  // const profile = async () => {
  //   navigate("/profile");
  // };
  // const cart = async () => {
  //   await dispatch(cartitems()).then(() => {
  //     navigate("/cart");
  //   });
  // };

  // const getUser = async () => {
  //   addRemove({ type: "DECR" });
  //   dispatch(userDetails);
  // };

  // const refreshUser = async () => {
  //   const data = await refreshToken();
  //   return data;
  // };

  // useEffect(() => {
  //   if (firstRender) {
  //     firstRender = true;
  //     getUser();
  //   } else {
  //     let interval = setInterval(() => {
  //       refreshUser();
  //     }, 6 * 24 * 3600000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  // useGoogleOneTapLogin({
  //   onSuccess: (response) => oneTap(response),
  //   onError: (response) => toast(response.message),
  //   disabled: localStorage.getItem("true"),
  //   googleAccountConfigs: {
  //     client_id: clientId,
  //   },
  // });
  // console.log(scrollY);


  const route = useRouter();
  const loading = true;
  return (
    <>
      {loading == false ? (
        <div
          className={`p-0 m-0  d-flex ${styles.userDetail2} my-2 my-lg-0 usrdtl`}
        >
          <Dropdown className={styles.login_profile}>
            <Dropdown.Toggle
              variant="transparent"
              className={styles.drop_togel}
            >
              <FaUserCircle className={`${styles.login_icon}  pt-0 mb-1 `} />
            </Dropdown.Toggle>

            <Dropdown.Menu className={` ${styles.dropdown_menu_end} pt-0 pb-0`}>
              <Dropdown.Item
                className={`${styles.drop_item} rounded-top  ps-2 pt-2 pb-2`}
                disabled={true}
              >
                <CgUserlane className={`mb-1 icon-clr}`} />
                {/* {user[0].firstname.toUpperCase()} */}
              </Dropdown.Item>
              <hr className=" m-0" />
              <Dropdown.Item
                // onClick={profile}
                className={`${styles.drop_item}  ps-2 pt-2 pb-2`}
              >
                {" "}
                <MdDashboard className={`mb-1 icon-clr`} /> My Dashboard
              </Dropdown.Item>
              <hr className=" m-0" />
              <Dropdown.Item
                // onClick={handelLogout}
                className={`${styles.drop_item} rounded-bottom ps-2 pt-2 pb-2`}
              >
                <BiLogOut className="icon-clr" />{" "}
                {/* <GoogleLogout
                  className="border-0 bg-transparent"
                  clientId={clientId}
                  buttonText={"Logout"}
                  onLogoutSuccess={handelLogout}
                  icon={false}
                  id={log_bttn}
                /> */}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={`${styles.cart} ms-2`}>
            <span>
              <img
                src="../../images/all_image/hoarding.png"
                className={`${styles.login_icon_cart} `}
              />
            </span>
            <span></span>
          </div>
        </div>
      ) : (
        <>

 
          <div
            className={`pt-0 ${styles.drop_togel} border-0 usrdtl`}
            data-bs-toggle="modal"
            data-bs-target="#exampleLoginModall"
          >
            Login{" "}
            <FaUserCircle
              className={`${styles.login_icon} ps-0 p-0  ms-0 mb-1`}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Userdetail;
