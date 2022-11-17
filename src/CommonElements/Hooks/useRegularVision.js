import { useState } from "react";

const rootElement = document.getElementsByTagName("html")[0];

const getInitialRegularVision = () => {
 const currentSetting = localStorage.regularVision;

 if (!currentSetting || currentSetting === "on") {
  rootElement.style.fontSize = "12pt";
  return true;
 } else {
  rootElement.style.fontSize = "42pt";
  return false;
 }
};

export const useRegularVision = () => {
 const [regularVisionOn, setRegularVisionOn] = useState(
  getInitialRegularVision()
 );

 const regularVisionSwitch = () => {
  localStorage.regularVision = regularVisionOn ? "off" : "on";

  regularVisionOn
   ? (rootElement.style.fontSize = "42pt")
   : (rootElement.style.fontSize = "12pt");

  setRegularVisionOn(current => !current);
 };

 return [regularVisionOn, regularVisionSwitch];
};
