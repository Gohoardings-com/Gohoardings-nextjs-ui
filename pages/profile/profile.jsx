import React, { useEffect, useState } from "react";
import { profileDetails } from "../../apis/apis";
import Fixednavbar from "../../components/navbar/fixednavbar";
import Campaings from "./userdata";
import Changepassword from "./changepassword";
import Companyprofile from "./companyprofile";
import "./profile.scss";
import Userprofile from "./userprofile";
import Campign from "./campign";
import Profoma from "./profoma";
import Invoice from "./invoice";
import Announcement from "./announcement";
import {BiEditAlt} from 'react-icons/bi'
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState(false);
  const [companey, setCompaney] = useState(false);
  const [posts, setPosts] = useState([]);
  const [capm, setCamp] = useState(false);
  const [profoma, setProfoma] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [announce ,setAnnounce] = useState(false);
  const { user, loading } = useSelector((state) => state.user);
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  useEffect(() => {
    topFunction();
  }, []);

  const userData = async () => {
    const data = await profileDetails();

    setPosts(data.message);
  };

  const showCompaney = () => {
    setCompaney(true);
    setProfile(false);
  };

  const showProfile = () => {
    setProfile(true);
    setCompaney(false);
  };

  const showDashboard = () => {
    setProfile(false);
    setCompaney(false);
    setCamp(false);
  };

  const showCampaigns = () => {
    setProfile(false);
    setCompaney(false);
    setCamp(false);
    
  };

  const showProforma = () => {
    setProfile(false);
    setCompaney(false);
    setCamp(true);
    setProfoma(true);
  };
  
  const showInvoise = () => {
    setProfile(false);
    setCompaney(false);
    setCamp(true);
    setProfoma(false);
    setInvoice(true);
  };
  const showAnnounce = () => {
    setProfile(false);
    setCompaney(false);
    setCamp(true);
    setProfoma(false);
    setInvoice(false);
    setAnnounce(true)
  };


  useEffect(() => {
    userData();
  }, []);

  
  return (
    <>
      <Fixednavbar />
      <div className="d-hide drop-nd" >
      </div>
      <div className=" container-xxl  container-xl container-lg container-md my-5">
        <div className="row  p-5">
          <div className="col-md-3">
            <div className="card">
             {loading == false &&  
             <img
                src={user[0].profile_image}
                className="card-img-top p-3 pb-2"
                alt="user-profile"
                onError={(e) =>
                  (e.target.src = "../../clientslogo/user-profile.png")
                }
               
              /> }
              <div className="card-body text-light  row text-center pt-0 pb-2">
                <div className="col pe-0 ">
                  <div className="p-1 border prf-btn " onClick={showProfile}>
                    Profile
                  </div>
                </div>
                <div className="col ps-0">
                  <div className="p-1 border  prf-btn" onClick={showCompaney}>
                    Company
                  </div>
                </div>
              </div>
            </div>
            <div className="list-group card mt-5" id="list-tab" role="tablist">
              <a
                className="list-group-item list-group-item-action bg-dark text-light"
                id="list-home-list"
                data-bs-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="list-home"
              >
                My Dashboard
              </a>
              {/* <a
                className="list-group-item list-group-item-action"
                id="list-profile-list"
                data-bs-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="list-profile"
                onClick={showDashboard}
              >
                Media Plan
              </a> */}
              <a
                className="list-group-item list-group-item-action"
                id="list-messages-list"
                data-bs-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="list-messages"
                onClick={showCampaigns}
              >
                Campaigns
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-settings-list"
                data-bs-toggle="list"
                href="#list-settings"
                role="tab"
                aria-controls="list-settings"
                onClick={showProforma}
              >
                Proforma invoice
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-messages-list"
                data-bs-toggle="list"
                href="#list-messages"
                role="tab"
                onClick={showInvoise}
                aria-controls="list-messages"
              >
                Invoice & Payments
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-settings-list"
                data-bs-toggle="list"
                href="#list-settings"
                role="tab"
                aria-controls="list-settings"
                onClick={showAnnounce}
              >
                Announcement
              </a>
            </div>
          </div>

          {companey ? (
            <Companyprofile />
          ) : (
            <>
              <div className="col-md-6 ">
                {profile ? (
                  <>
                    <Userprofile  />
                  </>
                ) : (
                  <>
                    {capm ? (
                      <>
                        {profoma ? (
                          <Profoma />
                        ) : (
                          <>{invoice ? <Invoice posts={posts}/> : <>{announce? <Announcement posts={posts}/>:  <Campaings posts={posts} /> }  </> }</>
                        )}
                      </>
                    ) : (
            
                      <Campign posts={posts}/> 
                    )}
                  </>
                )}
              </div>
              <div className="col-md-3 ">
                {profile ? (
                  <>
                    <Changepassword />
                  </>
                ) : (
                  <>
                    <div
                      className="widget card p-2  pb-4 "
                      id="widget-user_data"
                      data-name="User Widget"
                    >
                      <div className="panel_s user-data ">
                        <div className="panel-body home-activity">
                          <p className="bold">Activity</p>

                          <hr className="hr-panel-heading" />
                          <div className="horizontal-scrollable-tabs">
                            <div className="horizontal-tabs">
                              <ul
                                className="nav nav-tabs nav-tabs-horizontal"
                                role="tablist"
                              >
                                <li role="presentation" className="active p-2">
                                  <a
                                    href="#favourite_added"
                                    aria-controls="favourite_added"
                                    role="tab"
                                    data-toggle="tab"
                                    aria-expanded="true"
                                    className="med-text p-1 "
                                  >
                                    Saved Media
                                  </a>
                                </li>
                                <li role="presentation" className=" p-2">
                                  <a
                                    href="#media_activity"
                                    aria-controls="media_activity"
                                    role="tab"
                                    data-toggle="tab"
                                    aria-expanded="false"
                                    className="med-text med-text p-1"
                                  >
                                    Activity Logs
                                  </a>
                                </li>
                              </ul>
                              <div className="tab-content">
                                <div
                                  role="tabpanel"
                                  className="tab-pane active"
                                  id="favourite_added"
                                >
                                  <div className="">
                                    <p className="no-margin">
                                      No Announcements
                                    </p>
                                  </div>
                                </div>
                                <div
                                  role="tabpanel"
                                  className="tab-pane "
                                  id="media_activity"
                                >
                                  <div className="activity-feed"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
