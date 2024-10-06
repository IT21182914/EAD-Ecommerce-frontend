import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import image from "../../assets/unAuth.jpg";

const UnauthorizedPage = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#1a1a1d" }}
    >
      <div className="text-center">
        <img src={image} className="rounded-5 " style={{width:300, height: 300}} alt="Unauthorized Access" />
        <h1 className="display-4 text-danger">Unauthorized Access</h1>
        <p className="lead text-white">You do not have permission to view this page.</p>
        <Link to="/" className="btn btn-primary btn-sm">
          Go to Login
        </Link>
      </div>
    </Container>
  );
};

export default UnauthorizedPage;
