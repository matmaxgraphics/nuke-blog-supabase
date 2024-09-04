import React from "react";
import { Link } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";

const ManageUser = function () {
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
    </PanelMainLayout>
  );
};

export default ManageUser;
