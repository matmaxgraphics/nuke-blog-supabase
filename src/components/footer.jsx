import authorImage from "../assets/author-img.png";

const Footer = () => {
  return (
    <footer>
      <main className="footer-content max-width">
        <article className="author--details">
          <h4>About Author</h4>
          <div className="author-details_content">
            <div className="img-container">
              <img src={authorImage} alt="" />
            </div>
            <div className="text-description">
              <h5>Josephine Olubode</h5>
              <p>
                They wouldn't purposely reveal it, or at least he believed that,
                but they could easily inadvertently expose it. It was going to
                be a long hour as he nervously eyed everyone around the table
                hoping they would keep their mouths shut.
              </p>
            </div>
          </div>
        </article>

        <article className="contact--details">
          <h4>Contact Details</h4>
          <a href="mailto:info@buke.blog">info@nuke.blog</a>
          <a href="tel:+234 801 235 5678">+234 801 235 5678</a>
          <div className="social-links">
            <i className="ri-youtube-line"></i>
            <i className="ri-instagram-line"></i>
            <i className="ri-twitter-x-line"></i>
            <i className="ri-medium-line"></i>
          </div>
        </article>
      </main>

        <hr className="max-width"/>
      <div className="bottom--footer max-width">
        <div className="bottom-wrapper">
           <p>&copy; NUKE BLOG</p> 

           <span>
            <a href="">Privacy Policy</a>
            <a href="">Terms and Condition</a>
           </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
