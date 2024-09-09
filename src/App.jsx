import { useState, useEffect } from "react";
import Header from "./components/Header";
import RecentArticle from "./components/recentArticle";
import PopularArticle from "./components/popularArticle";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";
import "./sass/main.scss";
import emptyImg from "./assets/empty-state.png"
import supabase from "./config/supabaseClient";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error fetching posts:", error);
        setPosts([]);
      } else if (data) {
        setPosts(data);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      
      {/* Conditionally render Recent and Popular Articles based on whether posts exist */}
      {!isLoading && posts.length > 0 ? (
        <>
          <RecentArticle posts={posts} />
          <PopularArticle posts={posts} />
        </>
      ) : (
        // Render a placeholder or nothing when there are no articles
        !isLoading && (
          <div className="empty-state">
            <img src={emptyImg} alt="" />
            <p>No articles yet, check back later!</p>
          </div>
        )
      )}

      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
