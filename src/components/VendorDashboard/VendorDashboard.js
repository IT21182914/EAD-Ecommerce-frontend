import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import {
  FaBoxOpen,
  FaWarehouse,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";

const VendorDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="mb-4 text-center">Vendor Dashboard</h2>

        {/* Stat Cards */}
        <Row className="mb-4">
          <Col md={4} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaBoxOpen size={30} className="text-success" />
                <h3 className="my-2">Manage Products</h3>
                <p>Create, update, and delete product listings.</p>
                <Button variant="primary">Go to Products</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaWarehouse size={30} className="text-warning" />
                <h3 className="my-2">Manage Inventory</h3>
                <p>Track and update your product stock levels.</p>
                <Button variant="success">Go to Inventory</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaClipboardList size={30} className="text-danger" />
                <h3 className="my-2">Track Orders</h3>
                <p>View and manage customer orders and delivery statuses.</p>
                <Button variant="warning">Go to Orders</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Vendor Ratings and Feedback */}
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Vendor Ratings and Feedback</Card.Title>
                <p>View customer ratings and feedback on your products.</p>
                <FaStar size={30} className="text-primary" />
                <h4 className="my-2">4.5 / 5</h4>
                <p>Based on 200 reviews</p>
                <Button variant="info">View Feedback</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VendorDashboard;
