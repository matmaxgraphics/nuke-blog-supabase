import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import DeleteRecord from "../../Utils/DeleteRecord";
import moment from "moment";
import PanelMainLayout from "../../layout/PanelMainLayout";

// import sidebar from "../../components/sidebar";

const ManagePost = function () {
  const [posts, setPosts] = useState();
  const [orderBy, setOrderBy] = useState("created_at");
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setPosts(null);
        console.log("Error fetching posts");
      }

      if (data) {
        setPosts(data);
        console.log("The fetched data:", data);
      }
    };

    fetchPosts();
  }, [orderBy]);

  const handleDelete = async(id)=>{
    try{
      await DeleteRecord("blog-posts", id)
      setPosts(posts.filter((post)=> post.id !== id))
      console.log(`Post with id: ${id} deleted successfully`);
      
    } catch(error){
      console.error("Error deleting post:", error);
      
    }
  }

  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Manage Posts</h4>
        <Link to="/admin-panel/create-post" className="link-btn">
          Create Post
        </Link>
      </div>
      <div className="content">
        <section className="articles--container recent-article--section">
          <main className="blog-cards--wrapper">
            {posts &&
              posts.map((post, index) => (
                <article className="blog-card--container" key={post.id}>
                  <img
                    src={post.image}
                    alt=""
                    className="blog-display--image"
                  />
                  <div className="blog-details">
                    <Date date={post.created_at} />
                    <h4 className="blog-title">{post.title}</h4>
                  </div>

                  <div className="card--info">
                    <div className="post--author">
                      <i className="ri-user-line"></i> <small>Mateen</small>
                    </div>
                    <div className="post--index">
                      <i className="ri-file-list-2-line"></i>{" "}
                      <small>
                        <span className="post--number">{index + 1} / </span>
                        <span className="posts--length">{posts.length}</span>
                      </small>
                    </div>
                  </div>

                  <div className="btn-group">
                    <Link to={`../admin-panel/edit-post/${post.id}`} className="link-btn edit">edit</Link>
                    <a className="link-btn delete" onClick={()=> handleDelete(post.id)}>delete</a>
                    <a className="link-btn publish">unpublish</a>
                  </div>
                </article>
              ))}
          </main>
        </section>
      </div>
    </PanelMainLayout>
  );
};

const Date = ({ date }) => {
  const dateString = moment(date).format("MMMM Do YYYY");
  return <small className="blog-upload--date">{dateString}</small>;
};

export default ManagePost;
