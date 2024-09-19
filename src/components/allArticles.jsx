import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import UseFetchPosts from "../Utils/UseFetchPost";
import supabase from "../config/supabaseClient";
import Date from "../Utils/Date";
import SkeletonLoader from "./SkeletonLoader";
// import img1 from "../assets/img-1.png";
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
  const [posts, setPosts] = useState();
  const [morePosts, setMorePosts] = useState(5);
  const [orderBy, setOrderBy] = useState("created_at");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .range(0, morePosts)
        .order(orderBy, { ascending: false });

      if (error) {
        setPosts(null);
        console.log("Error fetching posts");
      }

      if (data) {
        setPosts(data);
        console.log("The fetched data:", data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [morePosts, orderBy]);

  const handlePagination = () => {
    setMorePosts((prevCount) => prevCount + 5);
  };

  // setPosts(morePosts + 5)
  return (
    <section className="articles--container recent-article--section max-width">
      <main className="blog-cards--wrapper">
        {loading ? (
          <SkeletonLoader />
        ) : (posts &&
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
          )))}
      </main>
      {loading ? (
        <SkeletonLoader/>
      ) : (
        <button
          className="read--more_btn link--button"
          onClick={handlePagination}
        >
          <a>
            <span>Load more articles </span>{" "}
            <img
              src={downArrowIcon}
              alt="arrow icon pointing down, indicating more reads"
              className="cta-icon"
            />
          </a>
        </button>
      )}
    </section>
  );
};

export default AllArticles;
