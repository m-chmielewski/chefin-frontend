import React from "react";

import "./AddItemButton.css";

const AddItemButton = props => {
 return (
  <button
   onClick={props.onClick}
   className="add-item-btn"
   type="button"
  >
   +
  </button>
 );
};

export default AddItemButton;
