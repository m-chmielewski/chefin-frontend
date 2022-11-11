import React, { useState, useEffect } from "react";

import "./SuggestiveInput.css";

const SuggestiveInput = ({ id }) => {
 const [inputPhrase, setInputPhrase] = useState("");

 const [listDown, setListDown] = useState(false);

 const options = ["Carrot", "Potato", "Onion", "Milk", "Cat litter", "Pork"];

 useEffect(() => {
  const html = document.getElementsByTagName("html")[0];

  html.addEventListener("click", event => {
   if (event.target.id !== id) setListDown(false);
  });
 }, [id]);

 return (
  <div className="suggestive-input-wrapper">
   <input
    id={id}
    type="text"
    value={inputPhrase}
    onChange={event => setInputPhrase(event.target.value)}
    onFocus={() => setListDown(true)}
   />
   <ul style={{ display: listDown ? "flex" : "none" }}>
    {options.map(option => {
     if (option.toLowerCase().startsWith(inputPhrase.toLowerCase()))
      return (
       <li
        key={option}
        onClick={() => {
         setInputPhrase(option);
        }}
        onKeyDown={event => {
         if (event.key === "Enter") {
          setInputPhrase(option);
          setListDown(false);
         }
        }}
        tabIndex={0}
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
