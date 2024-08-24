import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "./useFetchData";
import newsImage1 from "../assets/news-img1.png";
import articleImg from "../assets/article-img.png";

const SingleArticle = () => {
  const { id } = useParams();
  const {data} = useFetchData(`https://jsonplaceholder.typicode.com/posts/${id}`)

  if(!data) {
    return <div>Loading...</div>
  }
  return (
    <main className="post--wrapper">
      <PostBreadcrumb />
      <PostHeader title={data.title} date="4th January, 2023"/>
      <PostBodyContent body={data.body}/>
      <ArticleSharing />
    </main>
  );
};

const PostBreadcrumb = () => {
  return (
    <section className="breadcrumb-container max-width">
      <article className="breadcrumb--wrapper">
        <span>
          <a href="">Home / </a>
        </span>
        <span>
          <a href="">Lifestyle</a>
        </span>
      </article>
    </section>
  );
};
const PostHeader = ({title, date}) => {
  return (
    <section className="banner--container section-flex max-width">
      <article className="text-description">
        <div className="date--duration-tag">
          <small className="date-tag">{date}</small>
          <span className="circle"></span>
          <small className="duration">6 min read</small>
        </div>

        <h1>{title}</h1>
      </article>

      <article className="img-container">
        <img src={newsImage1} alt="" />
      </article>
    </section>
  );
};

const PostBodyContent = ({body}) => {
  return (
    <section className="article-container max-width_1200">
      <div>{body}</div>
    </section>
  );
};

const ArticleSharing = () => {
  return (
    <section className="share-post max-width">
      <hr />
      <div className="share-wrapper flex">
        <h5>Share this post</h5>
        <div className="sharing-links">
          <span className="copy-link">
            <i className="ri-file-copy-line"></i> Copy link
          </span>
          <span>
            <i className="ri-facebook-circle-fill"></i>
          </span>
          <span>
            <i className="ri-linkedin-box-fill"></i>
          </span>
          <span>
            <i className="ri-twitter-x-fill"></i>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SingleArticle;
