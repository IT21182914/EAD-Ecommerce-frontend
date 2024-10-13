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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import AdminNavBar from "./AdminNavBar";
import Sidebar from "./CSRSidebar.js";
import API_BASE_URL from "../../config.js";


const CancelOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelNote, setCancelNote] = useState("");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}Order/all`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [refresh]);

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
    // Perform API call to cancel order

    console.log("Cancelling order", selectedOrder.orderID);
    if (cancelNote === "") {
      setError("Please provide a reason for cancellation");
      toast.error("Please provide a reason for cancellation");
      return;
    } else {
      setError("");

      axios
        .patch(
          `${API_BASE_URL}Order/cancel?orderId=${selectedOrder.orderId}`,
          {
            note: cancelNote,
            canceledBy: "super admin",
          }
        )
        .then((response) => {
          setRefresh(!refresh);
          console.log(response.data);
          toast.success("Order cancelled successfully");
          setShowCancelModal(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to cancel order");
        });
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customerId
      ? order.customerId.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        {/* <AdminNavBar notification={notifications} /> */}
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-center">Manage Orders</h2>
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
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.vendorID}</td>
                    <td>{order.item}</td>
                    <td>{order.customerId}</td>
                    <td>
                      <Badge
                        pill
                        bg={
                          order.status === "CANCELED"
                            ? "danger"
                            : order.status === "DELIVERED"
                            ? "success"
                            : order.status === "PENDING"
                            ? "primary"
                            : order.status === "PARTIALY-DELIVERED"
                            ? "secondary"
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
            onHide={() => {
              setShowCancelModal(false);
              setError("");
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Cancellation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="cancelNote">
                {error ? (
                  <Form.Label style={{ color: "red" }}>{error}</Form.Label>
                ) : (
                  <Form.Label>Add a note for cancellation </Form.Label>
                )}
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
                onClick={() => {
                  setShowCancelModal(false);
                }}
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
    </div>
  );
};

export default CancelOrders;
