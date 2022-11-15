import { useState } from "react";

import { validator } from "../Utils/validator";
import { postToBackend } from "../Utils/postToBackend";

export const useFormState = (data, backendURL, validationCriteria) => {
 const [formState, setFormState] = useState();

 const handleSubmit = event => {
  event.preventDefault();

  console.log(data);

  const formInvalid = validator(data, validationCriteria);

  setFormState(current => {
   return {
    ...current,
    submitting: true,
    valuesMissing: formInvalid,
   };
  });

  if (!formInvalid) {
   postToBackend(data, backendURL).then(result => {
    if (result === 200) {
     setFormState(current => {
      return {
       ...current,
       submittedSuccessfully: true,
      };
     });
     setTimeout(() => {
      setFormState(current => {
       return {
        ...current,
        submitting: false,
        submittedSuccessfully: null,
       };
      });
     }, 2000);
    }
   });
  } else {
   setTimeout(() => {
    setFormState(current => {
     return {
      ...current,
      submitting: false,
      valuesMissing: false,
      submittedSuccessfully: null,
     };
    });
   }, 2000);
  }
 };

 return [formState, handleSubmit];
};
