import { Link } from "react-router-dom";
import img4 from "../assets/img-4.png";
import arrowIcon from "../assets/arrow-right.svg";
import useFetchData from "./useFetchData";

const PopularArticle = () => {
  const { data } = useFetchData(
    "https://jsonplaceholder.typicode.com/posts",
    4
  );
  return (
    <section className="popular-article--section recent-article--section max-width">
      <h2>Popular Articles</h2>
      <main className="blog-cards--wrapper">
        {data &&
          data.map((post) => (
            <article className="blog-card" key={post.id}>
              <div className="blog--image">
                <img src={img4} alt="" />
              </div>
              <div className="blog-details">
                <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
                <h4 className="blog-title">
                 {post.title}
                </h4>
                <p className="blog-description">
                  {post.body}
                </p>
                <button className="read--more_btn link--button">
                  <Link to={`/single-article/${post.id}`}>
                    <span>Read Article </span>{" "}
                    <img
                      src={arrowIcon}
                      alt="arrow icon with read article button"
                      className="cta-icon"
                    />
                  </Link>
                </button>
              </div>
            </article>
          ))}
      </main>
    </section>
  );
};

export default PopularArticle;
