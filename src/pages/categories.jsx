import PostsCategory from "../components/PostsCategory";
import Navbar from "../components/navbar";
import Newsletter from "../components/newsletter";
import Footer from "../components/footer";

import React from "react";

const Categories = () => {
  return (
    <>
      <Navbar />
      <PostsCategory />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Categories;
