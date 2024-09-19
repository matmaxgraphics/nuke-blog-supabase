import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import DeleteRecord from "../../Utils/DeleteRecord";
import AdminLoader from "../../components/AdminLoader";
import Modal from "../../Utils/Modal";
import DeleteButton from "../../Utils/DeleteButton";
import moment from "moment";
import PanelMainLayout from "../../layout/PanelMainLayout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import sidebar from "../../components/sidebar";

const ManagePost = function () {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("created_at");
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true });
    }
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blog-posts")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setPosts(null);
        console.log("Error fetching posts");
        toast.error("Network error. Please refresh the page.");
      }

      if (data) {
        setPosts(data);
        console.log("The fetched data:", data);
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoading(false);
    };

    fetchPosts();
  }, [orderBy, location.state]);

  const handleOpenModal = (postId) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  const handleDelete = async (id) => {
    await DeleteRecord("blog-posts", id);
    setPosts(posts.filter((post) => post.id !== id));
  };

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
            {isLoading ? (
              <AdminLoader />
            ) : (
              posts &&
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
                      <i className="ri-user-line"></i>{" "}
                      <small>{post.author ?? "unknown"}</small>
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
                    <Link
                      to={`../admin-panel/edit-post/${post.id}`}
                      className="link-btn edit"
                    >
                      edit
                    </Link>
                    <DeleteButton onDelete={() => handleDelete(post.id)} />
                    <a className="link-btn publish">unpublish</a>
                  </div>
                </article>
              ))
            )}
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title={"Confirm Action"}
              onConfirm={() => handleDelete(selectedPostId)}
            >
              <p>Are you sure you want to delete this post?</p>
            </Modal>
          </main>
        </section>
      </div>
      <ToastContainer />
    </PanelMainLayout>
  );
};

const Date = ({ date }) => {
  const dateString = moment(date).format("MMMM Do YYYY");
  return <small className="blog-upload--date">{dateString}</small>;
};

export default ManagePost;
