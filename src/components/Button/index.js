import React from "react";

const buttonStyles = {
  padding: "16px 24px",
  background: "whitesmoke",
  cursor: "pointer",
  border: "none",
  borderRadius: 3,
  zIndex :5,
  marginTop: "50px"
};

const Button = ({ children, onClick }) => (
  <button onClick={onClick} style={{ ...buttonStyles }}>
    {children}
  </button>
);

export default Button;
