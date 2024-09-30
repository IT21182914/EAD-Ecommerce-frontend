import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    // Fetch product data
    axios
      .get(`/api/v1/vendor/products/${productId}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Upload image and get URL
    axios
      .post("/upload-image-url", formData)
      .then((response) => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: response.data.url, // Assuming the image URL is in response.data.url
        }));
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/v1/vendor/products/update/${productId}`, formData)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/vendor-dashboard"); // Redirect after successful update
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <Container>
      <h2 className="text-center my-4">Update Product</h2>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group controlId="imageUrl" className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Uploaded"
              style={{ width: "150px", marginTop: "10px" }}
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
