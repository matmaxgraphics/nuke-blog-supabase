import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import nukeLogo from "../assets/nuke-logo.png";
import AdminNavbar from "../components/admin-navbar";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);

  const toggleVisibility = (e) => {
    setRevealPassword(!revealPassword);
  };

  const navigateTo = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("sign in successful");

      navigateTo("/admin-panel/manage-post");
    } catch (error) {
      console.error("sign-in error", error.message);
      setErrorMessage(
        "Invalid email or password, please check your details and try again"
      );

      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("sign-up successful!");
    } catch (error) {
      console.error("sign-up error:", error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <section className="admin-login_form contact-section">
        <h1>Login to Admin Panel</h1>
        <main className="form-field">
          <form className="contact-form">
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
            <button
              type="submit"
              className={isLoading ? "loading-button btn" : "normal-button btn"}
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <span>Login to Panel</span>
              )}
            </button>
            {/* <button type="submit" className="btn" onClick={handleSignUp}>
                Sign up to Panel
              </button> */}
          </form>
        </main>
      </section>
    </>
  );
};

export default AdminLoginForm;
