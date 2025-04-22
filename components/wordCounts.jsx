import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const WordCounts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/faqs"); // Replace with your actual API endpoint
        if (response.data.success) {
          setPosts(response?.data?.data); // Assuming `data` contains an array of FAQs
        } else {
          console.error("Error fetching FAQs:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts === null) {
    // Render a loading state
    return <p>Loading FAQs...</p>;
  }


  return (
    <div className="container-xxl container-xl container-lg container-md mb-md-4 mb-0 clients">
      <section className="mt-5 mb-5">
        {posts.length > 0 ? (
          posts.map((data) => {
            const abc = `faq-${data.id}`; // Unique ID for each collapsible section
            return (
              <div className="question-box mt-3" key={data.id}>
                <div
                  className="toggle-btn p-3 ps-2 mb-0"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${abc}`}
                >
                  <h4>
                    {data.qsn}
                    <IoIosArrowDown className="down float-end" />
                  </h4>
                </div>
                <div className="collapse" id={abc}>
                  <div className="card-body p-2 pt-0 pb-3">
                    <small>{data.ans}</small>
                    {data.ans2 && (
                      <>
                        <br />
                        <small className="mt-3">{data.ans2}</small>
                      </>
                    )}
                    {data.ans3 && (
                      <>
                        <br />
                        <small className="mt-3">{data.ans3}</small>
                      </>
                    )}
                    {data.ans4 && (
                      <>
                        <br />
                        <small className="mt-3">{data.ans4}</small>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No FAQs available at the moment.</p>
        )}
      </section>

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
    </div>
  );
};

export default WordCounts;
