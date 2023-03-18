import React,{useState, useEffect} from 'react'
import { allcompanydata, companydata } from '../../apis/apis';
import {toast, ToastContainer} from "react-toastify";

const initalState = {
  company:" ", city: " ", phone:" ", address: " ", website: " ", state:" ", zip_code:" ", pan:" ", gstin:" "
}



const Companyprofile = () => {

  const [stateData, setState] = useState(initalState);
  const [data,setData] = useState([])
  const { company, city, phone,address , website, state, zip_code, pan, gstin} = stateData


  const handleChange = async(e) =>{
    setState({...stateData, [e.target.name]:e.target.value})
  }


const allData = async() => {
  const company = await allcompanydata()
  setData(company)
}
useEffect(() => {
  allData()
},[])

  const getComapnayData = async() => {
const data = await companydata(stateData)
if(data.sucess == true){
  toast(data.message)
  window.location.reload();
  
}else{
  toast(data.message)
}
     
  }
  useEffect(() => {

    setState({...data[0]})
  },[data])
  return (
     <div className="col-md-9">
                <div className="card">
                  <div className=" row p-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="company" className="control-label">
                          Company
                        </label>
                        <input
                          placeholder='company Name'
                          value={company}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          name="company"
                        />
                      </div>
                     
                      <div className="form-group">
                        <label className="control-label" for="phonenumber">Phone</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          placeholder='+91 898 9899 898'
                          value={phone}
                          className="form-control"
                          name="phone"
                          id="phonenumber"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" for="website">
                          Website
                        </label>
                        <input
                           onChange={handleChange}
                           placeholder='www.org.com'
                           value={website}
                          type="text"
                          className="form-control"
                          name="website"
                          id="website"
                      
                        />
                      </div>
                      <div className="form-group">
                        <label for="state">State</label>
                        <input
                           onChange={handleChange}
                           placeholder='State'
                           value={state}
                          type="text"
                          className="form-control"
                          name="state"
                          id="state"
                  
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="city">City</label>
                        <input
                           onChange={handleChange}
                           placeholder='City'
                           value={city}
                          type="text"
                          className="form-control"
                          name="city"
                          id="city"
                        
                        />
                      </div>
                      <div className="form-group">
                        <label for="address">Address</label>
                        <textarea
                         onChange={handleChange}
                         placeholder='address'
                         value={address}
                          name="address"
                          id="address"
                          className="form-control"
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="zip">Zip Code</label>
                        <input
                          placeholder='124507'
                          onChange={handleChange}
                          value={zip_code}
                          type="number"
                          className="form-control"
                          name="zip_code"
                          id="zip"
                
                        />
                      </div>
                     
                    </div>
                    <div className="col-md-12">
                      <div
                        className="form-group"
                        app-field-wrapper="custom_fields[customers][10]"
                      >
                        <label
                          for="custom_fields[customers][10]"
                          className="control-label"
                        >
                          PAN
                        </label>
                        <input
                          placeholder='PAN'
                          onChange={handleChange}
                          value={pan}
                          type="text"
                          id="custom_fields[customers][10]"
                          name="pan"
                          className="form-control"
                          data-fieldto="customers"
                          data-fieldid="10"
                      
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <div
                        className="form-group"
                        app-field-wrapper="custom_fields[customers][11]"
                      >
                        <label
                          for="custom_fields[customers][11]"
                          className="control-label"
                        >
                          GSTIN
                        </label>
                        <input
                          type="text"
                          id="custom_fields[customers][11]"
                          name="gstin"
                          onChange={handleChange}
                          placeholder='GSTIN'
                          value={gstin}
                          className="form-control"
                          data-fieldto="customers"
                          data-fieldid="11"

                        />
                      </div>
                    </div>

                  
                    <div className="col-md-12 text-right mt-2 ">
                      <div className="form-group">
                        <button type="submit" className="btn update-btn" onClick={getComapnayData}>
                          Update
                        </button>
                        <ToastContainer/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

  )
}

export default Companyprofile
