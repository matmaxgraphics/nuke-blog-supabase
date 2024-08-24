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
        <div className="nav-links">
          <ul className={`nav-links ${mobileNavOpen ? "mobile-open" : ""}`}>
            <li>
              <Link to='/all-articles'>Articles</Link>
            </li>
            <li>
              <a href="">Categories</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <Link to='/contact-page'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="social-links">
          <i className="ri-youtube-line"></i>
          <i className="ri-instagram-line"></i>
          <i className="ri-twitter-x-line"></i>
          <i className="ri-medium-line"></i>
        </div>
        <div className="mobile-toggle" onClick={toggleMobileNav}>
          <i className={mobileNavOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </div>
      </div>
    </nav>
  );
}
