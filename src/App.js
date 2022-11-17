import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./CommonElements/Shared.css";

import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import Recipe from "./Pages/Recipe";
import AddRecipe from "./Pages/AddRecipe";
import EditRecipe from "./Pages/EditRecipe";
import Settings from "./Pages/Settings";

const getInitialRegularVision = () => {
 const currentSetting = localStorage.regularVision;
 const rootElement = document.getElementsByTagName("html")[0];

 if (!currentSetting || currentSetting === "on") {
  rootElement.style.fontSize = "12pt";
  return true;
 } else {
  rootElement.style.fontSize = "42pt";
  return false;
 }
};

const App = () => {
 const [regularVisionOn, setRegularVisionOn] = useState(
  getInitialRegularVision()
 );

 const handleRegularVisionSwitch = () => {
  const currentSetting = localStorage.regularVision;

  if (currentSetting === "on") {
   localStorage.regularVision = "off";
   setRegularVisionOn(false);
  } else {
   localStorage.regularVision = "on";
   setRegularVisionOn(true);
  }
 };

 useEffect(() => {
  const rootElement = document.getElementsByTagName("html")[0];
  regularVisionOn
   ? (rootElement.style.fontSize = "12pt")
   : (rootElement.style.fontSize = "42pt");
 }, [regularVisionOn]);

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
       regularVisionCallback={handleRegularVisionSwitch}
      />
     }
    />
   </Routes>
  </Router>
 );
};

export default App;
