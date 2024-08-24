import { Outlet, Link } from "react-router-dom";
import img1 from "../assets/img-1.png";
import img2 from "../assets/img-2.png";
import img3 from "../assets/img-3.png";
import img4 from "../assets/img-4.png";
import arrowIcon from "../assets/arrow-right.svg";
import useFetchData from "./useFetchData";

const RecentArticle = () => {
  const {data} = useFetchData('https://jsonplaceholder.typicode.com/posts', 4)
  return (
    <section className="recent-article--section max-width">
      <h2>Recent Articles</h2>

      <main className="blog-cards--wrapper">
        {data && data.map((post) => (
          <article className="blog-card--container" key={post.id}>
          <Link to={`/single-article/${post.id}`}>
            <img src={img2} alt="" className="blog-display--image" />
            <div className="blog-details">
              <small className="blog-upload--date">16th September, 2023</small>
              <h4 className="blog-title">{post.title}</h4>
            </div>
          </Link>
        </article>
        ))}
      </main>
      <button className="read--more_btn link--button">
        <Link to="/all-articles">
          <span>Explore more articles </span>{" "}
          <img
            src={arrowIcon}
            alt="arrow icon with read article button"
            className="cta-icon"
          />
        </Link>
      </button>
    </section>
  );
};

export default RecentArticle;
