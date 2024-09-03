import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import PanelMainLayout from "../../layout/PanelMainLayout";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
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

      const { data, error } = await supabase
        .from("blog-posts")
        .insert([{ title, body, image: imageUrl, category: selectedCategory, user_id }])
        .select();

      if (error) {
        console.log(error);
        throw error;
      }

      if (data) {
        console.log("post created successfully:", data);
        setTitle("");
        setBody("");
        setImage(null);
        setSelectedCategory("");
        navigate("../admin-panel/manage-post");
      }
    } catch (error) {
      console.error("Error uploading image or creating post:", error);
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              name="body"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Cover Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="input-field"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label>Topic</label>
            <select
              name="topic"
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
            <button type="submit" className="btn">
              Add post
            </button>
          </div>
        </form>
      </div>
    </PanelMainLayout>
  );
}

export default CreatePost;
