import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import Button from "../../Utils/Button";
import PanelMainLayout from "../../layout/PanelMainLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "../../components/Editor/Editor";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("post-categories").select();

      if (error) {
        setCategories(null);
        console.log("Error fetching categories");
      }

      if (data) {
        setCategories(data);
        console.log("The fetched data:", data);
      }
    };

    fetchCategories();
  }, []);

  const handleFileUpload = async (file) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append(
      "cloud_name",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
    );
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setLoading(false);
      return res.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await handleFileUpload(image);
        // setImage(imageUrl);
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const user_id = user?.id;

      const author = user?.user_metadata?.full_name;
      setAuthor(author);

      const { data, error } = await supabase
        .from("blog-posts")
        .insert([
          {
            title,
            body,
            image: imageUrl,
            category: selectedCategory,
            category_id: selectedCategoryId,
            user_id,
            author,
          },
        ])
        .select();

      if (error) {
        console.log(error);
        throw error;
      }

      if (data) {
        setTitle("");
        setBody("");
        setImage(null);
        setSelectedCategory("");
        setSelectedCategoryId(""); // Reset the selected category ID
        navigate("../admin-panel/manage-post", {
          state: { message: "Post created successfully!" },
        });
      }
    } catch (error) {
      console.error("Error uploading image or creating post:", error);
      toast.error("Error creating post. Please try again.");
    }
  };
  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Add Post</h4>
        <Link to="/admin-panel/manage-post" className="link-btn">
          Manage posts
        </Link>
      </div>

      <div className="content">
        <h2 className="page-title">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Blog Title</label>
            <input
              type="text"
              name="title"
              className="input-field"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            {/* <label>Body</label> */}
            {/* <textarea
              name="body"
              id="body"
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
            ></textarea> */}
            <Editor value={body} onChange={setBody}/>
          </div>
          <div>
            <label>Cover Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="input-field"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label>Topic</label>
            <select
              name="topic"
              className="input-field"
              value={selectedCategory}
              required
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                const categoryId = categories.find(
                  (category) => category.category_name === e.target.value
                ).id;
                setSelectedCategoryId(categoryId); // Set the selected category ID
              }}
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="btn-wrap">
            <Button
              isLoading={loading}
              buttonText="Create post"
              loadingText="Loading..."
              className="btn"
            />
          </div>
        </form>
      </div>
      <ToastContainer/>
    </PanelMainLayout>
  );
}

export default CreatePost;
