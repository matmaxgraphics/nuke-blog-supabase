import React, { useState, useEffect } from "react";
import CreateRecord from "../../Utils/CreateRecord";
import { Link, useNavigate } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";

const CreateCategory = function () {
  const navigate = useNavigate()
  const [category, setCategory] = useState("");
  const [catDescription, setCatDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await CreateRecord("post-categories", {
        category_name: category,
        category_description: catDescription,
      });

      if (data) {
        console.log("category created succesfully", data);
        setCategory("");
        setCatDescription("");
        navigate('../admin-panel/manage-category')
      }
    } catch (error) {
      console.error("Error uploading image or creating post:", error);
    }
  };
  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Add Category</h4>
        <Link to="/admin-panel/manage-category" className="link-btn">
          Manage categories
        </Link>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Category Name</label>
            <input
              type="text"
              name="title"
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Description (Optional)</label>
            <input
              type="text"
              name="description"
              className="input-field"
              value={catDescription}
              onChange={(e) => setCatDescription(e.target.value)}
            />
          </div>

          <div className="btn-wrap">
            <button type="submit" className="btn">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </PanelMainLayout>
  );
};

export default CreateCategory;
