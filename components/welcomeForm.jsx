import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/login.module.scss";
import { toast } from "react-toastify";
import Image from "next/image";
import { enquiryApi } from "@/allApi/apis";
const WelcomeForm = () => {
  const [show, setShow] = useState(false);
  const [welcomeForm, setWelcomeForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e) => {
    setWelcomeForm({ ...welcomeForm, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
    localStorage.setItem("forceClosed", "true");
  };
  const handleShow = () => {
    setShow(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    for (const key in welcomeForm) {
      if (!welcomeForm[key]) {
        toast(`Please fill in the ${key.replace(/_/g, " ")} field.`);

        return;
      }
      if (key === "phone" && welcomeForm[key].length < 10) {
        toast(
          `Please enter a valid ${key.replace(
            /_/g,
            " "
          )} with at least 10 digits.`
        );
        return;
      }
      if (key === "email" && !isValidEmail(welcomeForm[key])) {
        toast(`Please enter a valid email address.`);
        return;
      }
    }
    const data = await enquiryApi(
      welcomeForm.name,
      welcomeForm.email,
      welcomeForm.phone,
      welcomeForm.message
    );

    if (data.success == true) {
      toast("Thanks,our expert will contact you soon!");
      setShow(false);
      localStorage.setItem("forceClosed", "false");
    }
  };

  useEffect(() => {
    // Check if the flag is present in localStorage
    const formClosed = localStorage.getItem("forceClosed");

    if (!formClosed) {
      // Show the modal after 6 seconds
      const timeoutId = setTimeout(() => {
        handleShow();
      }, 6000);

      // Cleanup the timeout on component unmount
      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    // Handle cleanup when the user closes the browser
    const handleBeforeUnload = () => {
      localStorage.removeItem("forceClosed");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="lgn">
          <div className="row">
            <div className="col-md-6 p-4 m-0 col-12">
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
                        name="phone"
                        value={welcomeForm.phone}
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
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className={styles.wrapperWelcome}>
                <button
                  className="float-end m-1 close-btn"
                  onClick={handleClose}
                >
                  x
                </button>
                <div className={`${styles.opacitydivWelcome} rounded-4 `}>
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
                    className={`${styles.img_responsiveWelcome} img-fluid`}
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
          .message-btn {
            letter-spacing: 1px;
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
            .row {
              flex-direction: column;
            }
      
            /* Adjust the styles for the first column */
            .col-md-6.p-4.m-0.col-12 {
              order: 2; /* Change the order */
            }
      
            /* Adjust the styles for the second column */
            .col-md-6.col-12 {
              order: 1; /* Change the order */
            }
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
      h2{
        font-size: 1.4rem!important;
      }
          }
        `}
      </style>
    </>
  );
};

export default WelcomeForm;
