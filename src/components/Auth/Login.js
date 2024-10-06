import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
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
      const response = await login(formData).th
      //Machan man meka kare assuming the login is successful, navigate to the vendor dashboard.change this to the correct path machan according to the user roles
      // setTimeout(() => navigate("/vendor/dashboard"), 1500);
      console.log(response);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
      });
      console.error("Login failed: ", error);
    }
  };
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#1A1A1D" }}
    >
      <Row className="w-100">
        <Col md={6} className="text-center text-white my-auto">
          <h1 className="display-4 fw-bold">Welcome Back!</h1>
          <h3 className="text-light">Login to Your Account</h3>
          <p className="lead">
            Please log in to continue using our services and manage your
            experience.
          </p>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg bg-dark text-white">
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
                    placeholder="Enter email"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  style={{ backgroundColor: "#6A11CB", border: "none" }}
                >
                  Log in
                </Button>
                <p className="text-center">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-white">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
export default Login;