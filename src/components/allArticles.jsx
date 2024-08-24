import { Outlet, Link } from "react-router-dom";
import img1 from "../assets/img-1.png";
import img2 from "../assets/img-2.png";
import img3 from "../assets/img-3.png";
import img4 from "../assets/img-4.png";
import downArrowIcon from "../assets/arrow-down.svg";
import PopularArticle from "../components/popularArticle";
const AllArticles = () => {
  return (
    <>
      <AllArticlesContent />
      <PopularArticle />
    </>
  );
};

const AllArticlesContent = () => {
  return (
    <section className="articles--container recent-article--section max-width">
      <main className="blog-cards--wrapper">
        <article className="blog-card--container">
          <Link to="/single-article">
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </Link>
        </article>

        <article className="blog-card--container">
          <a href={`single-article`}>
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </a>
        </article>

        <article className="blog-card--container">
          <a href="">
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </a>
        </article>

        <article className="blog-card--container">
          <a href="">
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </a>
        </article>

        <article className="blog-card--container">
          <Link to="/single-article">
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </Link>
        </article>

        <article className="blog-card--container">
          <a href={`single-article`}>
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </a>
        </article>

        <article className="blog-card--container">
          <a href="">
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </a>
        </article>

        <article className="blog-card--container">
          <a href="">
            <img src={img1} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
              <h4 className="blog-title">
                Everyday lifestyle of different activities
              </h4>
            </div>
          </a>
        </article>
      </main>
      <button className="read--more_btn link--button">
        <a href={`all-articles`}>
          <span>Load more articles </span>{" "}
          <img
            src={downArrowIcon}
            alt="arrow icon pointing down, indicating more reads"
            className="cta-icon"
          />
        </a>
      </button>
    </section>
  );
};

export default AllArticles;
