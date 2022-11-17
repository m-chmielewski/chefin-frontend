import React, { useState, useEffect } from "react";
import Axios from "axios";

import PageContent from "../CommonElements/PageContent";
import Button from "../CommonElements/Button";

const Recipes = props => {
 const [recipesList, setRecipesList] = useState();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`).then(response => {
   setRecipesList(response.data.map(recipe => recipe.name));
  });
 }, []);

 if (!recipesList) return <div>Loadin...</div>;

 return (
  <PageContent regularVisionOn={props.regularVisionOn}>
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
