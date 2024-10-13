import React, { useState, useEffect, useContext } from "react";
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
// import AdminNavBar from "../AdminDashboard/AdminSidebar";
import Sidebar from "./CSRSidebar"
import { AuthContext } from "../../Context/AuthContext";
import API_BASE_URL from "../../config";

export default function OrderCancellationRequest() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelNote, setCancelNote] = useState("");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${API_BASE_URL}Order/cancel/request/all`, {
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


  const handleAction = (order, action) => {
    if (action === "CANCELED") {
      setSelectedOrder(order);
      setShowCancelModal(true);
    } else if (action === "APPROVED") {
      setSelectedOrder(order);
      setShowApproveModal(true);
    }
  };

  // Perform API call to cancel order
  const confirmCancel = async () => {
    console.log("Cancelling order", selectedOrder.orderId);
    const token = localStorage.getItem("accessToken");

    try {
      if (cancelNote === "") {
        setError(
          `Please provide a reason for ${
            showApproveModal ? "approval" : "decline"
          }`
        );
        toast.error(
          `Please provide a reason for ${
            showApproveModal ? "approval" : "decline"
          }`
        );
        return;
      } else {
        setError("");

        const cancelResponse = await axios.patch(
          `${API_BASE_URL}Order/cancel/response`,
          {
            requestId: selectedOrder.requestId,
            responseNote: cancelNote,
            status: showApproveModal ? "APPROVED" : "CANCELED",
            responsedBy: user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelResponse) {
          toast.success(`Order ${showApproveModal ? "approved" : "declined"} successfully`);
          setShowApproveModal(false);
          setShowCancelModal(false);
          return;
        } else {
          toast.error("Failed to approve order");
          return;
        }

        // Perform API call to cancel order

        const canceOrder = axios.patch(
          `${API_BASE_URL}Order/cancel?orderId=${selectedOrder.orderId}`,
          {
            note: cancelNote,
            canceledBy: user.email,
          }
        );

        toast.success("Order cancelled successfully");
        setShowCancelModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel order");
    } finally {
      setRefresh(!refresh);
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
        {/* <AdminNavBar notification={[]} /> */}
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="container">
            <h1>Order Cancelation</h1>

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
                  style={{
                    borderRadius: "0 30px 30px 0",
                    padding: "10px 15px",
                  }}
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
                    <th>Customer ID</th>
                    <th>Request Note</th>
                    <th>Response Note</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.customerId}</td>
                      <td>{order.requestNote ?? "N / A"}</td>
                      <td>{order.responsNote ?? "N / A"}</td>
                      <td>
                        <Badge
                          pill
                          bg={
                            order.status === "CANCELED"
                              ? "danger"
                              : order.status === "APPROVED"
                              ? "success"
                              : order.status === "PENDING"
                              ? "primary"
                              : "warning"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td>{order.createdAt}</td>
                      <td>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Action"
                          variant="outline-secondary"
                          size="sm"
                        >
                          <Dropdown.Item
                            onClick={() => handleAction(order, "APPROVED")}
                            disabled={
                              order.status === "APPROVED" ||
                              order.status === "CANCELED"
                            }
                          >
                            Approve
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleAction(order, "CANCELED")}
                            disabled={
                              order.status === "APPROVED" ||
                              order.status === "CANCELED"
                            }
                          >
                            Decline
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
                setCancelNote("");
              }}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Decline</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="cancelNote">
                  {error ? (
                    <Form.Label style={{ color: "red" }}>{error}</Form.Label>
                  ) : (
                    <Form.Label>Add a note for decline </Form.Label>
                  )}
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={cancelNote}
                    onChange={(e) => setCancelNote(e.target.value)}
                    placeholder="Add any relevant notes about the decline."
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowCancelModal(false);
                    setError("");
                    setCancelNote("");
                  }}
                >
                  Close
                </Button>
                <Button variant="danger" onClick={confirmCancel}>
                  Decline Request
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Cancel Confirmation Modal */}
            <Modal
              show={showApproveModal}
              onHide={() => {
                setShowApproveModal(false);
                setError("");
                setCancelNote("");
              }}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Approval</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="cancelNote">
                  {error ? (
                    <Form.Label style={{ color: "red" }}>{error}</Form.Label>
                  ) : (
                    <Form.Label>Add a note for approve cancelation </Form.Label>
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
                    setShowApproveModal(false);
                    setError("");
                    setCancelNote("");
                  }}
                >
                  Close
                </Button>
                <Button variant="success" onClick={confirmCancel}>
                  Approve Request
                </Button>
              </Modal.Footer>
            </Modal>

            <ToastContainer autoClose={3000} hideProgressBar={false} />
          </div>
        </Container>
      </div>
    </div>
  );
}
