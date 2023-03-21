import React, {useEffect, useState} from "react"; 
import Nav from "react-bootstrap/Nav";
import {MdLocationPin} from "react-icons/md" 
import Navbar from "react-bootstrap/Navbar";
import Userdetail from "./userdetail";
import styles from "../../styles/navbarHome.module.scss";

const NavbarH = () => {
  const [posts, setPosts] = useState()

  useEffect(() => {
  setPosts(posts)
}, []);
   
  return (
    <>
      <Navbar expand={`lg px-md-0 pb-0 ${styles.fixd_nabar} sdsd`}>
        <div className="navbar container-xxl  container-xl container-lg container-md">
          <Navbar.Brand href="/">
            <img src="../images/all_image/logo.png" className={styles.rand_logo} alt="gohoardings" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id={styles.basic_navbar_nav}>
            <Nav className=" ms-auto ">
              <Nav.Link
                className={`me-2  me-md-0   ${styles.nav_text_btn}  text-center`}
                href="https://odoads.com/"
                target="_blank"
              >
                Odoads
              </Nav.Link>
              <Nav.Link
                className={`me-2  me-md-0   ${styles.nav_text_btn}  text-center`}
                href="https://www.gohoardings.com/blog/"
                target="_blank"
              >
                Blog
              </Nav.Link>
              <Nav.Link 
                className={`me-3  me-md-0   ${styles.nav_text_btn}  text-center`}
                href="/contact"
              >
                Contact
              </Nav.Link>
            

              <Nav.Link
                className={`${styles.mapLink} ${styles.font_map_btn} text-center  text-nowrap rounded-pill`}
                href="/map"
              >
                <MdLocationPin className={`ps-0 p-0   pb-1 ${styles.font_map_logo} icon-clr`} />
                Map View
              </Nav.Link>
              <Userdetail posts={posts} setPosts={setPosts}/>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarH ;

