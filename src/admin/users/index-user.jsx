import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";
import AdminLoader from "../../components/AdminLoader";
import DeleteButton from "../../Utils/DeleteButton";
import Modal from "../../Utils/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://abiola3on-blog-backend.onrender.com";

const ManageUser = function () {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true });
    }
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data) {
          console.log("Users:", data);
          setUsers(data.users.users);
        } 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, [location.state]);
  console.log(users);

  //DELETE USER
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_USER_API_URL}/delete-user/${userId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Manage Users</h4>
        <Link to="/admin-panel/create-user" className="link-btn">
          Add User
        </Link>
      </div>

      <div className="content">
        {isLoading ? (
          <AdminLoader />
        ) : (
          users && (
            <table>
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col" colSpan="2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td data-label="S/N">{index + 1}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Role">
                      {user.user_metadata?.role || "User"}
                    </td>
                    <td data-label="Status">
                      {user.confirmed_at ? "Verified" : "Not verified"}
                    </td>
                    <td data-label="Action">
                      <DeleteButton
                        onDelete={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>

      <ToastContainer />
    </PanelMainLayout>
  );
};

export default ManageUser;
