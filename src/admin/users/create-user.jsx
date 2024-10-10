import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../Utils/Button";
import PanelMainLayout from "../../layout/PanelMainLayout";

const CreateUser = function () {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);

  const toggleVisibility = (e) => {
    setRevealPassword(!revealPassword);
  };

  const navigateTo = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_USER_API_URL}/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            full_name: fullname,
            role: selectedRole,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigateTo("../admin-panel/manage-users", {
          state: { message: "User created successfully!" },
        });
      } else {
        setErrorMessage(
          result.error || "Error creating user, please try again"
        );
      }
    } catch (error) {
      console.error("Sign up error", error);
      toast.error("An error occured");
      setIsLoading(false);
    }
  };

  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Create User</h4>
        <Link to="/admin-panel/manage-users" className="link-btn">
          Manage Users
        </Link>
      </div>

      <div className="content">
        <h2 className="page-title">Create User</h2>
        <form className="contact-form">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="input-field"
              placeholder="e.g John Doe"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type={revealPassword ? "text" : "password"}
              name="pword"
              className="input-field password-field"
              placeholder="Input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <small className="visibility-toggle" onClick={toggleVisibility}>
              {revealPassword ? "Hide" : "Show"}
            </small>
          </div>
          <div>
            <label>Assign a Role</label>
            <select
              name="topic"
              className="input-field"
              value={selectedRole}
              required
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>

          {errorMessage && (
            <div className="alert-message">
              <small id="message" className="error-message">
                {errorMessage}
              </small>
            </div>
          )}
          <div className="btn-wrap">
            <Button
              isLoading={isLoading}
              onClick={handleSignUp}
              buttonText="Create user"
              loadingText="Creating user"
              className="btn"
            />
          </div>
          {/* <button type="submit" className="btn" onClick={handleSignUp}>
                Sign up to Panel
              </button> */}
        </form>
      </div>
      <ToastContainer />
    </PanelMainLayout>
  );
};

export default CreateUser;
