import React from "react";
import moment from "moment";

const Date = ({ date }) => {
  const dateString = moment(date).format("MMMM Do YYYY");
  return <small className="blog-upload--date">{dateString}</small>;
};

export default Date;
