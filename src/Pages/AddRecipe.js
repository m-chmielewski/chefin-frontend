import React, { useState, useEffect } from "react";
import Axios from "axios";

import { useFormData, useFormState } from "@mchm/common";
import { validationCriteria } from "@mchm/common";
import {
 AddItemButton,
 Button,
 Card,
 PageContent,
 SubmitSection,
 SuggestiveInput,
} from "@mchm/common";

const randomIdPrefix = Date.now().toString(); //To stop browsers from making input suggestions

const AddRecipe = () => {
 const {
  formData,
  handleSimpleInputChange,
  handleNestedInputChange,
  handleAddRow,
  handleRemoveRow,
  revertToInitialState,
 } = useFormData({
  ingredients: [{ name: "", quantity: "" }],
  steps: [""],
  name: "",
  reference: "",
  notes: "",
 });

 const formValidationCriteria = {
  name: validationCriteria.REQUIRED,
 };

 const [formState, handleSubmit, dropdownsHandle] = useFormState(
  formData,
  `${process.env.REACT_APP_BACKEND_URL}/recipes/create`,
  formValidationCriteria,
  revertToInitialState
 );

 const [productsList, setProductsList] = useState();

 useEffect(() => {
  Axios.get(
   `${process.env.REACT_APP_SHOPPIN_BACKEND_URL}/products/eatable`
  ).then(products => {
   setProductsList(products.data.map(product => product.name));
  });

  const html = document.getElementsByTagName("html")[0];

  html.addEventListener("keydown", event => {
   if (
    event.key === "Enter" &&
    event.target.type !== "submit" &&
    event.target.type !== "textarea"
   ) {
    event.preventDefault();

    event.target.click();
   }
  });

  html.addEventListener("click", event => {
   if (
    !event.target.id.startsWith(`${randomIdPrefix}-ingredient`) &&
    !event.target.className.startsWith("add-item-btn")
   )
    dropdownsHandle(false);
  });
 }, [dropdownsHandle]);

 useEffect(() => {
  const elementToFocus = document.getElementById(
   `${randomIdPrefix}-ingredient-${formData.ingredients.length - 1}`
  );

  focusOnAddedElement(elementToFocus);
 }, [formData.ingredients.length]);

 useEffect(() => {
  const elementToFocus = document.getElementById(
   `${randomIdPrefix}-step-${formData.steps.length - 1}`
  );

  focusOnAddedElement(elementToFocus);
 }, [formData.steps.length]);

 const focusOnAddedElement = element => {
  if (element) {
   element.scrollIntoView();
   element.focus();
  }
 };

 useEffect(() => {
  window.scrollTo(0, document.body.scrollHeight);
 }, [formState.submitting]);

 if (!productsList) {
  return <div>Loading...</div>;
 }

 return (
  <PageContent>
   <h1>Add recipe</h1>
   <form onSubmit={event => handleSubmit(event)}>
    <fieldset>
     <legend>General</legend>
     <Card>
      <label htmlFor={`${randomIdPrefix}-recipe-name`}>Recipe name</label>
      <input
       id={`${randomIdPrefix}-recipe-name`}
       type="text"
       value={formData.name}
       onChange={event => {
        handleSimpleInputChange("name", event.target.value);
       }}
       placeholder="Name"
      />
      <label htmlFor={`${randomIdPrefix}-reference`}> Reference recipe</label>
      <input
       id={`${randomIdPrefix}-reference`}
       type="text"
       value={formData.reference}
       onChange={event => {
        handleSimpleInputChange("reference", event.target.value);
       }}
       placeholder="Reference"
      />
     </Card>
    </fieldset>
    <fieldset>
     <legend>Ingredients</legend>
     <ul>
      {formData.ingredients?.map((ingredient, index) => {
       return (
        <li key={index}>
         <Card>
          <SuggestiveInput
           id={`${randomIdPrefix}-ingredient-${index}`}
           value={ingredient.name}
           placeholder="Ingredient"
           label="Ingredient name"
           groupName="ingredients"
           fieldName="name"
           options={productsList}
           onInputChange={handleNestedInputChange}
           dropdownsHandle={dropdownsHandle}
           listDown={formState.dropdowns[index]}
          />
          <label htmlFor={`${randomIdPrefix}-quantity-${index}`}></label>
          <input
           id={`${randomIdPrefix}-quantity-${index}`}
           type="number"
           value={ingredient.quantity || ""}
           placeholder="Quantity [g]"
           onChange={event =>
            handleNestedInputChange(
             event.target.value,
             index,
             "ingredients",
             "quantity"
            )
           }
          />
          <Button
           variant="negative"
           onClick={() => handleRemoveRow(index, "ingredients")}
          >
           Remove
          </Button>
         </Card>
        </li>
       );
      })}
      <AddItemButton
       onClick={() => handleAddRow("ingredients", { name: "", quantity: "" })}
      />
     </ul>
    </fieldset>
    <fieldset>
     <legend>Steps</legend>
     <ul>
      {formData.steps?.map((step, index) => {
       return (
        <li key={index}>
         <Card direction="row">
          <label htmlFor={`${randomIdPrefix}-step-${index}`}></label>
          <input
           id={`${randomIdPrefix}-step-${index}`}
           value={step}
           placeholder="Step"
           onChange={event =>
            handleNestedInputChange(event.target.value, index, "steps")
           }
          />
          <Button
           variant="negative"
           onClick={() => {
            handleRemoveRow(index, "steps");
           }}
          >
           Remove
          </Button>
         </Card>
        </li>
       );
      })}
      <AddItemButton onClick={() => handleAddRow("steps", "")} />
     </ul>
    </fieldset>
    <fieldset>
     <legend>Notes</legend>
     <Card>
      <label htmlFor={`${randomIdPrefix}-notes`}>Notes</label>
      <textarea
       rows={3}
       id={`${randomIdPrefix}-notes`}
       value={formData.notes}
       onChange={event => {
        handleSimpleInputChange("notes", event.target.value);
       }}
      />
     </Card>
    </fieldset>
    <SubmitSection formState={formState} />
   </form>
  </PageContent>
 );
};

export default AddRecipe;
