import React, { useState } from "react";
import { enquiryApi } from "@/allApi/apis";
import { toast } from "react-toastify";
const CampaignForm = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    launchDate: currentDate,
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const message=`${formData.companyName},${formData.launchDate},${formData.budget}`

    e.preventDefault();
    
    const data = await enquiryApi(
      formData.name,
      formData.email,
      formData.phone,
      message
      
    );
    toast("Thanks,our expert will contact you soon!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      launchDate: currentDate,
      budget: "",
    })
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name<small className="req text-danger">* </small>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email<small className="req text-danger">* </small>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone<small className="req text-danger">* </small>
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="companyName" className="form-label">
              Company/Brand name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="launchDate" className="form-label">
              When do you want to launch the campaign
            </label>
            <input
              type="date"
              className="form-control"
              id="launchDate"
              name="launchDate"
              value={formData.launchDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="budget" className="form-label">
              Tentative Budget
            </label>
            <select
              className="form-select"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="1000-5000">10000-50000</option>
              <option value="5000-10,000">50,000-1,00,000</option>
              <option value="more than 1,00,000">more than 1,00,000</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <button type="submit" className="button mb-3 float-end me-0">
          Submit
        </button>
      </form>
      <style jsx>
        {`
          .req {
            font-size: 1.1rem;
          }
          .button {
            padding: 0.4rem 1rem;
            letter-spacing: 1px;
            font-size: 1.1rem;
            border-radius: 0.375rem;
            font-weight: 400;
            -webkit-transition: 0.15s linear;
            transition: 0.25s linear;
            border: none;
            margin: 1rem;
            font-weight: 600;
            background-color: #fff212;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            color: #212121;
          }

          label {
            color: #ffffff;
            font-size: 0.9rem;
          }
          ::-webkit-input-placeholder {
            font-size: 1rem !important;
          }
          .form-control:focus {
            border-color: rgba(100, 100, 100, 1) !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
            box-shadow: none !important;
          }
          @media screen and (max-width: 540px) {
            ::-webkit-input-placeholder {
              font-size: 0.9rem !important;
            }
            .button {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CampaignForm;
