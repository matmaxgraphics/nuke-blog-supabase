import React from "react";

export default function SkeletonLoaderHeader() {
  return (
    <>
      <div className="skeleton max-width">
        <div className="skeleton-flex">
          <div className="text--container">
            <div className="line text-demo w100"></div>
            <div className="line text-demo w60"></div>
            <div className="line text-demo w70"></div>
            <div className="line text-demo w100"></div>
            <div className="line text-demo w70"></div>
          </div>
          <div className="line img-demo"></div>
        </div>
      </div>
    </>
  );
}
