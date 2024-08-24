import React from "react";
import Navbar from "../components/navbar";
import Newsletter from "../components/newsletter";
import Footer from "../components/footer";
import AllArticles from "../components/allArticles";

const ArticlesPage = () => {
  return (
    <>
      <Navbar />
      <AllArticles />
      <Newsletter />
      <Footer />
    </>
  );
};

export default ArticlesPage;