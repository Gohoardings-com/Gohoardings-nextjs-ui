import React, {useEffect, useState} from "react";
import "./team.scss";
import Fixednavbar from "../../components/navbar/fixednavbar";
import { gohordingStaffAPi } from "@/allApi/apis";
import {FaFacebookSquare, FaLinkedin} from "react-icons/fa";
import {TiSocialTwitter} from "react-icons/ti"
import Branding from "@/components/branding";


const Team = () => {
  const [posts, setPosts] = useState([])
  const staff = async () => {
    const data = await gohordingStaffAPi()
    setPosts(data)
  }

  useEffect(()=>{
    staff()
  },[])
   
  
  return (
    <>
  <Fixednavbar/>
  <div className="d-hide drop-nd" >
      </div>
  <Branding title="Our expert team includes the following Gems" />
   
      <section>
        <div className="team-area  pt-0 mb-5 mt-5">
          <div className="container">
            <div className="row">
              {posts.map((person, index) => {
                return (
                  <div className="col-md-3 mt-3 col-6" id="maindiv"  key={index}>
                    <div className="single-team    text-center rounded">
                      <div className="team-img d-flex  justify-content-center">
                        <img
             src={person.profile_image ? `https://www.gohoardings.com/gohadmin/uploads/testimonials/${person.profile_image}` : `../../clientslogo/user-profile.png`} 
 alt={person.firstname} 
                          className="image-fluid rounded-circle pt-2 "
                        /> 
                      </div>
                      <div className="team-content mt-1">
                          <div className="team-info">
                            <h3>{person.firstname} {person.lastname}</h3>
                            <h5>{person.name}</h5>
                          </div>
                          <div className="grid-container mt-2">
                            <div className="grid-item me-1">
                              <FaFacebookSquare className="icon facebook" onClick={person.facebook} />
                            </div>
                            <div className="grid-item me-1">
                              <TiSocialTwitter className="icon twiter" />
                            </div>
                            <div className="grid-item ">
                              <FaLinkedin className="icon linkedin" onClick={person.linkedin}/>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
