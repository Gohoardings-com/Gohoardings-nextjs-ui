import React from "react";
import { FcGoogle } from "react-icons/fc";
import instance from "@/allApi/axios";
import styles from '../../styles/login.module.scss'  ;

const LoginOauth = ({ signIn, afterLogin,setWithOtp ,withOtp,success}) => {




  return (
    <>
      <div className={`ps-0 mt-3 text-center ${styles.login_auth} mt-2`}>
        <div className="row">
        </div>
        {withOtp?<img
        alt="phone_otp"
          src="../../images/all_image/gpmpas.png"
          className={`${styles.otp_icon} offset-1`}
           onClick={()=>setWithOtp(!withOtp)}
         
        />:
        <img
        alt="phone_otp"
          src="../../images/all_image/otp.png"
          className={`${styles.otp_icon} offset-1`}
           onClick={()=>setWithOtp(!withOtp)}
         
        />

        }
       
      
        
        <a href="/api/linkedin"   >
        <img
        alt="linkdin"
          src="../../images/all_image/linkdin.png"
          className={`${styles.linkdin_icon} offset-1`}
        />
        </a>
        
     <FcGoogle className={`${styles.google_icon} offset-1`} onClick={signIn}    />
      </div>
    </>
  );
};

export default LoginOauth;
