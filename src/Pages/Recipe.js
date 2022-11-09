import React from "react";
import { useParams } from "react-router-dom";

import PageContent from "../CommonElements/PageContent";

const Recipe = () => {
 const { name } = useParams();

 return (
  <PageContent>
   <h1>{name}</h1>
  </PageContent>
 );
};

export default Recipe;
