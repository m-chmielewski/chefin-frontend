import React from "react";

import "./PageContent.css";

const PageContent = props => {
 return (
  <main
   className={`page-content ${props.className} ${
    props.regularVisionOn ? "regular-vision" : ""
   }`}
  >
   {props.children}
  </main>
 );
};

export default PageContent;
