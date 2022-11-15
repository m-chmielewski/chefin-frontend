import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";

import "./AddRecipe.css";

import { useForm } from "../CommonElements/Hooks/useForm";
import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import SuggestiveInput from "../CommonElements/SuggestiveInput";
import Button from "../CommonElements/Button";
import AddItemButton from "../CommonElements/AddItemButton";

const randomIdPrefix = Date.now().toString(); //To stop browsers from making input suggestions

const AddRecipe = () => {
 const [formState, handleSubmit] = useForm();

 const [formData, setFormData] = useState({
  ingredients: [{ name: "", quantity: "" }],
  steps: [""],
  name: "",
  reference: "",
 });

 const [productsList, setProductsList] = useState();

 useEffect(() => {
  Axios.get(
   `${process.env.REACT_APP_SHOPPIN_BACKEND_URL}/products/eatable`
  ).then(products => {
   setProductsList(products.data.map(product => product.name));
  });
 }, []);

 const handleSuggestiveInputChange = useCallback(inputData => {
  setFormData(current => {
   const mutableIngredients = [...current.ingredients];
   mutableIngredients[inputData.index] = {
    name: inputData.value,
    quantity: current.ingredients[inputData.index].quantity,
   };
   return {
    ...current,
    ingredients: mutableIngredients,
   };
  });
 }, []);

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

 const handleAdd = groupName => {
  const dataType = typeof formData?.[groupName][0];
  setFormData(current => {
   return {
    ...current,
    [groupName]: [...current[groupName], dataType === "string" ? "" : {}],
   };
  });
 };

 const handleRemove = (index, groupName) => {
  setFormData(current => {
   const mutableArray = [...current[groupName]];
   mutableArray.splice(index, 1);
   return {
    ...current,
    [groupName]: mutableArray,
   };
  });
 };

 const handleSave = () => {
  const recipe = {
   ingredients: formData.ingredients,
   name: formData.name,
   steps: formData.steps,
   reference: formData.reference,
  };

  Axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipes/create`, recipe);
 };

 if (!productsList) {
  return <div>Loading...</div>;
 }

 return (
  <PageContent className="add-recipe">
   <h1>Add recipe</h1>
   <h2>Name</h2>
   <Card>
    <input
     type="text"
     value={formData.name}
     onChange={event => {
      handleSimpleInputChange("name", event.target.value);
     }}
     placeholder="Name"
    />
   </Card>
   <Card>
    <input
     type="text"
     value={formData.reference}
     onChange={event => {
      handleSimpleInputChange("reference", event.target.value);
     }}
     placeholder="Reference"
    />
   </Card>
   <ul>
    <h2>Ingredients</h2>
    {formData.ingredients?.map((ingredient, index) => {
     return (
      <li key={index}>
       <Card direction="row">
        <SuggestiveInput
         id={`${randomIdPrefix}-${index}`}
         value={ingredient.name}
         placeholder="Ingredient"
         groupName="ingredients"
         fieldName="name"
         options={productsList}
         onInputChange={handleNestedInputChange}
        />
        <input
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
         onClick={() => handleRemove(index, "ingredients")}
        >
         Remove
        </Button>
       </Card>
      </li>
     );
    })}
    <AddItemButton onClick={() => handleAdd("ingredients")} />
   </ul>
   <ul>
    <h2>Steps</h2>
    {formData?.steps?.map((step, index) => {
     return (
      <li key={index}>
       <Card direction="row">
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
          handleRemove(index, "steps");
         }}
        >
         Remove
        </Button>
       </Card>
      </li>
     );
    })}
    <AddItemButton onClick={() => handleAdd("steps")} />
   </ul>
   <Button
    variant="neutral"
    onClick={handleSave}
   >
    Save recipe
   </Button>
  </PageContent>
 );
};

export default AddRecipe;
