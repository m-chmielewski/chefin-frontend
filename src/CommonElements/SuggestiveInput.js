import React, { useState, useEffect } from "react";

import "./SuggestiveInput.css";

const SuggestiveInput = ({ backgroundClicked, handleListHidden }) => {
 const [inputPhrase, setInputPhrase] = useState("");

 const [listDown, setListDown] = useState(false);

 const options = ["Carrot", "Potato", "Onion", "Milk", "Cat litter", "Pork"];

 useEffect(() => {
  console.log(backgroundClicked);
  if (backgroundClicked) {
   setListDown(false);
   handleListHidden();
  }
 }, [backgroundClicked]);

 return (
  <div
   className="suggestive-input-wrapper"
   onFocus={() => setListDown(true)}
  >
   <input
    id="input"
    type="text"
    value={inputPhrase}
    onChange={event => setInputPhrase(event.target.value)}
   />
   <ul style={{ display: listDown ? "flex" : "none" }}>
    {options.map(option => {
     if (option.toLowerCase().startsWith(inputPhrase.toLowerCase()))
      return (
       <li
        id="list"
        tabIndex={0}
        key={option}
        onClick={() => {
         setInputPhrase(option);
         setListDown(false);
        }}
        onKeyDown={event => {
         if (event.key === "Enter") {
          setInputPhrase(option);
          setListDown(false);
         }
        }}
       >
        {option}
       </li>
      );
     return null;
    })}
   </ul>
  </div>
 );
};

export default SuggestiveInput;
