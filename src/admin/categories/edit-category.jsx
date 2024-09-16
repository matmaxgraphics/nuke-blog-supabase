import React, { useState, useEffect } from "react";
import EditRecord from "../../Utils/EditRecord";
import { Link, useNavigate, useParams } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";
import Button from "../../Utils/Button";
import supabase from "../../config/supabaseClient";

const EditCategory = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await EditRecord(
        "post-categories",
        {
          category_name: category,
          category_description: catDescription,
        },
        id
      );

      if (data) {
        console.log("category updated succesfully", data);
        setCategory("");
        setCatDescription("");
        navigate("../admin-panel/manage-category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("post-categories")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        console.log("error populating record");
      }
      if (data) {
        setCategory(data.category_name);
        setCatDescription(data.category_description);
        console.log(data);
      }
    };
    fetchCategories();
  }, [id]);
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
            <Button
              isLoading={isLoading}
              buttonText="Update Category"
              loadingText="Updating..."
              className="btn"
            />
          </div>
        </form>
      </div>
    </PanelMainLayout>
  );
};

export default EditCategory;
