import React from "react";
import useFetchData from "./useFetchData";

function Users() {
  const { data } = useFetchData("https://jsonplaceholder.typicode.com/posts");
  return (
    <div>
      {data &&
        data.map((post) => (
          <div className="text-white" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}

export default Users;
