import { Outlet, Link } from "react-router-dom";
import UseFetchPosts from "../Utils/UseFetchPost";
import arrowIcon from "../assets/arrow-right.svg";
import SkeletonLoader from "./SkeletonLoader";
import Date from "../Utils/Date";

const RecentArticle = () => {
  const { posts, isLoading, error } = UseFetchPosts(1, 4, "created_at");

  return (
    <section className="recent-article--section max-width">
      <h2>Recent Articles</h2>

      <main className="blog-cards--wrapper">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          posts &&
          posts.map((post, index) => (
            <article className="blog-card--container" key={index}>
              <Link to={`/single-article/${post.id}`}>
                <img src={post.image} alt="" className="blog-display--image" />
                <div className="blog-details">
                  <Date date={post.created_at} />
                  <h4 className="blog-title">{post.title}</h4>
                </div>
              </Link>
            </article>
          ))
        )}
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
