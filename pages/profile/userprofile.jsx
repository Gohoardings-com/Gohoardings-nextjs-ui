import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap';
import { updateProfile } from '@/allApi/apis';
import {toast, ToastContainer} from "react-toastify";
import instance from '@/allApi/axios';

const initalState = {
  firstname: "",
  phonenumber: "",
  email:""
}
const Userprofile = () => {
  const [imge, setImage] = useState([])
  const [posts,setPosts] = useState([])
  const getUser = async() => {
    const {data} =  await instance.get("registration/user")
    setPosts(data)
  }
  useEffect(() => {
    getUser()
  },[])
  const [state, setState] = useState(initalState);

  const {firstname,  phonenumber,email}= state;

  const sendImagefile = async(e) =>{
    setImage(e.target.files[0]);
     }


const handelSubmit = async(e) =>{
e.preventDefault()
const formData = new FormData()
formData.append("photo",imge)
formData.append("firstname",firstname)
formData.append("phonenumber",phonenumber)
const data = await updateProfile(formData)
if(data.sucess == true){
  toast(data.message)
  window.location.reload();
  
}else{
  toast(data.message)
}
      
}

const handleChange =async(e) =>{
  const {name, value} = e.target
setState({...state,[name]:value})
  }

  useEffect(() => {

    setState({...posts[0]})
  },[posts])

  return (
    <>
      <div className="card profile-detail p-3">
        <div className="panel-body">
          <div className="row">
            <form onSubmit={handelSubmit}>
            <div className="col-md-12">
              <div className="form-group">
                <div className="form-group">
                  <label
                    for="profile_image"
                    className="profile-image"
                  >
                    Profile image
                  </label>
                  <Form.Control  className="form-control" type='file' accept="image/png, image/jpg, image/jpeg" name='photo' onChange={(e) =>sendImagefile(e)} />
                  {/* <Form.Control
                   className="form-control"
                  type='file' name='photo' onChange={sendImagefile}
                  /> */}
                </div>
                <label for="firstname">First Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="firstname"
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  onChange={handleChange}

                />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="email"
                 disabled={true}
                  value={email}
                  onChange={handleChange}
 
                />
              </div>
             
              <div className="form-group">
                <label for="phonenumber">Phone</label>
                <Form.Control
                  type="number"
                  className="form-control"
                  name="phonenumber"
                  id="phonenumber"
                  value={phonenumber}
                  onChange={handleChange}
 
                />
              </div>


            </div>
            <div className="row p15">
              <div className="col-md-12 text-right mtop20">
                <div className="form-group mb-0">
                  <Form.Control
                    type="submit"
                    value="UPDATE"
                    className="btn update-btn text-light"
                  />
                  <ToastContainer/>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Userprofile