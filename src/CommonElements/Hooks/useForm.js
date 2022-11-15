import { useState } from "react";

export const useForm = (postToBackend, backendURL) => {
 const [formState, setFormState] = useState();

 const handleSubmit = event => {
  event.preventDefault();

  let valuesMissing = false;

  Object.values(formState.data).forEach(value => {
   valuesMissing = valuesMissing || !value;
  });

  setFormState(current => {
   return {
    ...current,
    submitting: true,
    valuesMissing: valuesMissing,
   };
  });

  if (!valuesMissing) {
   postToBackend(backendURL, formState.data).then(result => {
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
