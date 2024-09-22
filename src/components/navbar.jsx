import React, { useState, useEffect } from "react";
import nukeLogo from "../assets/nuke-logo.png";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function Navbar() {
  const [categories, setCategories] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  // Toggle Dropdown for Categories
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("post-categories").select();

      if (error) {
        setCategories(null);
        console.log("Error fetching categories");
      }

      if (data) {
        setCategories(data);
        console.log("Fetched category:", data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className={mobileNavOpen ? "mobile-open" : ""}>
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/">
            <img
              src={nukeLogo}
              alt="logo for nuke blog"
              className="blog-logo"
            />
          </Link>
        </div>
        <div className="nav-links">
          <ul className={`nav-links ${mobileNavOpen ? "mobile-open" : ""}`}>
            <li>
              <Link to="/all-articles">Articles</Link>
            </li>
            <li
              className="dropdown"
              onClick={toggleDropdown}
              // onClick={toggleDropdown}
            >
              <Link onClick={toggleDropdown}>Categories <i className="ri-arrow-down-s-line"></i></Link>

              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link to={`/posts-category/${category.id}`}>
                        {category.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <a href="#">About</a>
            </li>
            <li>
              <Link to="/contact-page">Contact</Link>
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
