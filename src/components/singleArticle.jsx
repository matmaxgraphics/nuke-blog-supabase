import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import moment from "moment";

const SingleArticle = () => {
  const { id } = useParams();
  const [singleArticle, setSingleArticle] = useState();

  const articleUrl = window.location.href;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        console.log("error populating page: ", error);
      }
      if (data) {
        setSingleArticle(data);
        console.log(data);
      }
    };
    fetchData();
  }, [id]);

  if (!singleArticle) {
    return <div>Loading...</div>;
  }
  return (
    <main className="post--wrapper">
      <PostBreadcrumb category={singleArticle.category} />
      <PostHeader
        title={singleArticle.title}
        date={singleArticle.created_at}
        image={singleArticle.image}
      />
      <PostBodyContent body={singleArticle.body} />
      <ArticleSharing
        articleUrl={articleUrl}
        articleTitle={singleArticle.title}
      />
    </main>
  );
};

const PostBreadcrumb = ({ category }) => {
  return (
    <section className="breadcrumb-container max-width">
      <article className="breadcrumb--wrapper">
        <span>
          <a href="">Home / </a>
        </span>
        <span>
          <a href="">{category}</a>
        </span>
      </article>
    </section>
  );
};
const PostHeader = ({ title, date, image }) => {
  const dateString = moment(date).format("MMMM Do YYYY");
  return (
    <section className="banner--container section-flex max-width">
      <article className="text-description">
        <div className="date--duration-tag">
          <small className="date-tag">{dateString}</small>
          <span className="circle"></span>
          <small className="duration">6 min read</small>
        </div>

        <h1>{title}</h1>
      </article>

      <article className="img-container">
        <img src={image} alt="" />
      </article>
    </section>
  );
};

const PostBodyContent = ({ body }) => {
  return (
    <section className="article-container max-width_1200">
      <div>{body}</div>
    </section>
  );
};

const ArticleSharing = ({ articleUrl, articleTitle }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    console.log("Link copied to clipboard");
  };

  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      articleUrl
    )}&text=${encodeURIComponent(articleTitle)}`,
  };

  return (
    <section className="share-post max-width">
      <hr />
      <div className="share-wrapper flex">
        <h5>Share this post</h5>
        <div className="sharing-links">
          <span className="copy-link" onClick={handleCopyLink}>
            <i className="ri-file-copy-line"></i> Copy link
          </span>
          <span>
            <a
              href={socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
          </span>
          <span>
            <a
              href={socialMediaLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-linkedin-box-fill"></i>
            </a>
          </span>
          <span>
            <a
              href={socialMediaLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SingleArticle;
