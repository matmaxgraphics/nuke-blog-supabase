import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient"; // Update this path if necessary

const UseFetchPosts = (rangeStart = 0, rangeEnd = 4, orderBy = "created_at") => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .range(rangeStart, rangeEnd)
        .order(orderBy, { ascending: false });

      if (error) {
        setError(error);
        setPosts(null);
      }

      if (data) {
        setPosts(data);
        setError(null);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [rangeStart, rangeEnd, orderBy]);

  return { posts, isLoading, error };
};

export default UseFetchPosts;
