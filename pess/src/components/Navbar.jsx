import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import "./NavbarScript";

function Navbar() {
  return (
    <div className="topnav">
      <Link to="/AdminLogin/Home">
        Home
      </Link>
      <Link to="/AdminLogin/Students">
        Students
      </Link>
      <Link to="/AdminLogin/Teachers">
        Teachers
      </Link>
      <Link to="/AdminLogin/Classes">
        Classes
      </Link>x

      <div className="topnav-right">
        <Link to="/AdminLogin/search">
          Search
        </Link>
        {/* <Link to="#about">About</Link> */}
      </div>
    </div>
  );
}

export default Navbar;
