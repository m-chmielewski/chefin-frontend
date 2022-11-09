import React from "react";

import "./FormAlert.css";

const FormAlert = props => {
 return (
  <div className={`form-alert ${props.success ? "success" : "failure"}`}>
   {props.children}
  </div>
 );
};

export default FormAlert;
