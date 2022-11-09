import React, { useState } from "react";

import "./SubmitButton.css";

import Button from "./Button";

const SubmitButton = props => {
 const [submitting, setSubmitting] = useState(false);

 const [alert, setAlert] = useState();

 return (
  <>
   <div
    className="form-alert"
    style={{ display: alert ? "block" : "none" }}
   >
    {alert}
   </div>
   <Button
    variant="neutral"
    inactive={submitting}
    onClick={() => {
     setSubmitting(true);
    }}
   >
    {submitting ? "Submitting..." : props.children}
   </Button>
  </>
 );
};

export default SubmitButton;
