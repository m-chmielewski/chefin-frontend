import React, { useState, useEffect } from "react";

import "./AddRecipe.css";

import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import SuggestiveInput from "../CommonElements/SuggestiveInput";
import Button from "../CommonElements/Button";

let randomIdPrefix; //To stop browsers from making input suggestions

const AddRecipe = () => {
 const [ingredients, setIngredients] = useState([]);

 useEffect(() => {
  randomIdPrefix = Date.now().toString();
 }, []);

 const handleSave = () => {
  setIngredients(current => {
   return [
    ...current,
    {
     newItem: 10,
    },
   ];
  });
 };

 const handleAdd = () => {
  setIngredients(current => {
   return [...current, { name: "", quantity: "" }];
  });
 };

 return (
  <PageContent className="add-recipe">
   <h1>Add recipe</h1>
   <ul>
    <h2>Ingredients</h2>
    {ingredients?.map((ingredient, index) => {
     return (
      <li key={index}>
       <Card direction="row">
        <SuggestiveInput
         id={`${randomIdPrefix}-${index}`}
         value={ingredient.name}
        />
        <input
         type="number"
         value={ingredient.quantity}
         onChange={() => {}}
        />
        <Button variant="negative">Remove</Button>
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
  </PageContent>
 );
};

export default AddRecipe;
