import React from "react";

import "./Arrow.css";

const Arrow = props => {
 let direction;

 if (props.left) direction = "left";
 if (props.up) direction = "up";
 if (props.right) direction = "right";
 if (props.down) direction = "down";

 return <div className={`arrow ${direction}`}></div>;
};

export default Arrow;
