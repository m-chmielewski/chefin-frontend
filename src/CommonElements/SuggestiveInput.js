import React from "react";

import "./SuggestiveInput.css";

const SuggestiveInput = ({
 id,
 onInputChange,
 dropdownsHandle,
 listDown,
 options,
 groupName,
 fieldName,
 ...props
}) => {
 return (
  <div className="suggestive-input-wrapper">
   <label htmlFor={id}>{props.label}</label>
   <input
    id={id}
    type="text"
    value={props.value}
    placeholder={props.placeholder}
    onChange={event => {
     onInputChange(event.target.value, id.split("-")[2], groupName, fieldName);
    }}
    onFocus={() => {
     dropdownsHandle(true, id.split("-")[2]);
    }}
   />
   <ul style={{ display: listDown ? "flex" : "none" }}>
    {options.map(option => {
     if (option.toLowerCase().includes(props.value.toLowerCase()))
      return (
       <li
        key={option}
        onClick={() => {
         onInputChange(option, id.split("-")[2], groupName, fieldName);
        }}
        onKeyDown={event => {
         if (event.key === "Enter") {
          onInputChange(option, id.split("-")[2], groupName, fieldName);
          dropdownsHandle(false, id.split("-")[2]);
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
