import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "./AdminSidebar"; // Assuming you have AdminSidebar component

const VendorCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    password: "",
    otherDetails: "",
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

    // Simulate API call for vendor creation
    setTimeout(() => {
      toast.success("Vendor profile created successfully!");
      setLoading(false);
      navigate("/admin/vendors");
    }, 2000);
  };

  return (
    <div className="d-flex">
      <AdminSidebar /> {/* Admin Sidebar for navigation */}
      <Container
        fluid
        className="p-4 d-flex justify-content-center align-items-start"
        style={{ marginLeft: "240px", minHeight: "100vh" }}
      >
        <div style={{ flex: 1, maxWidth: "800px", width: "100%" }}>
          <h2 className="text-center my-4 text-primary display-4">
            Create Vendor
          </h2>

          {loading && (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="sr-only">Loading...</span>
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
                <Col md={8}>
                  <Form.Group controlId="vendorName" className="mb-3">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="vendorName"
                      value={formData.vendorName}
                      onChange={handleChange}
                      placeholder="Enter vendor name"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter vendor email"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="otherDetails" className="mb-3">
                    <Form.Label>Other Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="otherDetails"
                      value={formData.otherDetails}
                      onChange={handleChange}
                      placeholder="Enter other details"
                    />
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
                    {loading ? "Creating..." : "Create Profile"}
                  </Button>
                </Col>

                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    roundedCircle
                    style={{
                      width: "150px",
                      height: "160px",
                      objectFit: "cover",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Col>
              </Row>
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

export default VendorCreation;
