import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#1a1a1d" }}
    >
      <Row className="w-100">
        <Col md={6} className="text-center text-white my-auto">
          <h1 className="display-4 fw-bold">Join Us Now!</h1>
          <h3 className="text-light">Create Your Account</h3>
          <p className="lead">
            Sign up and enjoy our services with a smooth experience.
          </p>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg bg-dark text-white">
            <Card.Body>
              <h3 className="card-title text-center mb-4">Sign Up</h3>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="bg-dark text-white"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="bg-dark text-white"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Subscribe to our newsletter"
                    className="text-light"
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
                  <Link to="/login" className="text-white">
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
