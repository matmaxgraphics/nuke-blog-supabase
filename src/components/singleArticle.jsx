import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import SkeletonLoaderText from "./SkeletonLoaderText";
import { FacebookShareButton, FacebookIcon } from "react-share";
import moment from "moment";

const SingleArticle = () => {
  const { id } = useParams();
  const [singleArticle, setSingleArticle] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const articleUrl = window.location.href;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (!singleArticle) {
    return <SkeletonLoaderText />;
  }
  return (
    <main className="post--wrapper">
      <PostBreadcrumb category={singleArticle.category} />
      <PostHeader
        title={singleArticle.title}
        date={singleArticle.created_at}
        image={singleArticle.image}
        duration={singleArticle.body}
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
          <Link to={'/'}>Home / </Link>
        </span>
        <span>
          <a href="">{category}</a>
        </span>
      </article>
    </section>
  );
};
const PostHeader = ({ title, date, image, duration }) => {
  const dateString = moment(date).format("MMMM Do YYYY");

  const wordCount = duration.split(' ').length;
  const wordsPerMinute = 200;
  const estimatedReadingTime = Math.ceil(wordCount / wordsPerMinute)
  return (
    <section className="banner--container section-flex max-width">
      <article className="text-description">
        <div className="date--duration-tag">
          <small className="date-tag">{dateString}</small>
          <span className="circle"></span>
          <small className="duration">{estimatedReadingTime} min read</small>
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
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </section>
  );
};

const ArticleSharing = ({ articleUrl, articleTitle }) => {
  const [copyLinkText, setCopyLinkText] = useState('Copy link')
  const [copyIcon, setCopyIcon] = useState('<i className="ri-file-copy-line"></i>')
  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopyLinkText('Link copied')
    setCopyIcon('<i class="ri-check-double-line"></i>')
    console.log("Link copied to clipboard");

    setTimeout(() => {
      setCopyLinkText("Copy link")
      setCopyIcon(<i className="ri-file-copy-line"></i>)
    }, 5000)
  };

  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}&text=${encodeURIComponent(articleTitle)}`,
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
          <i className="ri-file-copy-line"></i> {copyLinkText}
          </span>
          <span>
            <FacebookShareButton
              url={articleUrl}
              quote={articleTitle}
            >
              <i className="ri-facebook-circle-fill"></i>
            </FacebookShareButton>
            {/* <a
              href={socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
            </a> */}
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
