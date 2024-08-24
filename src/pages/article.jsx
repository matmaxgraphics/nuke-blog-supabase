import React from "react";
import Navbar from "../components/navbar";
import Newsletter from "../components/newsletter";
import Footer from "../components/footer";
import SingleArticle from "../components/singleArticle";


const SingleArticlePage = () => {
  return (
    <>
      <Navbar />
      <SingleArticle/>
      <Newsletter />
      <Footer />
    </>
  );
};

export default SingleArticlePage;
