import React, { useState, useEffect } from "react";

import "./SuggestiveInput.css";

const SuggestiveInput = ({
 id,
 onInputChange,
 options,
 groupName,
 fieldName,
 ...props
}) => {
 const [inputPhrase, setInputPhrase] = useState("");

 const [listDown, setListDown] = useState(false);

 useEffect(() => {
  const html = document.getElementsByTagName("html")[0];

  html.addEventListener("click", event => {
   if (event.target.id !== id) setListDown(false);
  });
 }, [id]);

 useEffect(() => {
  if (groupName && fieldName) {
   onInputChange(inputPhrase, id.split("-")[1], groupName, fieldName);
  }
 }, [id, onInputChange, inputPhrase, groupName, fieldName]);

 return (
  <div className="suggestive-input-wrapper">
   <input
    id={id}
    type="text"
    value={inputPhrase}
    placeholder={props.placeholder}
    onChange={event => {
     setInputPhrase(event.target.value);
    }}
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
