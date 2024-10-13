import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
import shoppingImage from "../../assets/shopping.png"; // Import the image

function Login() {
  const { login, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log(response);
    } catch (error) {
      toast.error("Login failed: " + error.message, {
        position: "top-right",
      });
      console.error("Login failed: ", error);
    }
  };

  return (
    <Container
      fluid
      className="login-container d-flex align-items-center justify-content-start"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} className="text-center my-auto">
          <h1 className="display-4 fw-bold">Welcome Back!</h1>{" "}
          {/* Moved text above image */}
          <h3>Login to Your Account</h3>
          <p className="lead mb-4">
            Access your account to continue shopping or manage your orders.
          </p>
          <Image src={shoppingImage} className="login-image mb-4" />{" "}
          {/* Image after text */}
        </Col>
        <Col md={5}>
          <Card className="shadow-lg login-card">
            <Card.Body>
              <h3 className="card-title text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="login-input"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="login-input"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mb-3 login-btn"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </Button>
                <p className="text-center">
                  Don’t have an account?{" "}
                  <Link to="/register" className="login-link">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />

      <style jsx>{`
        /* Background */
        .login-container {
          min-height: 100vh;
          background-color: #f7f7f7;
          padding: 0 2rem;
        }

        /* Login Card */
        .login-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          padding: 2rem;
          animation: fadeIn 1s ease-out;
        }

        /* Image Styling */
        .login-image {
          width: 500px; /* Adjust the width of the image */
          height: auto;
        }

        /* Input Fields */
        .login-input {
          border-radius: 30px;
          padding: 10px 20px;
          background-color: #f8f9fa;
          border: 1px solid #e0e0e0;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .login-input:focus {
          border-color: #6c63ff;
          box-shadow: 0 0 8px rgba(108, 99, 255, 0.3);
        }

        /* Button */
        .login-btn {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          border: none;
          padding: 10px 0;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 30px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        /* Link */
        .login-link {
          color: #6a11cb;
          font-weight: 600;
          text-decoration: none;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        /* Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  );
}

export default Login;
