import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  FormControl,
  InputGroup,
  Spinner,
  Badge,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import NotificationBell from "./NotificationBell";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CancelOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelNote, setCancelNote] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating an API call with dummy data for orders
    const dummyOrders = [
      {
        orderID: "1",
        vendorID: "V001",
        item: "Laptop",
        customerID: "C001",
        status: "Pending",
        address: "123 Main St, Cityville",
        tel: "+123456789",
        createdAt: "2024-10-01",
      },
      {
        orderID: "2",
        vendorID: "V002",
        item: "Smartphone",
        customerID: "C002",
        status: "Shipped",
        address: "456 Elm St, Townsville",
        tel: "+987654321",
        createdAt: "2024-09-29",
      },
    ];

    const dummyNotifications = [
      {
        id: 1,
        name: "Order",
        message: "Order 1 has been shipped",
        time: "Just now",
        isNew: true,
      },
      {
        id: 2,
        name: "Order",
        message: "Order 2 is out for delivery",
        time: "1 hour ago",
        isNew: true,
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setOrders(dummyOrders);
      setNotifications(dummyNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAction = (order, action) => {
    if (action === "Cancel") {
      setSelectedOrder(order);
      setShowCancelModal(true);
    } else if (action === "Deliver") {
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.orderID === order.orderID ? { ...o, status: "Delivered" } : o
        )
      );
      toast.success("Order marked as Delivered");
    }
  };

  const confirmCancel = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderID === selectedOrder.orderID
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
    setShowCancelModal(false);
    toast.success("Order cancelled successfully");
  };

  const filteredOrders = orders.filter((order) =>
    order.customerID
      ? order.customerID.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div className="d-flex">
      <AdminSidebar />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-center my-4">Manage Orders</h2>
          {/* Notification Bell */}
          <NotificationBell notifications={notifications} />
        </div>

        {/* Search Bar */}
        <div className="text-center mb-4">
          <InputGroup
            className="search-bar-wrapper"
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <FormControl
              type="search"
              placeholder="Search by Customer ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: "30px 0 0 30px",
                padding: "10px 20px",
                border: "2px solid #ddd",
              }}
            />
            <Button
              variant="dark"
              style={{ borderRadius: "0 30px 30px 0", padding: "10px 15px" }}
            >
              <FaSearch />
            </Button>
          </InputGroup>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner
              animation="border"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></Spinner>
          </div>
        ) : (
          <Table
            striped
            bordered
            hover
            className="shadow-sm"
            style={{ fontSize: "0.9rem" }}
          >
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Vendor ID</th>
                <th>Item</th>
                <th>Customer ID</th>
                <th>Status</th>
                <th>Address</th>
                <th>Tel</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.vendorID}</td>
                  <td>{order.item}</td>
                  <td>{order.customerID}</td>
                  <td>
                    <Badge
                      pill
                      bg={
                        order.status === "Cancelled"
                          ? "danger"
                          : order.status === "Delivered"
                          ? "success"
                          : "warning"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>{order.address}</td>
                  <td>{order.tel}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Action"
                      variant="outline-secondary"
                      size="sm"
                    >
                      <Dropdown.Item
                        onClick={() => handleAction(order, "Cancel")}
                        disabled={order.status === "Cancelled"}
                      >
                        Cancel
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleAction(order, "Deliver")}
                        disabled={order.status === "Delivered"}
                      >
                        Deliver
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Cancel Confirmation Modal */}
        <Modal
          show={showCancelModal}
          onHide={() => setShowCancelModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Cancellation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="cancelNote">
              <Form.Label>Add a Note (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={cancelNote}
                onChange={(e) => setCancelNote(e.target.value)}
                placeholder="Add any relevant notes about the cancellation..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCancelModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Confirm Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer autoClose={3000} hideProgressBar={false} />
      </Container>
    </div>
  );
};

export default CancelOrders;
