import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_Password: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
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
      const { street, city, state, country, zipCode, ...otherData } = formData;
      const formattedData = {
        ...otherData,
        address: {
          street,
          city,
          state,
          country,
          zipCode,
        },
      };

      const response = await axios.post(
        "https://localhost:44321/api/v1/create-by-admin",
        formattedData
      );
      console.log("Registration successful: ", response.data);
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#1a1a1d" }}
    >
      <Row className="w-100">
        <Col md={6} lg={5} className="text-center text-white my-auto">
          <h1 className="display-5 fw-bold">Join Us Now!</h1>
          <h4 className="text-light">Create Your Account</h4>
          <p className="lead">
            Sign up and enjoy our services with a smooth experience.
          </p>
        </Col>
        <Col md={6} lg={6} className="mx-auto">
          <Card
            className="shadow-lg bg-dark text-white"
            style={{ maxWidth: "450px", margin: "0 auto" }}
          >
            <Card.Body>
              <h3 className="card-title text-center mb-4">Sign Up</h3>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="bg-dark text-white"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="bg-dark text-white"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
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
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street"
                        className="bg-dark text-white"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="bg-dark text-white"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="bg-dark text-white"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="bg-dark text-white"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="re_Password"
                    value={formData.re_Password}
                    onChange={handleChange}
                    placeholder="Re-enter Password"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  style={{ backgroundColor: "#6a11cb", border: "none" }}
                >
                  Sign Up
                </Button>
                <p className="text-center">
                  Already registered?{" "}
                  <Link to="/" className="text-white">
                    Log in
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
