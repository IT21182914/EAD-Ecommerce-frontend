import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CSRSidebar from "./CSRSidebar";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    userId: "123456", // Example: Assign this to a real user ID from your system
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

    // Password change logic goes here
    axios
      .post("https://localhost:44321/api/v1/change-password", formData)
      .then(() => {
        toast.success("Password changed successfully!");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error changing password.");
        console.error("Error changing password:", error);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex">
      <CSRSidebar />
      <Container
        fluid
        className="p-4 d-flex justify-content-center align-items-start"
        style={{ marginLeft: "240px", minHeight: "100vh" }}
      >
        <div
          className="form-container"
          style={{
            flex: 1,
            maxWidth: "600px",
            width: "100%",
            animation: "fadeIn 0.8s ease-in-out",
          }}
        >
          <h2 className="text-center my-4 gradient-text">Change Password</h2>

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
              className="shadow-lg p-4 rounded bg-light animated-form"
              style={{ animation: "slideUp 0.5s ease-out" }}
            >
              {/* Hidden field for User ID */}
              <Form.Control
                type="hidden"
                name="userId"
                value={formData.userId}
              />

              <Row>
                <Col md={12}>
                  <Form.Group controlId="oldPassword" className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      placeholder="Enter old password"
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="newPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100 py-2 animated-button"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  background:
                    "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                  border: "none",
                  transition: "all 0.4s ease",
                }}
              >
                {loading ? "Updating..." : "Change Password"}
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

      <style>{`
        .form-container {
          animation: fadeIn 0.8s ease-in-out;
        }

        .gradient-text {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFadeIn 1.5s ease-in-out;
        }

        .custom-input {
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .custom-input:focus {
          border-color: #007bff;
          box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.5);
        }

        .animated-form {
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradientFadeIn {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 100% 50%;
          }
        }

        .animated-button:hover {
          transform: translateY(-3px);
          background-color: #007bff;
          box-shadow: 0px 10px 20px rgba(0, 123, 255, 0.4);
        }

        .animated-button:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;
