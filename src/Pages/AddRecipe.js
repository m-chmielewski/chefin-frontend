import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./AddRecipe.css";

import { useFormState } from "../CommonElements/Hooks/useFormState";
import { useFormData } from "../CommonElements/Hooks/useFormData";
import { validationCriteria } from "../CommonElements/Utils/validator";
import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import SuggestiveInput from "../CommonElements/SuggestiveInput";
import Button from "../CommonElements/Button";
import AddItemButton from "../CommonElements/AddItemButton";
import SubmitSection from "../CommonElements/SubmitSection";

const randomIdPrefix = Date.now().toString(); //To stop browsers from making input suggestions

const AddRecipe = () => {
 const {
  formData,
  handleSimpleInputChange,
  handleNestedInputChange,
  handleAddRow,
  handleRemoveRow,
 } = useFormData({
  ingredients: [{ name: "", quantity: "" }],
  steps: [""],
  name: "",
  reference: "",
 });

 const formValidationCriteria = {
  name: validationCriteria.REQUIRED,
  reference: validationCriteria.REQUIRED,
 };

 const [formState, handleSubmit] = useFormState(
  formData,
  `${process.env.REACT_APP_BACKEND_URL}/recipes/create`,
  formValidationCriteria
 );

 const [productsList, setProductsList] = useState();

 useEffect(() => {
  Axios.get(
   `${process.env.REACT_APP_SHOPPIN_BACKEND_URL}/products/eatable`
  ).then(products => {
   setProductsList(products.data.map(product => product.name));
  });
 }, []);

 if (!productsList) {
  return <div>Loading...</div>;
 }

 return (
  <PageContent className="add-recipe">
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
           id={`${randomIdPrefix}-${index}`}
           value={ingredient.name}
           placeholder="Ingredient"
           label="Ingredient name"
           groupName="ingredients"
           fieldName="name"
           options={productsList}
           onInputChange={handleNestedInputChange}
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
    <SubmitSection formState={formState} />
   </form>
  </PageContent>
 );
};

export default AddRecipe;
