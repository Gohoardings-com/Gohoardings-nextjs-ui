import React from "react";
import { FiArrowLeftCircle, FiLogIn } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

import Countdown from "./countDown";

const ForgetPass = ({
  setconfirmPasswords,
  sendOtp,
  setSendOtp,
  setOtp,
  otp,
  toast,
  checkOTP,
  changePassword,
  setNumber,
  onForget,
  phone,
  setPassword,
  setForget,
  setPass,
  pass,
}) => {
  const goBack = () => {
    if (pass == true) {
      setPass(false);
      setSendOtp(false);
    }
    if (sendOtp == true) {
      setSendOtp(false);
      setPass(false);
    } else {
      setForget(false);
    }
  };

  return (
    <>
      <div className=" mt-3 text-start">
        <h2 className="">Did you forget your password ?</h2>
        <a className="forgetpass  me-4 mb-2" onClick={() => goBack()}>
          <FiArrowLeftCircle /> GoBack
        </a>
      </div>
      {pass ? (
        <div className="forget-content animate__animated  animate__fadeIn">
      
          <form onSubmit={changePassword} novalidate>
      

        
            <div className="form-floating mt-5">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="name"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <h6 className=" p-0 text-success mt-2 text-center">{toast}</h6>
              <label htmlFor="floatingInput"> Create new password</label>
            </div>
            <div className="form-floating mt-2">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="name"
                onChange={(e) => setconfirmPasswords(e.target.value)}
                required
              />

              <h6 className=" p-0 text-success mt-2 text-center">{toast}</h6>
              <label htmlFor="floatingInput">Confirm password</label>
            </div>

            <div className="d-grid mt-5">
              <button type="submit" className="border-0 rounded btn-lg   ">
                SET PASSWORD
              </button>{" "}
              <ToastContainer />
            </div>
          </form>
        </div>
      ) : (
        <>
          {sendOtp ? (
            <div className="forget-content animate__animated  animate__fadeIn">
              <form onSubmit={checkOTP} novalidate>


          
                <div className="form-floating mt-5">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    placeholder="name"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <a href="#" className="forgetpass">
                    <Countdown
                      initialTime={60}
                      phone={phone}
                      setSendOtp={setSendOtp}
                    />
                  </a>
                  <h6 className=" p-0 text-success mt-2 text-center">
                    {toast}
                  </h6>
                  <label htmlFor="floatingInput"> Enter your OTP</label>
                </div>
                <div className="d-grid mt-5">
                  <button type="submit" className="border-0 rounded btn-lg   ">
                    SUBMIT
                  </button>{" "}
                  <ToastContainer />
                </div>
              </form>
            </div>
          ) : (
            <div className="forget-content animate__animated  animate__fadeIn">
              <form onSubmit={onForget} novalidate>
              <div className="form-floating mt-5">
      <input
      type="text"
      className="form-control"
        autoComplete="off"
        placeholder="name"
        value={phone}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
       <h6 className=" p-0 text-success mt-2 text-center">
                    {toast}
                  </h6>
  <label htmlFor="floatingInput">
             
             Enter your phone or mobile no
           </label>
    </div>
      
                <div className="d-grid mt-4">
                  <button type="submit" className="border-0 rounded btn-lg   ">
                    SEND OTP
                  </button>{" "}
                  <ToastContainer />
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ForgetPass;