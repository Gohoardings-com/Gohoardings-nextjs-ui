import React from 'react';
import LoginOauth from "./loginOauth";
import { toast, ToastContainer } from "react-toastify";
const Sign = ({ signIn, toggleSignUp,sendOtp,  setPassword, afterLogin, password, setEmail, email, emailsValidate, numbervalidate, phone, AiFillEye, AiFillEyeInvisible, setNumber, nameValidate, setName, name, onRegister, onForget, setOtp, checkOTPForLogin, registerOtp}) => {
  return (
    <> 
    <h2 className="mt-4 fw-bold">Sign up</h2>
    <h5 className="mt-3">Please fill all the fields</h5>
    <form onSubmit={ registerOtp}>
    <div className="form-floating mt-4">
      <input
        type="text"
        className="form-control"
        autoComplete="off"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <p className="ms-3 p-0 text ">{nameValidate}</p>
      <label htmlFor="floatingInput">Full Name</label>
    </div>
    <div className="form-floating mt-2">
      <input
        type="email"
        className="form-control"
        autoComplete="off"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <p className="ms-2 p-0 text ">{emailsValidate}</p>
      <label htmlFor="floatingInput">Email</label>
    </div>
    <div className="form-floating mt-2 d-flex pe-0 ">
      <input
        type="number"
        className="form-control"
        autoComplete="off"
        placeholder="0123456789"
        id='mnd'
      
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      /> <button className='border-0' id='sendf' onClick={onRegister}>Send</button>
      <label htmlFor="floatingInput">Phone</label>
    </div>
      <p className="ms-2 p-0 text ">{numbervalidate}</p>
    <div className="form-floating  mt-2 ">
      <input
        type="password"
        className="form-control"
        autoComplete="off"
        id='num'
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label htmlFor="floatingPassword">Password</label>
    </div>
   
    {sendOtp && 
    <div className="form-floating mt-2">
    <input
      type="number"
      className="form-control"
      autoComplete="off"
      placeholder="OTP" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
      onChange={e => setOtp(e.target.value)}
    />
    <p className="ms-2 p-0 text ">{numbervalidate}</p>
    <label htmlFor="floatingInput">OTP</label>
  </div>
    }
     
    
 
   {sendOtp?  <div className="d-grid mt-3">
      <button
        type="submit"
        className="border-0 rounded btn-lg  mb-2 "
      >
        Sign up
      </button>{" "}
      <ToastContainer />
    </div>:   <div className="d-grid mt-3" >
      <button
      disabled={true}
      
        className="border-0 rounded btn-lg  mb-2 "
        id='noget' >
        Sign up
      </button>{" "}
      <ToastContainer />
    </div>}
  
    </form>

    <h6 className="mt-2">
    Already have an account?  <span className="fw-bold switch " onClick={() => toggleSignUp()}>Login</span>
    </h6>

    <LoginOauth signIn={signIn} afterLogin={afterLogin} setNumber={setNumber}  onForget={onForget} setOtp={setOtp} checkOTPForLogin={checkOTPForLogin}/>
    </>
  );
}

export default Sign;
