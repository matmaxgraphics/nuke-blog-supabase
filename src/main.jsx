import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SingleArticlePage from "./pages/article";
import ArticlesPage from "./pages/articles";
import Categories from "./pages/categories.jsx";
import ContactForm from "./pages/contact";
import AdminLoginForm from "./admin/admin-login";
import CreatePost from "./admin/posts/create";
import ManagePost from "./admin/posts/index";
import EditPost from "./admin/posts/edit.jsx";
import CreateCategory from "./admin/categories/create-category";
import ManageCategory from "./admin/categories/index-category";
import EditCategory from "./admin/categories/edit-category.jsx";
import ManageUser from "./admin/users/index-user";
import CreateUser from "./admin/users/create-user";
import Test from "./pages/test";
import Users from "./components/Users";
import CustomDropdown from "./pages/CustomDropdown";
// import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: `single-article/:id`,
    element: <SingleArticlePage />,
  },
  {
    path: "all-articles",
    element: <ArticlesPage />,
  },
  ,
  {
    path: "posts-category/:id",
    element: <Categories />,
  },
  {
    path: "contact-page",
    element: <ContactForm />,
  },
  {
    path: "admin-panel/admin-login",
    element: <AdminLoginForm />,
  },
  {
    path: "admin-panel/create-post",
    element: <CreatePost />,
  },
  {
    path: "admin-panel/manage-post",
    element: <ManagePost />,
  },
  {
    path: "admin-panel/edit-post/:id",
    element: <EditPost />,
  },
  {
    path: "admin-panel/create-category",
    element: <CreateCategory />,
  },
  {
    path: "admin-panel/manage-category",
    element: <ManageCategory />,
  },
  {
    path: "admin-panel/edit-category/:id",
    element: <EditCategory />,
  },
  {
    path: "admin-panel/manage-users",
    element: <ManageUser />,
  },
  {
    path: "admin-panel/create-user",
    element: <CreateUser />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "api-test",
    element: <Users />,
  },
  {
    path: "dropdown-test",
    element: <CustomDropdown />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
