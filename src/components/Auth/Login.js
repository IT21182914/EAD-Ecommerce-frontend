import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#1a1a1d" }}
    >
      <Row className="w-100">
        <Col md={6} className="text-center text-white my-auto">
          <h1 className="display-4 fw-bold">Welcome Back!</h1>
          <h3 className="text-light">Login to Your Account</h3>
          <p className="lead">
            Please login to continue using our services and manage your
            experience.
          </p>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg bg-dark text-white">
            <Card.Body>
              <h3 className="card-title text-center mb-4">Login</h3>
              <Form>
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
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  style={{ backgroundColor: "#6a11cb", border: "none" }}
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
    </Container>
  );
}

export default Login;
