import React from "react";

import "./Card.css";

const Card = props => {
 return (
  <div
   className="card"
   style={{ flexDirection: props.direction }}
  >
   {props.children}
  </div>
 );
};

export default Card;
