import { useState, useCallback } from "react";

export const useFormData = initialState => {
 const [formData, setFormData] = useState(initialState);

 const handleSimpleInputChange = (inputName, value) => {
  setFormData(current => {
   return {
    ...current,
    [inputName]: value,
   };
  });
 };

 const handleNestedInputChange = useCallback(
  (value, index, groupName, fieldName) => {
   if (groupName && !fieldName) {
    setFormData(current => {
     const mutableArray = [...current[groupName]];
     mutableArray[index] = value;
     return {
      ...current,
      [groupName]: mutableArray,
     };
    });
   }

   if (groupName && fieldName) {
    setFormData(current => {
     const mutableArray = [...current[groupName]];
     mutableArray[index] = {
      ...current[groupName][index],
      [fieldName]: value,
     };
     return {
      ...current,
      [groupName]: mutableArray,
     };
    });
   }
  },
  []
 );

 const handleAddRow = (groupName, data) => {
  setFormData(current => {
   return {
    ...current,
    [groupName]: [...current[groupName], data],
   };
  });
 };

 const handleRemoveRow = (index, groupName) => {
  setFormData(current => {
   const mutableArray = [...current[groupName]];
   mutableArray.splice(index, 1);
   return {
    ...current,
    [groupName]: mutableArray,
   };
  });
 };

 const revertToInitialState = () => {
  setFormData(initialState);
 };

 return {
  formData: formData,
  handleSimpleInputChange: handleSimpleInputChange,
  handleNestedInputChange: handleNestedInputChange,
  handleAddRow: handleAddRow,
  handleRemoveRow: handleRemoveRow,
  revertToInitialState: revertToInitialState,
 };
};
