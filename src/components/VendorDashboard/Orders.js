import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Spinner,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import VendorSidebar from "./VendorSidebar";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import API_BASE_URL from "../../config";
import { AuthContext } from "../../Context/AuthContext";
import VendorNavbar from "./VendorNavbar";
import Sidebar from "./VendorSidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchOrderItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}vendor/products/my/order/all?vendorId=${user.id}`
      );
      if (res.data) setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [refresh]);

  const handleMore = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDeliver = (productId) => {
    axios
      .patch(`${API_BASE_URL}Order/item/delivered?itemId=${productId}`)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((error) => console.error(error));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="d-flex flex-row animated-page"
      style={{ width: "100%", height: "100vh" }}
    >
      <Sidebar role="vendor" />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1 animated-section"
        style={{ marginLeft: "240px" }}
      >
        <VendorNavbar />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <h2
            className="text-center my-4 animated-header"
            style={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              color: "#333",
              textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Manage Orders
          </h2>

          {loading ? (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                className="animated-spinner"
              ></Spinner>
            </div>
          ) : (
            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                className="shadow-sm animated-table"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead style={{ backgroundColor: "#f7f9fc" }}>
                  <tr key="OrderItems">
                    <th>Order item ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="animated-row">
                      <td>{order.itemId}</td>
                      <td>{order.productId}</td>
                      <td>{order.productName}</td>
                      <td>
                        {
                          <Badge
                            className="p-2 animated-badge"
                            pill
                            bg={getStatusBadgeColor(order.status)}
                          >
                            {order.status}
                          </Badge>
                        }
                      </td>
                      <td>{order.quantity}</td>
                      <td>${order.price}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          className="more-btn"
                          onClick={() => handleMore(order)}
                        >
                          More
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <Modal
            show={showModal}
            onHide={closeModal}
            centered
            className="fade-in"
            dialogClassName="custom-modal"
          >
            <Modal.Header
              closeButton
              className="border-0"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
              }}
            >
              <Modal.Title>
                <strong>Order Details</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "30px" }}>
              {selectedOrder ? (
                <div className="order-details">
                  <Row className="mb-4">
                    <Col md={4} className="text-center">
                      <img
                        src={selectedOrder.imageUrl}
                        alt="Product"
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                          height: "auto",
                          borderRadius: "10px",
                          objectFit: "cover",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <h5>
                        <FaBoxOpen /> {selectedOrder.name}
                      </h5>
                      <p>
                        <strong>Product ID:</strong> {selectedOrder.productId}
                      </p>
                      <p>
                        <strong>Product Name:</strong>{" "}
                        {selectedOrder.productName}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {selectedOrder.quantity}
                      </p>
                      <p>
                        <strong>Total Price:</strong> ${selectedOrder?.price}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md={6}>
                      <h6>
                        <FaMapMarkerAlt /> Delivery Address
                      </h6>
                      <p>{selectedOrder.address}</p>
                    </Col>
                    <Col md={6}>
                      <h6>
                        <FaPhone /> Contact
                      </h6>
                      <p>{selectedOrder.tel}</p>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md={6}>
                      <h6>
                        <FaCalendarAlt /> Order Date
                      </h6>
                      <p>{selectedOrder.createdAt}</p>
                    </Col>
                    <Col md={6}>
                      <h6>
                        <FaCheckCircle /> Status
                      </h6>
                      <p>
                        {selectedOrder.status === "DELIVERED" ? (
                          <span className="text-success">Delivered</span>
                        ) : selectedOrder.status === "CANCELED" ? (
                          <span className="text-warning">Canceled</span>
                        ) : (
                          <span className="text-warning">Pending</span>
                        )}
                      </p>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="border-0 justify-content-center">
              <Button
                onClick={() => {
                  handleDeliver(selectedOrder.itemId);
                  closeModal();
                }}
                disabled={
                  selectedOrder?.status === "DELIVERED" ||
                  selectedOrder?.status === "CANCELED"
                }
                className="deliver-btn"
              >
                {selectedOrder?.delivered ? "Delivered" : "Deliver"}
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>

        <style jsx>{`
          .animated-header {
            animation: fadeInDown 1s ease;
          }

          .animated-spinner {
            animation: rotateSpinner 1.5s linear infinite;
          }

          .animated-page {
            animation: fadeInPage 1s ease-in-out;
          }

          .animated-row {
            animation: fadeInUp 0.6s ease;
          }

          .animated-badge {
            transition: all 0.3s ease;
          }

          .animated-badge:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .animated-section {
            animation: slideIn 0.8s ease;
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes rotateSpinner {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes fadeInPage {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .deliver-btn:hover {
            transform: scale(1.05);
          }

          .custom-modal .modal-content:hover {
            transform: translateY(-5px);
          }
        `}</style>
      </div>
    </div>
  );
};

// Helper function to return color for status badges
const getStatusBadgeColor = (status) => {
  switch (status) {
    case "CANCELED":
      return "danger";
    case "DELIVERED":
      return "success";
    case "PENDING":
      return "primary";
    case "PARTIALLY-DELIVERED":
      return "secondary";
    default:
      return "warning";
  }
};

export default Orders;
