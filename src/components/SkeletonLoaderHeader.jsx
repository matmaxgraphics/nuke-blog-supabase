import React from "react";

export default function SkeletonLoaderHeader() {
  return (
    <>
      <div className="skeleton">
        <div className="skeleton-left">
          <div className="line img-demo"></div>
          <div className="line text-demo"></div>
        </div>

        <div className="skeleton-left">
          <div className="line img-demo"></div>
          <div className="line text-demo"></div>
        </div>

        <div className="skeleton-left">
          <div className="line img-demo"></div>
          <div className="line text-demo"></div>
        </div>

        <div className="skeleton-left">
          <div className="line img-demo"></div>
          <div className="line text-demo"></div>
        </div>
      </div>
    </>
  );
}
