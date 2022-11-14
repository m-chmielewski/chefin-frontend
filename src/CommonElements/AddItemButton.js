import React from "react";

import "./AddItemButton.css";

const AddItemButton = props => {
 return (
  <button
   onClick={props.onClick}
   className="add-item-btn"
  >
   +
  </button>
 );
};

export default AddItemButton;
