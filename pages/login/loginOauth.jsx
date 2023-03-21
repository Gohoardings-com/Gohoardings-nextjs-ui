import React from "react";
import { FcGoogle } from "react-icons/fc";
// import instance from "../../apis/axios";
import { useAuth0 } from "@auth0/auth0-react";
import styles from '../../styles/login.module.scss'  ;

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
      <div className={`ps-0 mt-3 text-center ${styles.login_auth} mt-2`}>
        <div className="row">

        </div>
        
        <img
        alt="phone_otp"
          src="../../images/all_image/otp.png"
          className={`${styles.otp_icon} offset-1`}
           onClick={()=>setWithOtp(!withOtp)}
        />
        <img
        alt="linkdin"
          src="../../images/all_image/linkdin.png"
          className={`${styles.linkdin_icon} offset-1`}
          onClick={loginLinkdin}
        />
     <FcGoogle className={`${styles.google_icon} offset-1`} onClick={signIn} />
      </div>
    </>
  );
};

export default LoginOauth;
