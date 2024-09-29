import React, { useState } from "react";
import Navbar from "../components/navbar";
import Newsletter from "../components/newsletter";
import Footer from "../components/footer";
import emailjs from "emailjs-com";
import Button from "../Utils/Button";

function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: "",
    email_id: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Handle form submission (e.g., sending data to a server)
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage(
          "Message sent successful!, Thanks for contacting me 😄"
        );
        setErrorMessage("");
        setIsLoading(false);

        setFormData({
          from_name: "",
          email_id: "",
          message: "",
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Failed to send email", error);
        setErrorMessage("Unable to send message. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <section className="contact-section">
        <h1>Contact Info</h1>
        <div className="contact-info">
          <span>
            <i className="ri-mail-line"></i>
            <a href="mailto:info@nukeblog.com">info@nukeblog.com</a>
          </span>
          <span>
            <i className="ri-map-pin-line"></i>
            <address>Lagos, Nigeria</address>
          </span>
          <span>
            <i className="ri-phone-line"></i>
            <a href="tel:+2347012345678">+234 701 2345 678</a>
          </span>
        </div>
        <main className="form-field">
          <h3>Say Hello,</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="from_name"
                className="input-field"
                placeholder="e.g John Doe"
                value={formData.from_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email_id"
                className="input-field"
                placeholder="email@example.com"
                value={formData.email_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="What do you have in mind?"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <Button
              isLoading={isLoading}
              buttonText="Send Message"
              loadingText="Sending..."
              className="submit-btn btn"
            />
          </form>
        </main>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}

export default ContactForm;
