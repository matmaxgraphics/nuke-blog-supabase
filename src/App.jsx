import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header";
import RecentArticle from "./components/recentArticle";
import PopularArticle from "./components/popularArticle";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";
import SingleArticlePage from "./pages/article";
import img1 from "./assets/img-1.png";
import img2 from "./assets/img-2.png";
import img3 from "./assets/img-3.png";

// import "./App.css";
import "./sass/main.scss";

const articlesData = [
  {
    id: 1,
    title: 'Everyday lifestyle of different activities',
    date: 'SEPTEMBER 06, 2022',
    image: img1,
  },
  {
    id: 2,
    title: 'Another interesting article',
    date: 'SEPTEMBER 10, 2022',
    image: img2,
  },
  {
    id: 3,
    title: 'Everyday lifestyle of different activities',
    date: 'SEPTEMBER 10, 2022',
    image: img3,
  },
  {
    id: 4,
    title: 'Another interesting article',
    date: 'SEPTEMBER 10, 2022',
    image: img2,
  },
  // Add more articles as needed
];


function App() {
  return (
    <>
      <Header />
      <RecentArticle articles={articlesData} />
      <PopularArticle />
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
