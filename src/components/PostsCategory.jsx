import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

function PostsCategory() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("post-categories").select();

      if (error) {
        setCategories(null);
        console.log("Error fetching categories");
        toast.error("Network error. Please refresh the page.");
      }

      if (data) {
        setCategories(data);
        console.log("The fetched data:", data);
      }
      setIsLoading(false);
    };

    fetchCategories();

    /*const fetchPostsByCategory = async (categoryId) => {
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .eq("category_id", categoryId);

      if (error) {
        console.log("Error fetching posts for category:", error);
      } else {
        console.log("Posts for category:", data);
      }
    };
    fetchPostsByCategory();*/
  }, []);

  return (
  <section className="all-categories">
    <main className="max-width">
      <h1>All Categories</h1>
    <div>PostsCategory</div>
    </main>
  </section>
  )
}

export default PostsCategory;
