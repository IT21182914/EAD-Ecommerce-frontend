import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import VendorSidebar from "./VendorSidebar"; // Assuming the sidebar component is in the same directory
import {
  FaMapMarkerAlt,
  FaPhone,
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      productId: 1,
      name: "Product A",
      quantity: 5,
      totalPrice: 100.0,
      address: "123 Street, City",
      telephone: "+1 234 567 890",
      createdAt: "2023-10-04",
      image:
        "https://cdn.pixabay.com/photo/2015/09/01/03/42/phone-916401_640.jpg",
    },
    {
      productId: 2,
      name: "Product B",
      quantity: 2,
      totalPrice: 50.0,
      address: "456 Avenue, City",
      telephone: "+1 987 654 321",
      createdAt: "2023-10-03",
      image:
        "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726721_640.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleMore = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDeliver = (productId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.productId === productId ? { ...order, delivered: true } : order
      )
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />

      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2
          className="text-center my-4"
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            color: "#333",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            animation: "fadeInDown 1s ease",
          }}
        >
          Manage Orders
        </h2>

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
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.productId} className="animated-row">
                  <td>{order.productId}</td>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
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
                      src={selectedOrder.image}
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
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </p>
                    <p>
                      <strong>Total Price:</strong> $
                      {selectedOrder.totalPrice.toFixed(2)}
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
                    <p>{selectedOrder.telephone}</p>
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
                      {selectedOrder.delivered ? (
                        <span className="text-success">Delivered</span>
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
              variant={selectedOrder?.delivered ? "success" : "primary"}
              onClick={() => {
                handleDeliver(selectedOrder.productId);
                closeModal();
              }}
              style={{
                padding: "10px 30px",
                fontSize: "1rem",
                borderRadius: "30px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                transition: "background-color 0.3s ease, transform 0.2s",
              }}
              className="deliver-btn"
            >
              {selectedOrder?.delivered ? "Delivered" : "Deliver"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <style jsx>{`
        .modal-content {
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .modal-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-bottom: none;
          padding: 1.5rem;
        }

        .modal-body {
          padding: 30px;
        }

        .order-details h5,
        .order-details h6 {
          margin-bottom: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .order-details h5 svg,
        .order-details h6 svg {
          margin-right: 10px;
          color: #667eea;
        }

        .deliver-btn:hover {
          transform: scale(1.05);
        }

        .custom-modal .modal-content:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Orders;
