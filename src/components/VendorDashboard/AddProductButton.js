import React from "react";
import { Button } from "react-bootstrap";

const AddProductButton = ({ onClick }) => {
  return (
    <Button
      className="btn"
      style={{
        backgroundColor: "#000",
        border: "none",
        color: "#fff",
        fontWeight: "500",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, background-color 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#333";
        e.target.style.transform = "translateY(-5px)";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#000";
        e.target.style.transform = "translateY(0)";
      }}
      onClick={onClick}
    >
      Add Product
    </Button>
  );
};

export default AddProductButton;
