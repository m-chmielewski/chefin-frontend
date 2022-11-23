import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import { useFormData, useFormState } from "@mchm/common";
import { validationCriteria } from "@mchm/common";
import { PageContent, SelectableCard, SubmitSection } from "@mchm/common";

const AddToShoppingList = () => {
 const { name } = useParams();

 const { formData, handleArrayChange } = useFormData({
  selectedIngredients: [],
 });

 const formValidationCriteria = {
  selectedIngredients: validationCriteria.REQUIRED,
 };

 const [formState, handleSubmit] = useFormState(
  formData,
  `${process.env.REACT_APP_SHOPPIN_BACKEND_URL}/addToList`,
  formValidationCriteria
 );

 const [ingredients, setIngredients] = useState();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${name}`).then(
   response => {
    setIngredients(
     response.data.ingredients.map(ingredient => ingredient.name)
    );
   }
  );
 }, [name]);

 if (!ingredients) {
  return <div>Loading...</div>;
 }

 return (
  <PageContent>
   <form
    onSubmit={event => {
     handleSubmit(event);
    }}
   >
    <fieldset>
     <legend>Ingredients</legend>
     <ul>
      {ingredients.map(ingredient => {
       return (
        <li key={ingredient}>
         <SelectableCard
          selected={formData.selectedIngredients.includes(ingredient)}
          onClick={() => {
           handleArrayChange("selectedIngredients", ingredient);
          }}
         >
          <span>{ingredient}</span>
         </SelectableCard>
        </li>
       );
      })}
     </ul>
    </fieldset>
    <SubmitSection formState={formState} />
   </form>
  </PageContent>
 );
};

export default AddToShoppingList;
