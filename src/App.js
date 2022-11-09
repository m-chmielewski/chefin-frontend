import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./CommonElements/Shared.css";

import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import Recipe from "./Pages/Recipe";
import AddRecipe from "./Pages/AddRecipe";
import EditRecipe from "./Pages/EditRecipe";

const App = () => {
 return (
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
     path="/addRecipe/"
     element={<AddRecipe />}
    />
    <Route
     path="/editRecipe/"
     element={<EditRecipe />}
    />
   </Routes>
  </Router>
 );
};

export default App;
