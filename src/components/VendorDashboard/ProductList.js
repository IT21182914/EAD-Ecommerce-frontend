import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch vendor products from the backend
    axios
      .get("/api/v1/vendor/products/{vendorId}")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteProduct = (productId) => {
    axios
      .delete(`/api/v1/vendor/products/delete/${productId}`)
      .then(() => {
        // Update state after deletion
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <h2 className="text-center my-4">Your Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.productId} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imageUrl || "default-image.jpg"}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                  <br />
                  <strong>Price:</strong> ${product.price}
                  <br />
                  <strong>Stock Status:</strong> {product.stockStatus}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  href={`/vendor/update-product/${product.productId}`}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => deleteProduct(product.productId)}
                >
                  <FaTrashAlt /> Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
