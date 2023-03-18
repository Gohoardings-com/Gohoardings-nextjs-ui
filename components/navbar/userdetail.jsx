import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import {
  clientId,
  googleLogin,
  logoutUser,
  refreshToken,
} from "../../apis/apis";
import { AccountContext } from "../../apis/apicontext";
import { cartitems, userDetails } from "../../action/adminAction";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";
import { MdDashboard } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { FaHandsHelping, FaUserCircle } from "react-icons/fa";
import { ImEnter } from "react-icons/im";

const Userdetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addRemove } = useContext(AccountContext);
  const { initalState } = useContext(AccountContext);
  const { user, loading } = useSelector((state) => state.user);
  const { logout } = useAuth0();


  const oneTap = async (response) => {
    const data = await googleLogin(response);
    if (data.success === true) {
      localStorage.setItem(true, "long");
      addRemove({ type: "DECR" });
      getUser();
    }
  };

  let firstRender = true;

  const handelLogout = async () => {
    await logoutUser();
    logout();
    localStorage.removeItem("true");
    navigate("/");
  };

  const profile = async () => {
    navigate("/profile");
  };
  const cart = async () => {
    await dispatch(cartitems()).then(() => {
      navigate("/cart");
    });
  };

  const getUser = async () => {
    addRemove({ type: "DECR" });
    dispatch(userDetails);
  };

  const refreshUser = async () => {
    const data = await refreshToken();
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = true;
      getUser();
    } else {
      let interval = setInterval(() => {
        refreshUser();
      }, 6 * 24 * 3600000);
      return () => clearInterval(interval);
    }
  }, []);

  useGoogleOneTapLogin({
    onSuccess: (response) => oneTap(response),
    onError: (response) => toast(response.message),
    disabled: localStorage.getItem("true"),
    googleAccountConfigs: {
      client_id: clientId,
    },
  });

  return (
    <>
      {loading == false ? (
        <div className="p-0 m-0  d-flex userDetail2 my-2 my-lg-0 ">
          <Dropdown className="login-profile">
            <Dropdown.Toggle variant="transparent" className=" drop-togel">
              <FaUserCircle className="login-icon  pt-0 mb-1 icon-clr" />
            </Dropdown.Toggle>

            <Dropdown.Menu className=" dropdown-menu-end pt-0 pb-0">
              <Dropdown.Item
                className="drop-item  rounded-top  ps-2 pt-2 pb-2 "
                disabled={true}
              >
                <CgUserlane className="mb-1 icon-clr" />{" "}
                {user[0].firstname.toUpperCase()}
              </Dropdown.Item>
              <hr className=" m-0" />
              <Dropdown.Item
                onClick={profile}
                className="drop-item  ps-2 pt-2 pb-2"
              >
                {" "}
                <MdDashboard className="mb-1 icon-clr" /> My Dashboard
              </Dropdown.Item>
              <hr className=" m-0" />
              <Dropdown.Item
                onClick={handelLogout}
                className="drop-item rounded-bottom  ps-2 pt-2 pb-2"
              >
                <BiLogOut className="icon-clr" />{" "}
                <GoogleLogout
                  className="border-0 bg-transparent"
                  clientId={clientId}
                  buttonText={"Logout"}
                  onLogoutSuccess={handelLogout}
                  icon={false}
                  id="log-bttn"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="cart me-2" onClick={cart}>
            <span>
              <img
                src="../../clientslogo/hoarding.png"
                className="login-icon-cart icon-clr"
              />
            </span>
            <span>{initalState}</span>
          </div>
        </div>
      ) : (
        <Dropdown className="border-0  ms-2  pt-1 p-0 me-md-0  user-detail-login">
          <Dropdown.Toggle variant="transparent" className="pt-0 drop-togel">
            <ImEnter className="login-icon  pt-0 mb-1 icon-clr" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-end  p-0">
            <Dropdown.Item
              variant="transparent"
              className="rounded-top ps-2 pt-2 pb-2 drop-item "
              href="/login"
            >
              <BiLogIn className="icon-clr" /> Sign in
            </Dropdown.Item>
            <hr className="p-0 m-0" />
            <Dropdown.Item
              className="rounded-bottom ps-2 pt-2 pb-2 drop-item"
              href="/contact"
            >
              <FaHandsHelping className="icon-clr " /> Help?
            </Dropdown.Item>
          </Dropdown.Menu>
          <ToastContainer />
        </Dropdown>
      )}
    </>
  );
};

export default Userdetail;
