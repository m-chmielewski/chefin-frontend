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
 const [listDown, setListDown] = useState(false);

 useEffect(() => {
  const html = document.getElementsByTagName("html")[0];

  html.addEventListener("click", event => {
   if (event.target.id !== id) setListDown(false);
  });
 }, [id]);

 return (
  <div className="suggestive-input-wrapper">
   <label htmlFor={id}>{props.label}</label>
   <input
    id={id}
    type="text"
    value={props.value}
    placeholder={props.placeholder}
    onChange={event => {
     onInputChange(event.target.value, id.split("-")[1], groupName, fieldName);
    }}
    onFocus={() => setListDown(true)}
   />
   <ul style={{ display: listDown ? "flex" : "none" }}>
    {options.map(option => {
     if (option.toLowerCase().startsWith(props.value.toLowerCase()))
      return (
       <li
        key={option}
        onClick={() => {
         onInputChange(option, id.split("-")[1], groupName, fieldName);
        }}
        onKeyDown={event => {
         if (event.key === "Enter") {
          onInputChange(option, id.split("-")[1], groupName, fieldName);
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
