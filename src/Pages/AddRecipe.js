import React, { useState, useCallback } from "react";

import "./AddRecipe.css";

import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import SuggestiveInput from "../CommonElements/SuggestiveInput";
import Button from "../CommonElements/Button";

const AddRecipe = () => {
 const [ingredients, setIngredients] = useState([]);

 const [backgroundClicked, setBackgroundClicked] = useState();

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

 const handleBackgroundClick = useCallback(event => {
  console.log(event.target.id);
  if (event.target.id !== "input" && event.target.id !== "list") {
   setBackgroundClicked(true);
  }
 }, []);

 const handleListHidden = () => {
  setBackgroundClicked(false);
 };

 return (
  <PageContent
   className="add-recipe"
   onClick={handleBackgroundClick}
  >
   <h1>Add recipe</h1>
   <ul>
    <h2>Ingredients</h2>
    {ingredients?.map((ingredient, index) => {
     return (
      <li key={index}>
       <Card direction="row">
        <SuggestiveInput
         value={ingredient.name}
         backgroundClicked={backgroundClicked}
         handleListHidden={handleListHidden}
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
