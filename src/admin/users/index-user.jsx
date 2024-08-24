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
        {/* <table>
          <thead>
            <th>S/N</th>
            <th>Username</th>
            <th>Role</th>
            <th colspan="2">Action</th>
          </thead>
          <tbody>
            <tr>
              <td data-label="S/N">1</td>
              <td data-label="Username">Matmax</td>
              <td data-label="Role">Admin</td>
              <td data-label="Action">
                <a href="#" className="edit">
                  edit
                </a>
              </td>
              <td data-label="Action">
                <a href="#" className="delete">
                  delete
                </a>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Ejoke</td>
              <td>Author</td>
              <td>
                <a href="#" class="edit">
                  edit
                </a>
              </td>
              <td>
                <a href="#" class="delete">
                  delete
                </a>
              </td>
            </tr>
          </tbody>
        </table> */}
        <table>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col" colspan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="S/N">1</td>
              <td data-label="Username">Matmax</td>
              <td data-label="Role">Admin</td>
              <td data-label="Action">
                <a href="#" className="edit">edit</a>
              </td>
              <td>
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
