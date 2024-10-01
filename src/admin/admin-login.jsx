import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Utils/Button";
import AdminNavbar from "../components/admin-navbar";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [token, setToken] = useState(null);

  const toggleVisibility = (e) => {
    setRevealPassword(!revealPassword);
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(JSON.parse(savedToken));
      // navigateTo("/admin-panel/manage-post");
    }
  }, [navigateTo]);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      const user_id = data.user.id;
      // const role = data.user.user_metadata?.role;
      const metadata = data.user.user_metadata || {};
    const role = metadata.role || null;  // Fallback in case 'role' is missing

    console.log("User Role: ", role);

      console.log(role);
      

      sessionStorage.setItem("user_id", user_id);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem(
        "user_email",
        data?.user?.user_metadata?.full_name
      );
      setToken(data.session.access_token);

      console.log(data);

      if (role === "admin" || role === "editor") {
        navigateTo("/admin-panel/manage-post");
      } else {
        setErrorMessage(
          "Access denied. You are not allowed to access this panel."
        );
        setIsLoading(false)
        setTimeout(()=>navigateTo("/"), 5000)
      }

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
            <Button
              isLoading={isLoading}
              onClick={handleSignIn}
              buttonText="Login to Panel"
              loadingText="Signing in..."
              className="login-btn"
            />
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
