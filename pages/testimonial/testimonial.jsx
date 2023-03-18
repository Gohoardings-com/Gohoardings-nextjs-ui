import React, { useEffect, useState } from "react";
import "./testimonial.scss";
import Fixednavbar from "../../components/navbar/fixednavbar";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Branding from "@/components/branding";
import { goh_testimonialsApi } from "@/allApi/apis";

const Testimonial = () => {
  const [posts, setPosts] = useState([]);

  const staff = async () => {
    const data = await goh_testimonialsApi();
    setPosts(data);
  };

  useEffect(() => {
    staff();
  }, []);
  
  return (
    <>
      <Fixednavbar />
      <Branding title="Testimonials" />
      <div className="container  mt-5">
        <div className="row testimonial-row mt-5">
          {!posts ? (
            <>
              <h1>Loading Please wait</h1>
            </>
          ) : (
            <>
              {posts.map((el, i) => (
                <div className="col-md-4" key={i}>
                  <div className="testimonials">
                    <img
                      src={
                        el.image
                          ? `https://www.gohoardings.com/gohadmin/uploads/testimonials/${el.image}`
                          : `../../clientslogo/user-profile.png`
                      }
                      alt="..."
                    />
                    <h3>{el.name}</h3>
                    <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: el.testimony }} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
