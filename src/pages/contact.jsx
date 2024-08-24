import React, { useState } from "react";
import Navbar from "../components/navbar";
import Newsletter from "../components/newsletter";
import Footer from "../components/footer";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending data to a server)
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <section className="contact-section">
        <h1>Contact Info</h1>
        <div className="contact-info">
            <span><i className="ri-mail-line"></i><a href="mailto:info@nukeblog.com">info@nukeblog.com</a></span>
            <span><i className="ri-map-pin-line"></i><address>Lagos, Nigeria</address></span>
            <span><i className="ri-phone-line"></i><a href="tel:+2347012345678">+234 701 2345 678</a></span>
        </div>
        <main className="form-field">
            <h3>Say Hello,</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder="e.g John Doe"
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.email}
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
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </main>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}

export default ContactForm;
