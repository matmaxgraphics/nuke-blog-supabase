import React from "react";
import { Outlet, Link } from "react-router-dom";
import img1 from "../../assets/img-1.png";
import img2 from "../../assets/img-2.png";
import img3 from "../../assets/img-3.png";
import img4 from "../../assets/img-4.png";
import PanelMainLayout from "../../layout/PanelMainLayout";


// import sidebar from "../../components/sidebar";

const ManagePost = function () {
  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Manage Posts</h4>
        <Link to="/admin-panel/create-post" className="link-btn">
          Create Post
        </Link>
      </div>
      <div className="content">
        <section className="articles--container recent-article--section">
          <main className="blog-cards--wrapper">
            <article className="blog-card--container">
              <img src={img1} alt="" className="blog-display--image" />
              <div className="blog-details">
                <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
                <h4 className="blog-title">
                  Everyday lifestyle of different activities
                </h4>
              </div>

              <div className="card--info">
                <div className="post--author">
                <i className="ri-user-line"></i> <small>Mateen</small>
                </div>
                <div className="post--index">
                  <i className="ri-file-list-2-line"></i>{" "}
                  <small>
                    <span className="post--number">1 / </span>
                    <span className="posts--length">05</span>
                  </small>
                </div>
              </div>

              <div className="btn-group">
                <a className="link-btn edit">edit</a>
                <a className="link-btn delete">delete</a>
                <a className="link-btn publish">unpublish</a>
              </div>
            </article>
            <article className="blog-card--container">
              <img src={img1} alt="" className="blog-display--image" />
              <div className="blog-details">
                <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
                <h4 className="blog-title">
                  Everyday lifestyle of different activities
                </h4>
              </div>

              <div className="card--info">
                <div className="post--author">
                <i className="ri-user-line"></i> <small>Mateen</small>
                </div>
                <div className="post--index">
                  <i className="ri-file-list-2-line"></i>{" "}
                  <small>
                    <span className="post--number">2 / </span>
                    <span className="posts--length">05</span>
                  </small>
                </div>
              </div>

              <div className="btn-group">
                <a className="link-btn edit">edit</a>
                <a className="link-btn delete">delete</a>
                <a className="link-btn publish">unpublish</a>
              </div>
            </article>

            <article className="blog-card--container">
              <img src={img1} alt="" className="blog-display--image" />
              <div className="blog-details">
                <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
                <h4 className="blog-title">
                  Everyday lifestyle of different activities
                </h4>
              </div>

              <div className="card--info">
                <div className="post--author">
                <i className="ri-user-line"></i> <small>Mateen</small>
                </div>
                <div className="post--index">
                  <i className="ri-file-list-2-line"></i>{" "}
                  <small>
                    <span className="post--number">3 / </span>
                    <span className="posts--length">05</span>
                  </small>
                </div>
              </div>

              <div className="btn-group">
                <a className="link-btn edit">edit</a>
                <a className="link-btn delete">delete</a>
                <a className="link-btn publish">unpublish</a>
              </div>
            </article>

            <article className="blog-card--container">
              <img src={img1} alt="" className="blog-display--image" />
              <div className="blog-details">
                <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
                <h4 className="blog-title">
                  Everyday lifestyle of different activities
                </h4>
              </div>

              <div className="card--info">
                <div className="post--author">
                <i className="ri-user-line"></i> <small>Mateen</small>
                </div>
                <div className="post--index">
                  <i className="ri-file-list-2-line"></i>{" "}
                  <small>
                    <span className="post--number">4 / </span>
                    <span className="posts--length">05</span>
                  </small>
                </div>
              </div>

              <div className="btn-group">
                <a className="link-btn edit">edit</a>
                <a className="link-btn delete">delete</a>
                <a className="link-btn publish">unpublish</a>
              </div>
            </article>

            <article className="blog-card--container">
              <img src={img1} alt="" className="blog-display--image" />
              <div className="blog-details">
                <small className="blog-upload--date">SEPTEMBER 06, 2022</small>
                <h4 className="blog-title">
                  Everyday lifestyle of different activities
                </h4>
              </div>

              <div className="card--info">
                <div className="post--author">
                <i className="ri-user-line"></i> <small>Mateen</small>
                </div>
                <div className="post--index">
                  <i className="ri-file-list-2-line"></i>{" "}
                  <small>
                    <span className="post--number">5 / </span>
                    <span className="posts--length">05</span>
                  </small>
                </div>
              </div>

              <div className="btn-group">
                <a className="link-btn edit">edit</a>
                <a className="link-btn delete">delete</a>
                <a className="link-btn publish">unpublish</a>
              </div>
            </article>
          </main>
        </section>
      </div>
    </PanelMainLayout>
  );
};

export default ManagePost;
