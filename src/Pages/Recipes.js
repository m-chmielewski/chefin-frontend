import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Button, PageContent } from "@mchm/common";

const Recipes = () => {
 const [recipesList, setRecipesList] = useState();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`).then(response => {
   setRecipesList(response.data.map(recipe => recipe.name));
  });
 }, []);

 if (!recipesList) return <div>Loadin...</div>;

 return (
  <PageContent>
   <h1>Recipes</h1>
   <ul>
    {recipesList.map(recipe => {
     return (
      <li key={recipe}>
       <Button href={`/recipe/${recipe}`}>{recipe}</Button>
      </li>
     );
    })}
   </ul>
  </PageContent>
 );
};

export default Recipes;
