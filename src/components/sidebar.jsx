import { Link } from "react-router-dom";
import React, { useState } from "react";
import nukeLogoWhite from "../assets/nuke-logo-white.png";
const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <Link to="/">
          <img
            src={nukeLogoWhite}
            alt="logo for nuke blog"
            className="blog-logo"
          />
        </Link>
        <ul className="sidebar-content">
          <li>
            <Link to="admin-panel/create-post">Manage Posts</Link>
          </li>
          <li>
            <a href="">Manage Categories</a>
          </li>
          <li>
            <a href="">Manage Users</a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
