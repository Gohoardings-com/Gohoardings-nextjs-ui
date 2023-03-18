import React from 'react'

const Announcement = () => {
  return (
    <div className="card p-3 mid-card">
    <p>Announcement</p>

    <div className="horizontal-tabs">
    
      <div className="tab-content">
        <div
          role="tabpanel"
          className="tab-pane active"
          id="booked_media"
        >
          <h5>No Announcements Yet</h5>
        </div>  
      </div>
    </div>
  </div>
  )
}

export default Announcement
