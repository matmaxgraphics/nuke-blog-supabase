import { useState } from "react";
import Button from "../Utils/Button";
import emailjs from "emailjs-com";


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleValidation = () => {
    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
      return false;
    } else {
      setIsEmailValid(true);
      return true;
    }
  };

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (!handleValidation()) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    const templateParams = {
      email_id: email,
    };

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID_2,
        templateParams,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage("Subscription successful!");
        setErrorMessage("")
        setIsLoading(false)
        setEmail("");
        setTimeout(() => {
            setSuccessMessage('')
        }, 5000);
      })
      .catch((error) => {
        console.error("Failed to send email", error);
        setErrorMessage("Subscription failed. Please try again.");
        setIsLoading(false)
      });
  };

  return (
    <section className="newsletter-section max-width">
      <article className="newsletter--content">
        <h2>
          Never <span>miss</span> an update
        </h2>
        <p>
          Get our blog articles sent to your mail directly when a new one is
          created
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              required
              className="email-field input-field"
              placeholder="Your email address..."
              onChange={handleInput}
            />
            
            <Button
              isLoading={isLoading}
              buttonText="Start getting updates"
              loadingText="Loading..."
              className="submit-btn btn"
            />
          </div>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </article>
    </section>
  );
};

export default Newsletter;
