import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorSidebar from "./VendorSidebar";
import AdminNavBar from "../AdminDashboard/AdminNavBar"; // Import AdminNavBar
import API_BASE_URL from "../../config.js";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: "",
    imageUrl: "",
    type: "Anyone", // Default value
    size: "Default", // Default value
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API_BASE_URL}vendor/products/create`, formData)
      .then(() => {
        toast.success("Product created successfully!");
        setLoading(false);
        navigate("/vendor/products");
      })
      .catch((error) => {
        toast.error("Error creating product.");
        console.error("Error creating product:", error);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <div className="flex-grow-1" style={{ marginLeft: "240px" }}>
        {/* Add AdminNavBar */}
        <AdminNavBar notification={[]} />
        <Container
          fluid
          className="p-4 d-flex justify-content-center align-items-start"
          style={{ minHeight: "100vh" }}
        >
          <div style={{ flex: 1, maxWidth: "800px", width: "100%" }}>
            <h2 className="text-center my-4 text-primary display-4">
              Create Product
            </h2>

            {loading && (
              <div className="text-center my-5">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="sr-only"></span>
                </Spinner>
              </div>
            )}

            {!loading && (
              <Form
                onSubmit={handleSubmit}
                className="shadow p-4 rounded"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
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
                        placeholder="Enter price"
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
                        placeholder="Enter stock quantity"
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
                        placeholder="Enter category"
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
                    placeholder="Enter product description"
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
                    placeholder="Enter image URL"
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
                  disabled={loading}
                  className="w-100 py-2"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "25px",
                    backgroundColor: "#007bff",
                    border: "none",
                  }}
                >
                  {loading ? "Creating..." : "Create Product"}
                </Button>
              </Form>
            )}

            <ToastContainer
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
      </div>

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

export default CreateProduct;
