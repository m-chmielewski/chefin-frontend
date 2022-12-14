import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Pages/MediaQueries.css";

import { useRegularVision } from "@mchm/common";
import { StylingProvider } from "@mchm/common";

import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import Recipe from "./Pages/Recipe";
import AddToShoppingList from "./Pages/AddToShoppingList";
import AddRecipe from "./Pages/AddRecipe";
import EditRecipe from "./Pages/EditRecipe";
import Settings from "./Pages/Settings";

const App = () => {
 const [regularVisionOn, regularVisionSwitch] = useRegularVision();

 return (
  <StylingProvider regularVisionOn={regularVisionOn}>
   <Router>
    <Routes>
     <Route
      path="/"
      element={<Home />}
     />
     <Route
      path="/recipes"
      element={<Recipes />}
     />
     <Route
      path="/recipe/:name"
      element={<Recipe />}
     />
     <Route
      path="/recipe/addToShoppingList/:name"
      element={<AddToShoppingList />}
     />
     <Route
      path="/addRecipe/"
      element={<AddRecipe />}
     />
     <Route
      path="/editRecipe/"
      element={<EditRecipe />}
     />
     <Route
      path="/settings/"
      element={
       <Settings
        regularVisionSwitch={regularVisionSwitch}
        regularVisionOn={regularVisionOn}
       />
      }
     />
    </Routes>
   </Router>
  </StylingProvider>
 );
};

export default App;
