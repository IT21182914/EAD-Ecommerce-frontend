import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductCard = ({ product, handleEdit, deleteProduct }) => {
  return (
    <Card
      className="product-card"
      style={{
        width: "100%",
        maxWidth: "300px",
        margin: "0 auto",
        height: "450px",
        borderRadius: "15px",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        position: "relative",
        backgroundColor: "#fff",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          height: "200px",
          overflow: "hidden",
        }}
      >
        <Card.Img
          variant="top"
          src={product.imageUrl || "default-image.jpg"}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <Card.Body>
        <Card.Title
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {product.name}
        </Card.Title>
        <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
          {product.description.length > 50
            ? product.description.substring(0, 47) + "..."
            : product.description}
        </Card.Text>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ${product.price.toFixed(2)}
        </div>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          <strong>Stock Status:</strong> {product.stockStatus}
        </div>
      </Card.Body>
      <div className="d-flex justify-content-between p-3">
        <Button
          variant="primary"
          onClick={() => handleEdit(product.productId)}
          style={{
            backgroundColor: "#007bff",
            border: "none",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "6px 15px",
            transition: "background-color 0.3s ease",
            fontSize: "0.9rem",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#007bff";
          }}
        >
          <FaEdit className="me-1" /> Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteProduct(product.productId)}
          style={{
            backgroundColor: "#dc3545",
            border: "none",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "6px 15px",
            transition: "background-color 0.3s ease",
            fontSize: "0.9rem",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#c82333";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#dc3545";
          }}
        >
          <FaTrashAlt className="me-1" /> Delete
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
