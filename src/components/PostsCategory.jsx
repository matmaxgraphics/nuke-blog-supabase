import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import SkeletonLoader from "./SkeletonLoader";
import Date from "../Utils/Date";

function PostsCategory() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    
    const fetchPostsAndCategory = async () => {
      // Fetch posts by category
      const { data: postsData, error: postsError } = await supabase
        .from("blog-posts")
        .select()
        .eq("category_id", id);
        
      if (postsError) {
        console.log("Error fetching posts for category:", postsError);
      } else {
        setPosts(postsData);
      }

      // Fetch category name
      const { data: categoryData, error: categoryError } = await supabase
        .from("post-categories")
        .select("category_name")
        .eq("id", id)
        .single();
      
      if (categoryError) {
        console.log("Error fetching category name:", categoryError);
      } else {
        setCategoryName(categoryData?.category_name || "Unknown");
      }

      setIsLoading(false);
    };

    fetchPostsAndCategory();
  }, [id]);

  return (
    <section className="recent-article--section max-width">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <h2>Posts under {categoryName} category</h2>
          <main className="blog-cards--wrapper">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <article className="blog-card--container" key={index}>
                  <Link to={`/single-article/${post.id}`}>
                    <img src={post.image} alt="" className="blog-display--image" />
                    <div className="blog-details">
                      <Date date={post.created_at} />
                      <h4 className="blog-title">{post.title}</h4>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p>No posts found in this category.</p>
            )}
          </main>
        </>
      )}
      
    </section>
  );
}

export default PostsCategory;
