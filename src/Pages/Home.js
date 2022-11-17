import React from "react";

import PageContent from "../CommonElements/PageContent";
import Button from "../CommonElements/Button";

const Home = props => {
 return (
  <PageContent regularVisionOn={props.regularVisionOn}>
   <h1>Chefin</h1>
   <ul>
    <li>
     <Button href="/recipes/">Recipes</Button>
    </li>
    <li>
     <Button href="/addRecipe/">Add Recipe</Button>
    </li>
    <li>
     <Button href="/settings/">Settings</Button>
    </li>
    {/* <Button href="/editRecipe/">Edit recipe</Button> */}
   </ul>
  </PageContent>
 );
};

export default Home;
