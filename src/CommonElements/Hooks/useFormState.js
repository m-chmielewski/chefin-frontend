import { useState, useCallback } from "react";

import { validator } from "../Utils/validator";
import { postToBackend } from "../Utils/postToBackend";

export const useFormState = (
 data,
 backendURL,
 validationCriteria,
 revertToInitialState
) => {
 const [formState, setFormState] = useState({ dropdowns: [false] });

 const handleSubmit = event => {
  event.preventDefault();

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
      revertToInitialState();
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

 const dropdownsHandle = useCallback((isDown, index) => {
  if (!index) {
   setFormState(current => {
    const mutableArray = current.dropdowns.map(() => false);
    return {
     ...current,
     dropdowns: mutableArray,
    };
   });
  } else {
   setFormState(current => {
    const mutableArray = [...current.dropdowns];
    mutableArray[index] = isDown;
    return {
     ...current,
     dropdowns: mutableArray,
    };
   });
  }
 }, []);

 return [formState, handleSubmit, dropdownsHandle];
};
