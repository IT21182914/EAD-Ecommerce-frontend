import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { FaUser, FaClipboardList, FaBan, FaCommentDots } from "react-icons/fa";

const CSRDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar role="csr" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="mb-4 text-center">CSR Dashboard</h2>

        {/* Stat Cards */}
        <Row className="mb-4">
          <Col md={4} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaUser size={30} className="text-primary" />
                <h3 className="my-2">Manage Accounts</h3>
                <p>View, activate, and deactivate customer accounts.</p>
                <Button variant="primary">Manage Accounts</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaClipboardList size={30} className="text-warning" />
                <h3 className="my-2">Manage Orders</h3>
                <p>View and update order statuses, handle cancellations.</p>
                <Button variant="success">Manage Orders</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaCommentDots size={30} className="text-info" />
                <h3 className="my-2">Customer Support</h3>
                <p>Assist customers with inquiries and issues.</p>
                <Button variant="info">Support Customers</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Cancellation Section */}
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Order Cancellations</Card.Title>
                <p>
                  Handle customer requests to cancel orders. Add a note for each
                  cancellation.
                </p>
                <FaBan size={30} className="text-danger" />
                <h4 className="my-2">Process Cancellation Requests</h4>
                <Button variant="danger">Go to Cancellations</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CSRDashboard;
