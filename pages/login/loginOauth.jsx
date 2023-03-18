import React from "react";
import { FcGoogle } from "react-icons/fc";
import instance from "../../apis/axios";
import { useAuth0 } from "@auth0/auth0-react";

const LoginOauth = ({ signIn, afterLogin,setWithOtp ,withOtp}) => {
  const { loginWithPopup, user } = useAuth0();

  if (useAuth0()?.isAuthenticated) {
    instance.post("registration/user", user).then(() =>   afterLogin());
  }

  const loginLinkdin = async () => {
    await loginWithPopup();
  };

  return (
    <>
      <div className=" ps-0 mt-3 text-center login-auth mt-2">
        <div className="row">

        </div>
        
        <img
        alt="phone_otp"
          src="../../clientslogo/otp.png"
          className="otp-icon offset-1"
           onClick={()=>setWithOtp(!withOtp)}
        />
        <img
        alt="linkdin"
          src="../../clientslogo/linkdin.png"
          className="linkdin-icon offset-1"
          onClick={loginLinkdin}
        />
     <FcGoogle className="google-icon offset-1" onClick={signIn} />
      </div>
    </>
  );
};

export default LoginOauth;
