import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const OverView = ({Media_content,category_name}) => {
return (
    <>
      {Media_content.map((el, i) => {
        if (category_name === el.value) {
          return (
            <div
              key={i}
              className="container-xxl  container-xl container-lg container-md  my-5 overview-container"
            >
              <div className="my-5">
                       <h1 className="fw-bold" style={{fontSize:"1.75rem"}}>{el.body_heading1}</h1>
                <ul className="my-4">
                  {el.body_content_list.map((data, i) => (
                    <li key={i}>{data.list}</li>
                  ))}
                </ul>
              </div>
              <div className="my-5">
                <h3 className="fw-bold">{el.body_heading2}</h3>
                <h6 className="my-2">{el.body_content2_description_top}</h6>
                <ul className="my-4">
                  {el.body_content2_list.map((data, i) => (
                    <li key={i} className="my-2">
                      <span>
                        <span style={{ fontWeight: "600" }}>
                          {data.list.split(":")[0]}
                        </span>
                        :{data.list.split(":")[1]}
                      </span>
                    </li>
                  ))}
                </ul>
                <h6 className="my-2">{el.body_content2_description_bottom}</h6>
              </div>
              <div className="my-5">
                <h3 className="fw-bold">{el.body_heading3}</h3>

                <h6 className="my-2">{el.body_content3_description_top}</h6>
                <ul className="my-4">
                  {el.body_content3_list.map((data, i) => (
                    <li key={i} className="my-2">
                      <span>
                        <span style={{ fontWeight: "600" }}>
                          {data.list.split(":")[0]}
                        </span>
                        :{data.list.split(":")[1]}
                      </span>
                    </li>
                  ))}
                </ul>
                <h6 className="my-2">{el.body_content3_description_bottom}</h6>
              </div>
              <section className="my-5">
                <h3 className="fw-bold">{el.faqs_heading}</h3>
                {el.faqs_content.map((data, i) => {
                  let abc = "a" + data.id;
                  return (
                    <div className="question-box mt-3" key={i}>
                      <p
                        className=" toggle-btn p-3 ps-2 mb-0 "
                        data-bs-toggle="collapse"
                        data-bs-target={`#${abc}`}
                      >
                        <h4>
                          <BsFillCircleFill className="point me-2" />{" "}
                          {data.faqs_qsn}
                          <IoIosArrowDown className="down float-end" />
                        </h4>
                      </p>
                      <div className="collapse" id={abc}>
                        <div className="card-body  pb-1 ps-5 pe-4">
                          <small>{data.faqs_ans}</small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
              <h6 className="">
                Hire us as you&#39;re hoarding advertising partner we got
                covered, dial our number or whatsapp +91-777-787-1717 email us
                info@gohoardings.com, we will take care of your marketing.
              </h6>
            </div>
          );
        }
      })}
      <style jsx>
        {`
          .question-box {
            background-color: #fefefe;
            box-shadow: rgba(98, 98, 105, 0.2) 0px 7px 29px 0px;
          }

          .toggle-btn h4 {
            cursor: pointer;
            font-size: 19px;
            color: rgb(57, 55, 55);
          }

          .collapse {
            background: transparent;
          }

          h5 {
            font-weight: 700;
            cursor: pointer;
            font-size: 1.3rem;
            color: black;
          }

          .down {
            float: right;
            color: rgb(89, 85, 85);
          }

          .point {
            color: rgb(168, 162, 162);
          }

          @media screen and (max-width: 1366px) {
            .toggle-btn h4 {
              font-size: 16px;
            }
            .card-body h5 {
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
};

export default OverView;
