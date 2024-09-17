import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import Button from "../../Utils/Button";
import PanelMainLayout from "../../layout/PanelMainLayout";


const CreateUser = function () {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullname,
          },
        },
      });
      if (error) throw error;
      if (data) {
        navigateTo("../admin-panel/manage-users", {
          state: { message: "User created successfully!" },
        });
        console.log(data);
      }
    } catch (error) {
      console.error("Sign up error", error);
      setErrorMessage("There's an error signing up, please try again");

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
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="name"
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
    </PanelMainLayout>
  );
};

export default CreateUser;
