import React,{useState} from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Campaings = ({posts}) => {
 
  const [payment, setPayment] = useState(false);
  const [voise, setVoise] = useState(false);
 
  let active = 1;
  let items = [posts];
  const showPlan = () => {
    setPayment(false);
    setVoise(false);
  };

  const showPayment = () => {
    setPayment(true);
    setVoise(false);
  };

  const showInvoise = () => {
    setVoise(true);
    setPayment(false);
  };
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="card p-3 mid-card">
                      <p>Overview</p>

                      <div className="horizontal-tabs">
                        <ul
                          className="nav nav-tabs nav-tabs-horizontal mb-4"
                          role="tablist"
                        >
                          <li role="presentation" className="active">
                            <a
                              href="#booked_media"
                              aria-controls="booked_media"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="true"
                              onClick={showPlan}
                            >
                              <i className="fa fa-bullhorn menu-icon"></i>{" "}
                              Booked Plan
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#payment"
                              aria-controls="payment"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              onClick={showPayment}
                            >
                              <i className="fa fa-window-maximize menu-icon"></i>{" "}
                              Payment
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#invoice"
                              aria-controls="invoice"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              onClick={showInvoise}
                            >
                              <i className="fa fa-window-maximize menu-icon"></i>{" "}
                              Invoice
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="booked_media"
                          >
                            <table
                              className="table dt-table table-announcements dataTable no-footer"
                              data-order-col="1"
                              data-order-type="asc"
                              id="DataTables_Table_0"
                            >
                              {voise ? (
                                <>
                                  <thead>
                                    <tr>
                                      <th>SNowtrwt</th>
                                      <th>Title</th>
                                      <th>Start Date</th>
                                      <th>End Date</th>
                                    </tr>
                                  </thead>
                              
                                </>
                              ) : (
                                <>
                                  {payment ? (
                                    <>
                                      <thead>
                                        <tr>
                                          <th>SNo</th>
                                          <th>Campaign</th>
                                          <th>Payment Mode</th>
                                          <th>Start Date</th>
                                          <th>End Date</th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        {posts.map((el, i) => {
                                          return el.media_type ? (
                                           
                                              <tr key={i}>
                                                <td>{i+ 1} </td>
                                                <td>{el.campaign_name}</td>
                                                <td>
                                                  {el.payment_status == 0
                                                    ? "Pending"
                                                    : "Success"}
                                                </td>
                                                <td>
                                                  {el.start_date.slice(0, 10)}
                                                </td>
                                                <td>
                                                  {el.end_date.slice(0, 10)}
                                                </td>
                                              </tr>
                                            
                                          ) : (
                                          <tr>No Data Found</tr>
                                          );
                                        })}
                                      </tbody>
                                    </>
                                  ) : (
                                    <>
                                      <thead>
                                        <tr>
                                         
                                          <th>City</th>
                                          <th>Media</th>
                                        
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {posts.map((el, i) => {
                                          return el.media_type ? (
                                         
                                              <tr key={i }>
                                              
                                                <td text={el.campaign_city}>{el.campaign_city}</td>
                                                <td>{el.media_type}</td>
                                               
                                              </tr>
                                            
                                          ) : (
                                            <tr>No Data Found</tr>
                                          );
                                        })}
                                      </tbody>
                                    </>
                                  )}
                                </>
                              )}
                            </table>
                          </div>
                        </div>
                        
                      </div>
                    </div>
  )
}

export default Campaings
