import React, { useEffect, useState } from "react";
import "./feedback.scss";
import axios from "axios";
import { GiCrossMark } from "react-icons/gi";
import {
  BsEmojiHeartEyes,
  BsEmojiSmile,
  BsEmojiNeutral,
  BsEmojiFrown,
  BsEmojiAngry,
} from "react-icons/bs";
import { reviewApi, getreviewApi } from "../../apis/apis";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const logo = [
    {
      id: 1,
      rating: 1,
      logo: <BsEmojiAngry />,
      select: false,
    },
    {
      id: 2,
      rating: 2,
      logo: <BsEmojiFrown />,
      select: false,
    },
    {
      id: 3,
      rating: 3,
      logo: <BsEmojiNeutral />,
      select: false,
    },
    {
      id: 4,
      rating: 4,
      logo: <BsEmojiSmile />,
      select: false,
    },
    {
      id: 5,
      rating: 5,
      logo: <BsEmojiHeartEyes />,
      select:false,
    },
  ];
  const [posts, setPosts] = useState(logo);
  const [ip_address, setIP] = useState('');

  const getData = async()=>{
    if(sessionStorage.getItem("done")) {
      document.getElementById("demo").style.display = "none";
    }
    const {data} = await axios.get("https://api.ipify.org?format=json")
    setIP(data.ip)
} 
useEffect(() => {
  getData()
},[])

const ips = async() => {
  if(sessionStorage.getItem("done")) {
    document.getElementById("demo").style.display = "none";
  }else{
    const data = await getreviewApi()
    {ip_address.length !=0 && 
      data.map((el) => {
        if(el.ip_address == ip_address) {
          document.getElementById("demo").style.display = "none"
        }
        else{
          document.getElementById("demo").style.display = "block"
        }  
       })
    }  
  } 
}


 setTimeout(ips, 40000);

  const changeStatus = async (id) => {
    const data = [...logo];
    data.map((el) => {
      if (el.id === id) {
        el.select = "true";
        setRating(el.rating);
      }
      setPosts(data);
    });
  };

  function closeFeedback() {
    document.getElementById("demo").style.display = "none";
    window.sessionStorage.setItem("done","stop")
  }

  const getFeedback = () => {
    if(feedback!=""){
      reviewApi(feedback, rating, ip_address);
      closeFeedback();
      window.sessionStorage.setItem("done","stop")
    }
    else{
      document.getElementById("exampleFormControlTextarea1").style.border = "1px solid red";
    }
  };


  return (
    <div className="card  feedback-card  fixed-bottom border-0 animate__animated animate__backInUp" id="demo">
      <div className="heading-bg rounded-top">
        <span className="">
          <GiCrossMark className="iconx mt-1 me-1" onClick={closeFeedback} />
        </span>
        <h3 className="text-center p-2   mb-1 heading">Your feedback</h3>
      </div>

      <div className="ps-2 pe-2">
        <h6 className="text-center mt-3 ">
          We like your feedback to improve our website.
        </h6>
        <h6 className="text-center mt-3 ">
          What is your opinion of this page?
        </h6>

        <div className="grid-container1 text-center mt-4">
          {posts.map((clients, index) => {
            return (
              <div className="grid-item text-center" key={index}>
                <span
                  className="img-fluid logo-img"
                  aria-expanded={clients.select}
                  onClick={() => changeStatus(clients.id)}
                >
                  {clients.logo}
                </span>
              </div>
            );
          })}
        </div>

        <hr className=" m--3 ms-2 me-2" />
        <form className=" ms-2 me-2">
          <h6 className="ps-1">Please leave your feedback below:</h6>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
            ></textarea>
        </form> 
        <button
          type="submit"
          className="send-btn border-0 rounded-2 m-2 p-1 ps-3 pe-3"
          onClick={getFeedback}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Feedback;