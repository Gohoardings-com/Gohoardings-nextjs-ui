import React from 'react'


const Branding = (props) => {
 
  return (
   <>
    <section className="inn-page-bg mt-5">
        <div className="container">
          <div className="row">
            <a href="/">
              {/* <img
                src="https://gohoardings.com/assets/images/logopng.png"
                alt="logo"
                className="logo ps-2" 
              /> */}
            </a>
            <div className="inn-pag-ban">
              <h2>{props.title}</h2>
            </div>
          </div>
        </div>
      </section>
   </>
  )
}

export default Branding;