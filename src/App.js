import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./CommonElements/Shared.css";

import { useRegularVision } from "./CommonElements/Hooks/useRegularVision";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import Recipe from "./Pages/Recipe";
import AddRecipe from "./Pages/AddRecipe";
import EditRecipe from "./Pages/EditRecipe";
import Settings from "./Pages/Settings";

const App = () => {
 const [regularVisionOn, regularVisionSwitch] = useRegularVision();

 return (
  <Router>
   <Routes>
    <Route
     path="/"
     element={<Home regularVisionOn={regularVisionOn} />}
    />
    <Route
     path="/recipes"
     element={<Recipes regularVisionOn={regularVisionOn} />}
    />
    <Route
     path="/recipe/:name"
     element={<Recipe regularVisionOn={regularVisionOn} />}
    />
    <Route
     path="/addRecipe/"
     element={<AddRecipe regularVisionOn={regularVisionOn} />}
    />
    <Route
     path="/editRecipe/"
     element={<EditRecipe regularVisionOn={regularVisionOn} />}
    />
    <Route
     path="/settings/"
     element={
      <Settings
       regularVisionOn={regularVisionOn}
       regularVisionCallback={regularVisionSwitch}
      />
     }
    />
   </Routes>
  </Router>
 );
};

export default App;
