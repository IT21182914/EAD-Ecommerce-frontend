import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../config";

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
    vendorId: "",
    type: "Anyone", // Default value
    size: "Default", // Default value
  });

  useEffect(() => {
    // Fetch existing product details
    axios
      .get(
        `${API_BASE_URL}vendor/products/product/${productId}`
      )
      .then((response) => {
        const product = response.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          category: product.category,
          imageUrl: product.imageUrl,
          vendorId: product.vendorId, // Ensure vendorId is set
          type: product.type || "Anyone", // Set the type, or default to "Anyone"
          size: product.size || "Default", // Set the size, or default to "Default"
        });
      })
      .catch((error) => toast.error("Error fetching product"));
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the product data to be updated
      const updatedProductData = { ...formData };

      // Update the product on the backend
      await axios.put(
        `${API_BASE_URL}vendor/products/update/${productId}`,
        updatedProductData
      );

      toast.success("Product updated successfully!");
      setTimeout(() => navigate("/vendor/products"), 1500); // Navigate back to the products list after a short delay
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <Container
        fluid
        className="p-4 d-flex justify-content-center align-items-start"
        style={{ marginLeft: "240px", minHeight: "100vh" }}
      >
        <div style={{ flex: 1, maxWidth: "800px", width: "100%" }}>
          <h2 className="text-center my-4 text-primary display-4">
            Update Product
          </h2>

          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
            {/* Hidden Fields */}
            <Form.Control type="hidden" name="productId" value={productId} />
            <Form.Control
              type="hidden"
              name="vendorId"
              value={formData.vendorId}
            />

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
                  className="img-thumbnail mt-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Form.Group>

            {/* Dropdown for Type */}
            <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Anyone">Anyone</option>
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
              </Form.Control>
            </Form.Group>

            {/* Dropdown for Size */}
            <Form.Group controlId="size" className="mb-3">
              <Form.Label>Size</Form.Label>
              <Form.Control
                as="select"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                <option value="Default">Default</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
                <option value="Double XL">Double XL</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2"
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: "25px",
                backgroundColor: "#007bff",
                border: "none",
              }}
            >
              Update Product
            </Button>
          </Form>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Container>

      <style>{`
        .form-control {
          padding: 12px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
        }
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.5);
        }
        .btn-primary:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default UpdateProduct;
