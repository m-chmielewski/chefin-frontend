import React, { useEffect } from "react";

import "./PageContent.css";

const PageContent = ({ onClick, ...props }) => {
 // useEffect(() => {
 //  const main = document.getElementsByTagName("main")[0];
 //  main.addEventListener("click", event => {
 //   onClick(event);
 //  });
 // }, [onClick]);

 return (
  <main className={`page-content ${props.className}`}>{props.children}</main>
 );
};

export default PageContent;
