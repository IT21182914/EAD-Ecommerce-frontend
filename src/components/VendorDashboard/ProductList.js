import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";

const ProductList = () => {
  const { vendorId } = useParams(); // Assuming vendorId is part of the route
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch vendor products from the backend
    axios
      .get(`https://localhost:44321/api/v1/vendor/products/all`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, [vendorId]);

  const deleteProduct = (productId) => {
    axios
      .delete(
        `https://localhost:44321/api/v1/vendor/products/delete/${productId}`
      )
      .then(() => {
        // Update state after deletion
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2
          className="text-center my-4"
          style={{ fontWeight: "bold", fontSize: "2.5rem" }}
        >
          Products
        </h2>
        <Row>
          {products.map((product) => (
            <Col key={product.productId} md={4} className="mb-4">
              <Card
                className="product-card"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0px 8px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "200px", // Fixed height
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
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                    <br />
                    <strong>Price:</strong> ${product.price}
                    <br />
                    <strong>Stock Status:</strong> {product.stockStatus}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      href={`/vendor/update/${product.productId}`}
                      style={{
                        backgroundColor: "#007bff",
                        border: "none",
                        fontWeight: "bold",
                        borderRadius: "25px",
                        padding: "10px 20px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#0056b3";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                      }}
                    >
                      <FaEdit className="me-2" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => deleteProduct(product.productId)}
                      style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        fontWeight: "bold",
                        borderRadius: "25px",
                        padding: "10px 20px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#c82333";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#dc3545";
                      }}
                    >
                      <FaTrashAlt className="me-2" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
