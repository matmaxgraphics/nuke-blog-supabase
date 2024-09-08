import { Link } from "react-router-dom";
import arrowIcon from "../assets/arrow-right.svg";
import supabase from "../config/supabaseClient";
import SkeletonLoader from "./SkeletonLoader";
import Date from "../Utils/Date";
import { useState, useEffect } from "react";

const PopularArticle = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("created_at");
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .range(4, 6)
        .order(orderBy, { ascending: false });

      if (error) {
        setPosts(null);
        console.log("Error fetching posts");
      }

      if (data) {
        setPosts(data);
        console.log("The fetched data:", data);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [orderBy]);
  return (
    <section className="popular-article--section recent-article--section max-width">
      <h2>Popular Articles</h2>
      <main className="blog-cards--wrapper">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          posts &&
          posts.map((post) => (
            <article className="blog-card" key={post.id}>
              <div className="blog--image">
                <img src={post.image} alt="" />
              </div>
              <div className="blog-details">
                <Date date={post.created_at} />
                <h4 className="blog-title">{post.title}</h4>
                <p className="blog-description">{post.body}</p>
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
          ))
        )}
      </main>
    </section>
  );
};

export default PopularArticle;
