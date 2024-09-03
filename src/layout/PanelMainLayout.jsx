import React, { Children, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import nukeLogoWhite from "../assets/nuke-logo-white.png";
// import sidebar from "../../components/sidebar";

const PanelMainLayout = function ({ children }) {
  const navigateTo = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // console.log(user_id);
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigateTo("/admin-panel/admin-login");
  };

  return (
    <>
      <section className={`panel-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
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
              <Link to="/admin-panel/manage-post">Manage Posts</Link>
            </li>
            <li>
              <Link to="/admin-panel/manage-category">Manage Categories</Link>
            </li>
            <li>
              <Link to="/admin-panel/manage-users">Manage Users</Link>
            </li>
          </ul>
        </aside>
        <main className="admin-content">
          {/* admin panel navbar */}
          <nav>
            <div className="toggle-container" onClick={toggleSidebar}>
              <i className="ri-menu-line"></i>
            </div>

            <div className="logout">
              <Link to="/admin-panel/admin-login">
                <button className="btn" onClick={handleLogout}>Logout</button>
              </Link>
            </div>
          </nav>

          {children}
        </main>
      </section>
    </>
  );
};

const handleLogout = ({token}) => {
  sessionStorage.removeItem("token");
  navigateTo("admin-panel/admin-login");
};

export default PanelMainLayout;
