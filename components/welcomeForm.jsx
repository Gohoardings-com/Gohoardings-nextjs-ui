import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/login.module.scss";
import Image from "next/image";
const WelcomeForm = () => {
  const [show, setShow] = useState(true);
  const [welcomeForm, setWelcomeForm] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });


  const handleChange = (e) => {
    setWelcomeForm({ ...welcomeForm, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const onSubmit = async (e) => {};
console.log(welcomeForm);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="lgn">
          <div className=" d-flex">
            <div className="col-md-6 p-4 m-0">
              <div
                className={`container-xxl  container-xl container-lg container-md  ${styles.login_container2}`}
              >
                <>
                  <h6 className={styles.txt_clr}>*Kindly fill up the form</h6>
                  <form
                    className="mt-md-4  mt-2 position-relative"
                    onSubmit={onSubmit}
                  >
                    <div className="form-group py-md-3 py-1">
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control ps-0 rounded-0"
                        id="formGroupExampleInput"
                        placeholder="Full name"
                        name="name"
                        value={welcomeForm.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group py-md-3 py-1">
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control ps-0 rounded-0"
                        placeholder="Email id"
                        id="first-name"
                        name="email"
                        value={welcomeForm.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group py-md-3 py-1">
                      <input
                        autoComplete="off"
                        type="number"
                        className="form-control ps-0 rounded-0"
                        placeholder="012 3456 789"
                        name="number"
                        value={welcomeForm.number}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group py-md-3 py-1">
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control ps-0 rounded-0"
                        id="formGroupExampleInput2"
                        placeholder="Write your requirment for our team"
                        name="message"
                        value={welcomeForm.message}
                        onChange={handleChange}
                      />
                    </div>
                    <div className=" p-0 mt-1 mt-md-0 position-relative ">
                      <button
                        type="submit"
                        className="btn w-100 message-btn"
                        role="button"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className={styles.wrapper}>
                <button
                  className="float-end m-1 close-btn"
                  onClick={handleClose}
                >
                  x
                </button>
                <div className={`${styles.opacitydiv} rounded-4 `}>
                  <div className={`${styles.title} pt-3 ps-4  `}>
                    <h2>
                      Get The Best Advertising <br />
                      Solution From Us
                    </h2>
                  </div>
                  <Image
                    width={500}
                    height={500}
                    src="/images/web_pics/login1.png"
                    className={styles.img_responsive}
                    alt="Registraion"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <style jsx>
        {`
          .form-control {
            border: none !important;
            border-bottom: 1px solid #b5b4b4 !important;
          }

          ::-webkit-input-placeholder {
            font-size: 0.85rem !important;
          }
          .form-control:focus {
            border-color: rgba(100, 100, 100, 1) !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
            box-shadow: none !important;
          }
          .message-btn:hover {
            background-color: #373435;
            color: #fff212;
            font-size: 20px;
            padding-bottom: 5px;
          }
          .close-btn {
            border: none;
            opacity: 0.6;
            font-size: 14px;
          }
          @media screen and (max-width: 540px) {
            .txt-clr-tlk {
              color: #373435;
              font-size: 1.6rem;
            }
            .txt-clr {
              color: #373435;
            }

            ::-webkit-input-placeholder {
              font-size: 0.9rem !important;
            }
            .message-btn {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default WelcomeForm;
