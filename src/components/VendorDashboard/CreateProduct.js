import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: "",
    imageUrl: "", // Manually input image URL
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:44321/api/v1/vendor/products/create", formData)
      .then(() => {
        alert("Product created successfully!");
        navigate("/vendor/products");
      })
      .catch((error) => console.error("Error creating product:", error));
  };

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="text-center my-4">Create Product</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="stockQuantity" className="mb-3">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="category" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="imageUrl" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Product"
                style={{ width: "150px", marginTop: "10px" }}
              />
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Product
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateProduct;
