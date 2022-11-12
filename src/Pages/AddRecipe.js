import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";

import "./AddRecipe.css";

import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import SuggestiveInput from "../CommonElements/SuggestiveInput";
import Button from "../CommonElements/Button";

const randomIdPrefix = Date.now().toString(); //To stop browsers from making input suggestions

const categories = ["Breakfast", "Dinner", "Dessert"];

const AddRecipe = () => {
 const [ingredients, setIngredients] = useState([]);

 const [name, setName] = useState("");

 const [productsList, setProductsList] = useState();

 const [state, setState] = useState();

 let category;

 useEffect(() => {
  Axios.get(
   `${process.env.REACT_APP_SHOPPIN_BACKEND_URL}/products/eatable`
  ).then(products => {
   setProductsList(products.data.map(product => product.name));
  });
 }, []);

 const handleSuggestiveInputChange = useCallback(inputData => {
  setIngredients(current => {
   const mutableIngredients = [...current];
   mutableIngredients[inputData.index] = {
    name: inputData.value,
    quantity: current[inputData.index].quantity,
   };
   return mutableIngredients;
  });
 }, []);

 const handleCategoryChange = useCallback(inputData => {
  category = inputData.value;
 }, []);

 const handleAdd = () => {
  setIngredients(current => {
   return [...current, { name: "", quantity: "" }];
  });
 };

 const handleRemove = index => {
  setIngredients(current => {
   const mutableIngredients = [...current];
   mutableIngredients.splice(index, 1);
   return mutableIngredients;
  });
 };

 const handleSave = () => {
  const recipe = {
   ingredients: ingredients,
   name: name,
   category: category,
  };

  console.log(recipe);
 };

 if (!productsList) {
  return <div>Loading...</div>;
 }

 console.log("rerender");

 return (
  <PageContent className="add-recipe">
   <h1>Add recipe</h1>
   <h2>Name</h2>
   <Card>
    <input
     type="text"
     value={name}
     onChange={event => {
      setName(event.target.value);
     }}
    />
    <SuggestiveInput
     id={`${randomIdPrefix}-${category}`}
     value={category}
     options={categories}
     onInputChange={handleCategoryChange}
    />
   </Card>
   <ul>
    <h2>Ingredients</h2>
    {ingredients?.map((ingredient, index) => {
     return (
      <li key={index}>
       <Card direction="row">
        <SuggestiveInput
         id={`${randomIdPrefix}-${index}`}
         value={ingredient.name}
         options={productsList}
         onInputChange={handleSuggestiveInputChange}
        />
        <input
         type="number"
         value={ingredient.quantity}
         onChange={event =>
          setIngredients(current => {
           const mutableIngredients = [...current];
           mutableIngredients[index] = {
            name: current[index].name,
            quantity: event.target.value,
           };
           return mutableIngredients;
          })
         }
        />
        <Button
         variant="negative"
         onClick={() => handleRemove(index)}
        >
         Remove
        </Button>
       </Card>
      </li>
     );
    })}
    <Button
     variant="neutral"
     onClick={handleAdd}
    >
     Add
    </Button>
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
