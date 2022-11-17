import React from "react";

import PageContent from "../CommonElements/PageContent";
import Button from "../CommonElements/Button";

const Home = () => {
 return (
  <PageContent>
   <h1>Chefin</h1>
   <Button href="/recipes/">Recipes</Button>
   <Button href="/addRecipe/">Add Recipe</Button>
   {/* <Button href="/editRecipe/">Edit recipe</Button> */}
  </PageContent>
 );
};

export default Home;
