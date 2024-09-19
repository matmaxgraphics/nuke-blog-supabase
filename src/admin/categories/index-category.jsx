import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import DeleteRecord from "../../Utils/DeleteRecord";
import AdminLoader from "../../components/AdminLoader";
import DeleteButton from "../../Utils/DeleteButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCategory = function () {
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true });
    }

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
  }, [location.state]);

  const handleDelete = async (id) => {
      await DeleteRecord("post-categories", id);
      setCategories(categories.filter((category) => category.id !== id));    
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
        {isLoading ? (
          <AdminLoader />
        ) : (
          categories && (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>{category.category_description || "no description"}</td>
                    <td>
                      <Link
                        to={`../admin-panel/edit-category/${category.id}`}
                        className="edit"
                      >
                        edit
                      </Link>
                    </td>
                    <td>
                    <DeleteButton onDelete={() => handleDelete(category.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
      <ToastContainer/>
    </PanelMainLayout>
  );
};

export default ManageCategory;
