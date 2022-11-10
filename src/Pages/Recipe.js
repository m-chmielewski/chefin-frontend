import React from "react";
import { useParams } from "react-router-dom";

import "./Recipe.css";

import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";

const Recipe = () => {
 const { name } = useParams();

 return (
  <PageContent className="recipe">
   <h1>{name}</h1>
   <ul>
    <h2>Ingredients</h2>
    <li>
     <Card>Carrot: 1000</Card>
    </li>
    <li>
     <Card>Pork neck: 500</Card>
    </li>
    <li>
     <Card>White wine: 200</Card>
    </li>
    <li>
     <Card>Soy sauce: 40</Card>
    </li>
    <li>
     <Card>Garlic: 5</Card>
    </li>
    <li>
     <Card>Rosemary: 5</Card>
    </li>
    <li>
     <Card>Olive oil: 5</Card>
    </li>
   </ul>
   <ul>
    <h2>Steps</h2>
    <li>
     <Card>
      Marinate meat in garlic, soy sauce, olive oil, rosemary, carrot, white
      wine
     </Card>
    </li>
   </ul>
  </PageContent>
 );
};

export default Recipe;
