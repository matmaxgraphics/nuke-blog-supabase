import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import SkeletonLoaderHeader from "./SkeletonLoaderHeader"; // Assuming you're using this for loading states
import newsImage1 from "../assets/news-img1.png"; // Make sure this path is correct
import arrowIcon from "../assets/arrow-right.svg";

const LatestStory = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .order(orderBy, { ascending: false })
        .limit(1); // Fetch only 1 post

      if (error) {
        setPost(null);
        console.log("Error fetching post:", error);
      } else if (data && data.length > 0) {
        setPost(data[0]); // Store the first post
        console.log("Fetched post:", data[0]);
      }

      setIsLoading(false);
    };

    fetchPost();
  }, [orderBy]);

  return (
    <>
      {isLoading ? (
        <SkeletonLoaderHeader /> // Replace with your loader
      ) : (
        post && (
          <section className="card--container max-width">
            <article className="description--container">
              <small className="card--tag">TOP STORY</small>
              <BlogTitle blogTitle={post.title} />
              <button className="read--more_btn link--button">
                <ReadMoreBtn postId={post.id} />
              </button>
            </article>

            <article className="image--container">
              <BlogImage image={post.image || newsImage1} />
            </article>
          </section>
        )
      )}
    </>
  );
};

const BlogTitle = ({ blogTitle }) => {
  return (
    <div className="blog--title">
      <h2>{blogTitle}</h2>
    </div>
  );
};

const ReadMoreBtn = ({ postId }) => {
  return (
    <Link to={`/single-article/${postId}`}>
      <span>Read Article</span>{" "}
      <img
        src={arrowIcon}
        alt="arrow icon with read article button"
        className="cta-icon"
      />
    </Link>
  );
};

const BlogImage = ({ image }) => {
  return <img src={image} alt="supporting image for blog card" />;
};

export default LatestStory;
