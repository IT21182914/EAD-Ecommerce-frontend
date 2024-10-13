/**
 * CancelOrders.js
 *
 * This component allows the admin to manage and view orderdetails that can cancel and delivered.
 * It provides functionalities for searching, canceling, and delivering orders.
 *
 * Features:
 * - Displays a list of orders in a table format, with options to cancel or deliver each order.
 * - Includes a search bar for filtering orders by Customer ID.
 * - Uses modals to confirm cancellation and delivery actions.
 * - Provides real-time feedback through toast notifications for successful or failed actions.
 *
 * State Management:
 * - Manages state for loading, orders, search term, modal visibility, selected order, cancellation note, and notifications.
 *
 * Author: Herath R P N M
 * Registration Number: IT21177828
 * Date: 2024-10-08
 */

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
import AdminNavBar from "./AdminNavBar";
import Sidebar from "./AdminSidebar";
import API_BASE_URL from "../../config.js";

const CancelOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeliverModal, setShowDeliverModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelNote, setCancelNote] = useState("");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulating an API call with dummy data for orders
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${API_BASE_URL}Order/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  //handle action for cancel and deliver
  const handleAction = (order, action) => {
    if (action === "Cancel") {
      setSelectedOrder(order);
      setShowCancelModal(true);
    } else if (action === "Deliver") {
      setShowDeliverModal(true);
      setSelectedOrder(order);
    }
  };

  // Perform API call to cancel order
  const confirmCancel = () => {
    console.log("Cancelling order", selectedOrder.orderID);
    const token = localStorage.getItem("accessToken");
    console.log(token);
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
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  // Perform API call to mark order as delivered
  const deliverOrder = () => {
    console.log("Delivering order", selectedOrder.orderId);
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");

    axios
      .patch(
        `${API_BASE_URL}Order/delivered?orderId=${selectedOrder.orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRefresh(!refresh);
        console.log(response.data);
        toast.success("Order delivered successfully");
        setShowDeliverModal(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to deliver order");
        setIsLoading(false);
      });
  };

  // Filter orders based on search term
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
        <AdminNavBar notification={notifications} />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-100 d-flex justify-content-center">
              <h2
                className="mb-4"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(91, 33, 182, 1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Manage Orders
              </h2>
            </div>
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
                        className="p-2"
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
                          disabled={
                            order.status === "CANCELED" ||
                            order.status === "DELIVERED"
                          }
                        >
                          Cancel
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleAction(order, "Deliver")}
                          disabled={
                            order.status === "CANCELED" ||
                            order.status === "DELIVERED"
                          }
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

          <Modal
            show={showDeliverModal}
            onHide={() => {
              setShowDeliverModal(false);
              setError("");
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Deliver Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="cancelNote">
                <Form.Label>Please confirm order delivery</Form.Label>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeliverModal(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="success"
                onClick={deliverOrder}
                disabled={isLoading}
              >
                Confirm Deliver
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
