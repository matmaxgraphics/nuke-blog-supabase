import { Outlet, Link } from "react-router-dom";
import newsImage1 from "../assets/news-img1.png";
import arrowIcon from "../assets/arrow-right.svg";

const LatestStory = () => {
  return (
    <section className="card--container max-width">
      <article className="description--container">
        <small className="card--tag">TOP STORY</small>
        <BlogTitle />
        <button className="read--more_btn link--button">
          <ReadMoreBtn />
        </button>
      </article>

      <article className="image--container">
        <BlogImage />
      </article>
    </section>
  );
};

const BlogTitle = () => {
  return (
    <div className="blog--title">
      <h2>The concept of space in relationship: When does it get too much</h2>
    </div>
  );
};

const ReadMoreBtn = () => {
  return (
    <Link to = '/single-article'>
      <span>Read Article</span>{" "}
      <img
        src={arrowIcon}
        alt="arrow icon with read article button"
        className="cta-icon"
      />
    </Link>
  );
};

const BlogImage = () => {
  return <img src={newsImage1} alt="supporting image for blog card" />;
};

export default LatestStory;
