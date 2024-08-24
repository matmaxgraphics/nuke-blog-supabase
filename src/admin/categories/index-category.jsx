import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import DeleteRecord from "../../Utils/DeleteRecord";
import { Link } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";

const ManageCategory = function () {
  const [categories, setCategories] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await DeleteRecord("post-categories", id);
      setCategories(categories.filter((category) => category.id !== id));
      console.log(`Category with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Manage Categories</h4>
        <Link to="/admin-panel/create-category" className="link-btn">
          Create Category
        </Link>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Description</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          {categories && (
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.category_name}</td>
                  <td>{category.category_description || "no description"}</td>
                  <td>
                    <Link to={`../admin-panel/edit-category/${category.id}`} className="edit">
                      edit
                    </Link>
                  </td>
                  <td>
                    <a
                      className="delete"
                      onClick={() => handleDelete(category.id)}
                    >
                      delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </PanelMainLayout>
  );
};

export default ManageCategory;
