import React, {useEffect, useState} from "react";
import "./faqs.scss";
import {BsFillCircleFill} from "react-icons/bs";
import {IoIosArrowDown} from 'react-icons/io';
import Fixednavbar from "../../components/navbar/fixednavbar";
import {goh_faqsApi} from "../../apis/apis";

const Faqs = () => {
  const [posts, setPosts] = useState([])
  const staff = async() =>{
    const data = await goh_faqsApi()
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
        <div className="container-xxl  container-xl container-lg container-md container-faqs pt-4">
          <h1 className="pt-5 mt-5 mb-4">Frequently Asked Questions</h1>
          <section className="mt-5 mb-5">
          {posts.map((data, index) => {
            let abc = 'a' + data.id;
            return (
              < div className="question-box mt-3">
                <p
                  key={index}
                  className=" toggle-btn p-3 ps-2 mb-0 "
                  data-bs-toggle="collapse"
                  data-bs-target={`#${abc}`}
                >
                  <h4>
                <BsFillCircleFill className="point me-2"/>  {data.subject}<IoIosArrowDown className="down"/>     
                  </h4>
                </p>
                <div className="collapse" id={abc}>
                  <div className="card-body  pb-1 ps-5 pe-4">
                    <h5>{data.description}</h5>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
        </div>
    </>
  );
};

export default Faqs;
