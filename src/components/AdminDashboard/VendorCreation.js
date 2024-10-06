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
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import Sidebar from "./AdminSidebar";

const VendorCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_Password: "",
    street: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formData.re_Password = formData.password;
    formData.role = 3;
    try {
      const response = await axios.post(
        "https://localhost:44321/api/v1/create-by-admin",
        formData
      );
      console.log(response.data);
      toast.success("Vendor profile created successfully!", {
        position: "top-right",
      });
      setLoading(false);
      // navigate("/admin/vendors");
    } catch (error) {
      console.error("Vendor creation failed: ", error);
      toast.error("Vendor creation failed. Please try again.", {
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <AdminNavBar notification={[]} />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
        <div style={{ flex: 1, maxWidth: "800px", width: "100%", margin: "auto", padding: "5px"}}>
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
              className="shadow p-5 rounded-4 "
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <Row>
                <Col md={8}>
                  <Form.Group
                    controlId="vendorName"
                    className="mb-3 d-flex flex-row justify-content-between"
                  >
                    <div>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
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

                  <Form.Group
                    controlId="Address"
                    className="mb-3 d-flex flex-row justify-content-between"
                  >
                    <div>
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData.Street}
                        onChange={handleChange}
                        placeholder="Street"
                        required
                      />

                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.City}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />

                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={formData.Country}
                        onChange={handleChange}
                        placeholder="Country"
                        required
                      />
                    </div>
                    <div>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.State}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />

                      <Form.Label>ZipCode</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.ZipCode}
                        onChange={handleChange}
                        placeholder="ZipCode"
                        required
                      />
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        type="text"
                        name="role"
                        value={formData.Role}
                        onChange={handleChange}
                        placeholder="Role"
                        required
                      />
                    </div>
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
    </div>
  );
};

export default VendorCreation;
