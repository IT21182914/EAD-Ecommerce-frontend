import React from "react";
import { Card } from "react-bootstrap";

const ProductModal = ({ product }) => {
  return (
    <Card className="product-card" style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        src={product.imageUrl || "default-image.jpg"}
        style={{
          objectFit: "cover",
          height: "300px",
          width: "100%",
          borderRadius: "10px",
        }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Stock Quantity:</strong> {product.stockQuantity}
        </p>
        <p>
          <strong>Stock Status:</strong> {product.stockStatus}
        </p>
      </Card.Body>
    </Card>
  );
};

export default ProductModal;
