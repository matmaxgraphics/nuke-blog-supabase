import React from "react";
import { Link } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";

const CreateUser = function () {
  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Create User</h4>
        <Link to="/admin-panel/manage-users" className="link-btn">
          Manage Users
        </Link>
      </div>

      <div className="content">
        <h2 className="page-title">Create User</h2>
        <form>
          <div>
            <label>Username</label>
            <input type="text" name="username" className="input-field" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" className="input-field" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" className="input-field" />
          </div>

          <div>
            <label>Comfirm Password</label>
            <input
              type="password"
              name="passwordConf"
              className="input-field"
            />
          </div>

          <div>
            <label>User</label>
            <select name="role" className="input-field">
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="btn-wrap">
            <button type="submit" className="btn">
              Add user
            </button>
          </div>
        </form>
      </div>
    </PanelMainLayout>
  );
};

export default CreateUser;
