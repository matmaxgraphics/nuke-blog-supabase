import React, {useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";
import AdminLoader from "../../components/AdminLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = function () {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if (location.state?.message) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state])



  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Manage Users</h4>
        <Link to="/admin-panel/create-user" className="link-btn">
          Add User
        </Link>
      </div>

      <div className="content">
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
            <tr>
              <td data-label="S/N">1</td>
              <td data-label="Username">Matmax</td>
              <td data-label="Role">Admin</td>
              <td data-label="Status">Verified</td>
              <td data-label="Action">
                <a href="#" className="delete">delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ToastContainer/>
    </PanelMainLayout>
  );
};

export default ManageUser;
