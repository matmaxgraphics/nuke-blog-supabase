import React, { useState } from "react";
import nukeLogo from "../assets/nuke-logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <nav className={mobileNavOpen ? "mobile-open" : ""}>
      <div className="nav-content">
        <div className="logo-container">
          <Link to='/'><img src={nukeLogo} alt="logo for nuke blog" className="blog-logo" /></Link>
        </div>

        <div className="social-links">
          <Link to="/"><button className="btn">Visit Website</button></Link>
        </div>
        <div className="mobile-toggle" onClick={toggleMobileNav}>
          <i className={mobileNavOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </div>
      </div>
    </nav>
  );
}
