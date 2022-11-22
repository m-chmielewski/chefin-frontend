import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import { Card, PageContent } from "@mchm/common";

const Recipe = () => {
 const { name } = useParams();

 const [recipe, setRecipe] = useState();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${name}`).then(
   response => {
    setRecipe(response.data);
   }
  );
 }, []);

 if (!recipe) return <div>Loading...</div>;

 return (
  <PageContent>
   <h1>{name}</h1>
   <h2>Ingredients</h2>
   <ul>
    {recipe.ingredients.map(ingredient => {
     return (
      <li key={ingredient.name}>
       <Card>
        {ingredient.name}
        {ingredient.quantity ? `: ${ingredient.quantity}` : ""}
       </Card>
      </li>
     );
    })}
   </ul>
   {recipe.steps[0] && (
    <>
     <h2>Steps</h2>
     <ul>
      <li>
       <Card></Card>
      </li>
     </ul>
    </>
   )}
   {recipe.notes && (
    <>
     <h2>Notes</h2>
     <Card>{recipe.notes}</Card>
    </>
   )}
  </PageContent>
 );
};

export default Recipe;
