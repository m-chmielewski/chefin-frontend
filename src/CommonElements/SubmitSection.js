import React from "react";

import "./SubmitSection.css";

import Button from "./Button";
import FormAlert from "./FormAlert";

const SubmitSection = ({ formState }) => {
 return (
  <div className="submit-section-wrapper">
   {formState?.valuesMissing || formState?.submittedSuccessfully ? (
    <FormAlert success={formState.submittedSuccessfully}>
     {formState?.valuesMissing && "Please provide all values"}
     {formState?.submittedSuccessfully && "Sent successfully"}
    </FormAlert>
   ) : null}
   <Button
    variant="neutral"
    inactive={formState?.submitting}
    type="submit"
   >
    {formState?.submitting && !formState?.valuesMissing
     ? "Submitting..."
     : "Submit"}
   </Button>
  </div>
 );
};

export default SubmitSection;
