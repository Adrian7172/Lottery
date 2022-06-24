import React from "react";
import "./styles.css"
const Card = ({pot}) => {
  return (
  <div className="card">
    {pot=== undefined || pot === 0? "No one applied for lottery": pot}
  </div>);
};

export default Card;
