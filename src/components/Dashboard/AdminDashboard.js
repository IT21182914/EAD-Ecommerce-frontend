import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="mb-4 text-center">Admin Dashboard</h2>
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="shadow-sm bg-light border-0 h-100">
              <Card.Body>
                <Card.Title>User Management</Card.Title>
                <Card.Text>
                  Manage users, assign roles, and activate/deactivate accounts.
                </Card.Text>
                <Button variant="primary" className="w-100">
                  Manage Users
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="shadow-sm bg-light border-0 h-100">
              <Card.Body>
                <Card.Title>Product Management</Card.Title>
                <Card.Text>
                  Create, update, delete, and activate/deactivate product
                  listings.
                </Card.Text>
                <Button variant="success" className="w-100">
                  Manage Products
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="shadow-sm bg-light border-0 h-100">
              <Card.Body>
                <Card.Title>Order Management</Card.Title>
                <Card.Text>
                  Track and manage customer orders, update statuses, and process
                  cancellations.
                </Card.Text>
                <Button variant="warning" className="w-100">
                  Manage Orders
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="shadow-sm bg-light border-0 h-100">
              <Card.Body>
                <Card.Title>Inventory Management</Card.Title>
                <Card.Text>
                  View and manage inventory levels and track low-stock alerts.
                </Card.Text>
                <Button variant="danger" className="w-100">
                  Manage Inventory
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="shadow-sm bg-light border-0 h-100">
              <Card.Body>
                <Card.Title>Vendor Management</Card.Title>
                <Card.Text>
                  Create and manage vendor profiles, and view vendor ratings.
                </Card.Text>
                <Button variant="info" className="w-100">
                  Manage Vendors
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="shadow-sm bg-light border-0 h-100">
              <Card.Body>
                <Card.Title>Reports</Card.Title>
                <Card.Text>
                  View system reports, including user activity, product sales,
                  and more.
                </Card.Text>
                <Button variant="dark" className="w-100">
                  View Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
