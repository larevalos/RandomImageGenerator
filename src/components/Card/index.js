import React from "react";

const cardStyles = {
  background: "whitesmoke",
  borderRadius: 3,
  width: "500px",
  height: "500px",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  marginTop: "50px"
};

const imageStyle = {
  pointerEvents: "none",

}

const Card = ({ zIndex = 0, children ,noCard}) => (
<div style={{ ...cardStyles, zIndex }}>
    {(noCard) ?
      children :
      <img src={children} alt="random" style={{...cardStyles,...imageStyle,zIndex}}></img>     
    }
  </div>
  );

export default Card;
